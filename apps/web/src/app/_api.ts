// ============================================================
// API Utilities — Real data from CoinGecko & Polymarket
// ============================================================

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const POLYMARKET_BASE = 'https://gamma-api.polymarket.com';
const REQUEST_TIMEOUT_MS = 10_000;

async function fetchJson(url: string, label: string): Promise<unknown> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
    if (!res.ok) throw new Error(`${label} returned HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`${label} timed out after ${REQUEST_TIMEOUT_MS / 1000}s`);
    }
    throw error instanceof Error ? error : new Error(`${label} request failed`);
  } finally {
    clearTimeout(timeout);
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function finiteNumber(value: unknown): number | null {
  const parsed = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
  return Number.isFinite(parsed) ? parsed : null;
}

// ---- Types ----
export interface BTCPrice {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap: number;
  sparkline: number[];
  lastUpdated: string;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PolymarketMarket {
  id: string;
  question: string;
  slug: string;
  yesPrice: number;
  noPrice: number;
  volume24h: number;
  liquidity: number;
  change24h: number;
  category: string;
  endDate: string;
  image?: string;
}

export interface ArbOpportunity {
  id: string;
  marketTitle: string;
  marketType: string;
  spotPrice: number;
  polymarketImplied: number;
  spread: number;
  spreadPercent: number;
  expectedProfit: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  reasoning: string;
  polymarketUrl: string;
  detectedAt: string;
  liquidity: number;
}

// ---- CoinGecko API ----
export async function fetchBTCPrice(): Promise<BTCPrice> {
  const data = asRecord(await fetchJson(
    `${COINGECKO_BASE}/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
    'CoinGecko'
  ));
  const md = asRecord(data?.market_data);
  const currentPrice = asRecord(md?.current_price);
  const high24h = asRecord(md?.high_24h);
  const low24h = asRecord(md?.low_24h);
  const volume24h = asRecord(md?.total_volume);
  const marketCap = asRecord(md?.market_cap);
  const sparkline = asRecord(md?.sparkline_7d);
  const values = {
    price: finiteNumber(currentPrice?.usd),
    change24h: finiteNumber(md?.price_change_percentage_24h),
    high24h: finiteNumber(high24h?.usd),
    low24h: finiteNumber(low24h?.usd),
    volume24h: finiteNumber(volume24h?.usd),
    marketCap: finiteNumber(marketCap?.usd),
  };

  if (!data || Object.values(values).some(value => value === null) || typeof data.last_updated !== 'string') {
    throw new Error('CoinGecko returned an invalid BTC price payload');
  }

  return {
    price: values.price!, change24h: values.change24h!, high24h: values.high24h!,
    low24h: values.low24h!, volume24h: values.volume24h!, marketCap: values.marketCap!,
    sparkline: Array.isArray(sparkline?.price)
      ? sparkline.price.map(finiteNumber).filter((value): value is number => value !== null).slice(-24)
      : [],
    lastUpdated: data.last_updated,
  };
}

export async function fetchBTCCandles(days: number = 1): Promise<Candle[]> {
  const data = await fetchJson(
    `${COINGECKO_BASE}/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`,
    'CoinGecko OHLC'
  );
  if (!Array.isArray(data)) throw new Error('CoinGecko returned an invalid OHLC payload');

  return data.flatMap((row): Candle[] => {
    if (!Array.isArray(row) || row.length < 5) return [];
    const values = row.slice(0, 5).map(finiteNumber);
    if (values.some(value => value === null)) return [];
    const [time, open, high, low, close] = values as number[];
    return [{ time: Math.floor(time / 1000), open, high, low, close, volume: 0 }];
  });
}

