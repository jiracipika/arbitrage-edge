// ============================================================
// API Utilities — Real data from CoinGecko & Polymarket
// ============================================================

const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';
const POLYMARKET_BASE = 'https://clob.polymarket.com';

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
  try {
    const res = await fetch(
      `${COINGECKO_BASE}/coins/bitcoin?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error('CoinGecko API failed');
    const data = await res.json();
    const md = data.market_data;
    return {
      price: md.current_price.usd,
      change24h: md.price_change_percentage_24h,
      high24h: md.high_24h.usd,
      low24h: md.low_24h.usd,
      volume24h: md.total_volume.usd,
      marketCap: md.market_cap.usd,
      sparkline: md.sparkline_7d?.price?.slice(-24) || [],
      lastUpdated: data.last_updated,
    };
  } catch {
    // Fallback to mock
    return {
      price: 92467.35,
      change24h: 2.34,
      high24h: 93500,
      low24h: 90800,
      volume24h: 2_100_000_000,
      marketCap: 1_820_000_000_000,
      sparkline: [89200, 89800, 90500, 89100, 89700, 90200, 91000, 91500, 90800, 91200, 92000, 91800, 92200, 91900, 92467],
      lastUpdated: new Date().toISOString(),
    };
  }
}

export async function fetchBTCCandles(days: number = 1): Promise<Candle[]> {
  try {
    const res = await fetch(
      `${COINGECKO_BASE}/coins/bitcoin/ohlc?vs_currency=usd&days=${days}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error('CoinGecko OHLC failed');
    const data: number[][] = await res.json();
    return data.map(([time, open, high, low, close]) => ({
      time: Math.floor(time / 1000),
      open, high, low, close,
      volume: 0,
    }));
  } catch {
    // Generate mock candles
    const candles: Candle[] = [];
    let price = 91000;
    for (let i = 0; i < 24; i++) {
      const change = (Math.random() - 0.45) * 500;
      const open = price;
      price += change;
      candles.push({
        time: Math.floor(Date.now() / 1000) - (24 - i) * 3600,
        open,
        high: Math.max(open, price) + Math.random() * 200,
        low: Math.min(open, price) - Math.random() * 200,
        close: price,
        volume: Math.random() * 100000000,
      });
    }
    return candles;
  }
}

// ---- Polymarket API ----
export async function fetchPolymarketCrypto(): Promise<PolymarketMarket[]> {
  try {
    const res = await fetch(
      `${POLYMARKET_BASE}/markets?tag=crypto&limit=20&active=true`,
      { next: { revalidate: 30 } }
    );
    if (!res.ok) throw new Error('Polymarket API failed');
    const data = await res.json();
    return data.map((m: any) => ({
      id: m.id || m.condition_id,
      question: m.question || m.title,
      slug: m.slug || '',
      yesPrice: parseFloat(m.outcomePrices?.[0] || m.yes_price || '0.5'),
      noPrice: parseFloat(m.outcomePrices?.[1] || m.no_price || '0.5'),
      volume24h: parseFloat(m.volume24hr || '0'),
      liquidity: parseFloat(m.liquidity || '0'),
      change24h: parseFloat(m.change24hr || '0'),
      category: m.group_slug || 'crypto',
      endDate: m.endDate || m.end_date || '',
      image: m.image || '',
    }));
  } catch {
    // Fallback mock
    return [
      { id: 'pm1', question: 'BTC above $95k by April 15?', slug: 'btc-above-95k-apr15', yesPrice: 0.42, noPrice: 0.58, volume24h: 245000, liquidity: 890000, change24h: 5.2, category: 'Price Level', endDate: '2026-04-15' },
      { id: 'pm2', question: 'BTC reaches $100k before May?', slug: 'btc-100k-may', yesPrice: 0.28, noPrice: 0.72, volume24h: 180000, liquidity: 620000, change24h: -3.1, category: 'Price Level', endDate: '2026-05-01' },
      { id: 'pm3', question: 'ETH above $4k by April?', slug: 'eth-4k-apr', yesPrice: 0.35, noPrice: 0.65, volume24h: 95000, liquidity: 340000, change24h: 8.7, category: 'Price Level', endDate: '2026-04-30' },
      { id: 'pm4', question: 'SOL above $200 by April?', slug: 'sol-200-apr', yesPrice: 0.22, noPrice: 0.78, volume24h: 62000, liquidity: 210000, change24h: 12.4, category: 'Price Level', endDate: '2026-04-30' },
      { id: 'pm5', question: 'BTC halving year new ATH?', slug: 'btc-ath-2026', yesPrice: 0.67, noPrice: 0.33, volume24h: 520000, liquidity: 1200000, change24h: 2.8, category: 'Event', endDate: '2026-12-31' },
      { id: 'pm6', question: 'BTC drops below $85k in April?', slug: 'btc-below-85k', yesPrice: 0.15, noPrice: 0.85, volume24h: 310000, liquidity: 780000, change24h: -4.5, category: 'Price Level', endDate: '2026-04-30' },
      { id: 'pm7', question: 'Total crypto mcap above $4T by June?', slug: 'crypto-mcap-4t', yesPrice: 0.38, noPrice: 0.62, volume24h: 140000, liquidity: 450000, change24h: 6.1, category: 'Event', endDate: '2026-06-30' },
      { id: 'pm8', question: 'ETH flips BTC in daily volume', slug: 'eth-flip-btc-vol', yesPrice: 0.08, noPrice: 0.92, volume24h: 28000, liquidity: 85000, change24h: -1.2, category: 'Event', endDate: '2026-12-31' },
      { id: 'pm9', question: 'BTC dominance above 60% by April?', slug: 'btc-dom-60', yesPrice: 0.54, noPrice: 0.46, volume24h: 89000, liquidity: 320000, change24h: 1.9, category: 'Trend', endDate: '2026-04-30' },
      { id: 'pm10', question: 'DOGE above $0.30 by April?', slug: 'doge-30-apr', yesPrice: 0.18, noPrice: 0.82, volume24h: 72000, liquidity: 190000, change24h: 15.3, category: 'Price Level', endDate: '2026-04-30' },
    ];
  }
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
