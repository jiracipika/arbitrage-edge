// ============================================================
// Arbitrage Edge — Constants
// ============================================================

export const BTC_EXCHANGES = [
  { id: 'binance', name: 'Binance', color: '#F0B90B' },
  { id: 'coinbase', name: 'Coinbase', color: '#0052FF' },
  { id: 'kraken', name: 'Kraken', color: '#7B61FF' },
  { id: 'bybit', name: 'Bybit', color: '#F7A600' },
] as const;

export const STRATEGY_TEMPLATES = [
  {
    id: 'lag_arb',
    name: 'Lag Arbitrage',
    description: 'Exploits price lag between BTC spot markets and Polymarket implied probabilities. Enters when the spread exceeds a configurable threshold.',
    defaultParams: {
      minSpread: 2.5,
      maxSlippage: 0.5,
      holdTime: '15m-2h',
    },
  },
  {
    id: 'mean_reversion',
    name: 'Mean Reversion',
    description: 'Identifies overextended Polymarket prices relative to BTC movement. Trades the snap-back to fair value.',
    defaultParams: {
      deviationThreshold: 3,
      maxSlippage: 0.3,
      holdTime: '30m-4h',
    },
  },
  {
    id: 'momentum',
    name: 'Momentum',
    description: 'Rides trending moves where Polymarket lag creates sustained directional opportunities.',
    defaultParams: {
      trendStrength: 0.7,
      maxSlippage: 0.4,
      holdTime: '1h-8h',
    },
  },
] as const;

export const RISK_LEVELS = {
  low: { color: '#34c759', label: 'Low' },
  medium: { color: '#ff9500', label: 'Medium' },
  high: { color: '#ff3b30', label: 'High' },
} as const;

export const MARKET_CATEGORIES = [
  'All',
  'Price Level',
  'Price Range',
  'Trend',
  'Event',
  'DeFi',
] as const;

export const PAPER_TRADING_INITIAL_BALANCE = 10000;

export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';
export const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
export const POLYMARKET_API_URL = 'https://clob.polymarket.com';