// ---- Polymarket API ----
export async function fetchPolymarketCrypto(): Promise<PolymarketMarket[]> {
  const data = await fetchJson(
    `${POLYMARKET_BASE}/markets?active=true&closed=false&limit=100&tag_slug=crypto`,
    'Polymarket'
  );
  if (!Array.isArray(data)) throw new Error('Polymarket returned an invalid markets payload');

  const markets = data.flatMap((value): PolymarketMarket[] => {
    const market = asRecord(value);
    if (!market) return [];
    let outcomes: unknown = market.outcomePrices;
    if (typeof outcomes === 'string') {
      try { outcomes = JSON.parse(outcomes); } catch { return []; }
    }
    if (!Array.isArray(outcomes) || typeof market.id !== 'string' || typeof market.question !== 'string') return [];
    const yesPrice = finiteNumber(outcomes[0]);
    const noPrice = finiteNumber(outcomes[1]);
    if (yesPrice === null || noPrice === null || yesPrice < 0 || yesPrice > 1 || noPrice < 0 || noPrice > 1) return [];

    return [{
      id: market.id,
      question: market.question,
      slug: typeof market.slug === 'string' ? market.slug : '',
      yesPrice,
      noPrice,
      volume24h: finiteNumber(market.volume24hr) ?? 0,
      liquidity: finiteNumber(market.liquidityNum ?? market.liquidity) ?? 0,
      change24h: finiteNumber(market.oneDayPriceChange) ?? 0,
      category: typeof market.category === 'string' ? market.category : 'Crypto',
      endDate: typeof market.endDate === 'string' ? market.endDate : '',
      image: typeof market.image === 'string' ? market.image : undefined,
    }];
  });

  if (markets.length === 0) throw new Error('Polymarket returned no usable crypto markets');
  return markets;
}

// ---- Arbitrage Detection Engine ----
export function detectArbitrage(
  btcPrice: number,
  markets: PolymarketMarket[]
): ArbOpportunity[] {
  const opportunities: ArbOpportunity[] = [];

  for (const market of markets) {
    const question = market.question.toLowerCase();
    let impliedPrice: number | null = null;
    let marketType = 'Event';

    // Parse price level markets
    const priceMatch = question.match(/\$([\d,]+(?:\.\d+)?)[kKbB]?/g);
    if (priceMatch) {
      const priceStr = priceMatch[0].replace(/[$,]/g, '').toLowerCase();
      let targetPrice: number;
      if (priceStr.endsWith('k')) {
        targetPrice = parseFloat(priceStr) * 1000;
      } else if (priceStr.endsWith('m') || priceStr.endsWith('b')) {
        continue; // Skip market cap targets
      } else {
        targetPrice = parseFloat(priceStr);
      }

      const isAbove = question.includes('above') || question.includes('reach') || question.includes('hits');
      const isBelow = question.includes('below') || question.includes('drops') || question.includes('fall');

      if (isAbove || isBelow) {
        // Implied probability from YES price represents market's belief
        // Convert to "implied price" — the BTC price that matches this probability
        impliedPrice = isAbove
          ? btcPrice * (1 + (1 - market.yesPrice) * 0.5) // Rough conversion
          : btcPrice * (1 - (1 - market.yesPrice) * 0.5);
        marketType = 'Price Level';
      }
    }

    // For event markets, use a different heuristic
    if (!impliedPrice && market.yesPrice > 0) {
      impliedPrice = btcPrice * (1 + (market.yesPrice - 0.5) * 0.1);
      marketType = 'Event';
    }

    if (impliedPrice) {
      const spread = Math.abs(btcPrice - impliedPrice);
      const spreadPercent = (spread / btcPrice) * 100;

      if (spreadPercent >= 0.5) { // Only show opportunities > 0.5%
        const confidence = Math.min(98, Math.max(30,
          90 - spreadPercent * 5 + (market.liquidity / 100000) * 2
        ));
        const riskLevel = spreadPercent > 5 ? 'high' : spreadPercent > 2 ? 'medium' : 'low';

        opportunities.push({
          id: `arb-${market.id}`,
          marketTitle: market.question,
          marketType,
          spotPrice: btcPrice,
          polymarketImplied: Math.round(impliedPrice),
          spread: Math.round(spread),
          spreadPercent: Math.round(spreadPercent * 100) / 100,
          expectedProfit: Math.round(spread * 0.1), // 10% of spread as potential profit
          confidence: Math.round(confidence),
          riskLevel,
          reasoning: generateReasoning(market, btcPrice, impliedPrice, spreadPercent),
          polymarketUrl: `https://polymarket.com/event/${market.slug}`,
          detectedAt: 'Just now',
          liquidity: market.liquidity,
        });
      }
    }
  }

  return opportunities.sort((a, b) => b.spreadPercent - a.spreadPercent);
}

function generateReasoning(
  market: PolymarketMarket,
  spotPrice: number,
  impliedPrice: number,
  spread: number
): string {
  const direction = impliedPrice > spotPrice ? 'overpricing' : 'underpricing';
  const conf = spread > 4 ? 'Strong' : spread > 2 ? 'Moderate' : 'Weak';
  return `${conf} signal: Polymarket is ${direction} relative to BTC spot at $${Math.round(spotPrice).toLocaleString()}. ` +
    `Implied price $${Math.round(impliedPrice).toLocaleString()} vs spot — ${spread.toFixed(1)}% spread. ` +
    `Market liquidity: $${(market.liquidity / 1000).toFixed(0)}k. ` +
    `${market.change24h > 0 ? 'Trending up' : 'Trending down'} on Polymarket (${market.change24h > 0 ? '+' : ''}${market.change24h}%).`;
}

// ---- Auto-Trading Engine (Paper Mode) ----
export interface TradeSignal {
  id: string;
  opportunityId: string;
  action: 'buy_yes' | 'buy_no';
  market: string;
  price: number;
  quantity: number;
  confidence: number;
  timestamp: number;
  reasoning: string;
}

export interface Position {
  id: string;
  signalId: string;
  marketTitle: string;
  side: 'yes' | 'no';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  size: number;
  pnl: number;
  pnlPercent: number;
  entryTime: string;
  strategy: string;
  stopLoss: number;
  takeProfit: number;
  status: 'open' | 'closed';
}

export interface TradeRecord {
  id: string;
  marketTitle: string;
  side: 'long' | 'short';
  type: string;
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  pnlPercent: number;
  status: 'closed';
  entryTime: string;
  exitTime: string;
  fees: number;
  slippage: number;
  strategy: string;
}

export interface TradingConfig {
  strategy: 'lag-arb' | 'mean-rev' | 'momentum';
  maxPositionSize: number;
  stopLossPercent: number;
  dailyLossLimit: number;
  maxConcurrent: number;
  minConfidence: number;
  paperTrading: boolean;
  aiAgent: 'claude' | 'glm' | 'manual';
  isActive: boolean;
}

export interface TradingState {
  config: TradingConfig;
  positions: Position[];
  trades: TradeRecord[];
  signals: TradeSignal[];
  dailyPnl: number;
  totalPnl: number;
  lastUpdate: number;
}

const DEFAULT_CONFIG: TradingConfig = {
  strategy: 'lag-arb',
  maxPositionSize: 500,
  stopLossPercent: 15,
  dailyLossLimit: 1000,
  maxConcurrent: 3,
  minConfidence: 70,
  paperTrading: true,
  aiAgent: 'glm',
  isActive: false,
};

export function getDefaultConfig(): TradingConfig {
  return { ...DEFAULT_CONFIG };
}

export function loadTradingState(): TradingState {
  if (typeof window === 'undefined') return { config: getDefaultConfig(), positions: [], trades: [], signals: [], dailyPnl: 0, totalPnl: 0, lastUpdate: Date.now() };
  try {
    const saved = localStorage.getItem('ae-trading-state');
    if (saved) return JSON.parse(saved);
  } catch {}
  return { config: getDefaultConfig(), positions: [], trades: [], signals: [], dailyPnl: 0, totalPnl: 0, lastUpdate: Date.now() };
}

export function saveTradingState(state: TradingState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ae-trading-state', JSON.stringify(state));
}

export function evaluateOpportunity(
  opp: ArbOpportunity,
  config: TradingConfig
): TradeSignal | null {
  if (opp.confidence < config.minConfidence) return null;

  const action = opp.polymarketImplied > opp.spotPrice ? 'buy_no' : 'buy_yes';
  const quantity = Math.floor(config.maxPositionSize / (opp.expectedProfit || 10));

  return {
    id: `sig-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    opportunityId: opp.id,
    action,
    market: opp.marketTitle,
    price: action === 'buy_yes' ? (100 - opp.spreadPercent) / 100 : (100 + opp.spreadPercent) / 100,
    quantity: Math.max(1, quantity),
    confidence: opp.confidence,
    timestamp: Date.now(),
    reasoning: opp.reasoning,
  };
}

// ---- Alert System ----
export interface PriceAlert {
  id: string;
  type: 'price_above' | 'price_below' | 'spread_above' | 'opportunity';
  target: number;
  current: number;
  label: string;
  triggered: boolean;
  createdAt: number;
}

export function loadAlerts(): PriceAlert[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('ae-alerts') || '[]');
  } catch { return []; }
}

export function saveAlerts(alerts: PriceAlert[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('ae-alerts', JSON.stringify(alerts));
}

// ---- Utility ----
export function formatUSD(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
}

export function formatPercent(n: number): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}
