// ============================================================
// Arbitrage Edge — Core Types
// ============================================================

export interface Market {
  id: string;
  title: string;
  type: 'price_level' | 'price_range' | 'event' | 'trend';
  exchangePrice: number;
  polymarketImplied: number;
  polymarketYesPrice: number;
  polymarketNoPrice: number;
  volume24h: number;
  change24h: number;
  expiry: string;
  liquidity: number;
  spread: number;
  confidence: number;
  category: string;
  image?: string;
}

export interface Trade {
  id: string;
  marketId: string;
  marketTitle: string;
  type: 'buy_yes' | 'buy_no' | 'sell_yes' | 'sell_no';
  side: 'long' | 'short';
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  pnl: number | null;
  pnlPercent: number | null;
  status: 'open' | 'closed' | 'cancelled';
  entryTime: string;
  exitTime: string | null;
  fees: number;
  slippage: number;
  strategy: string;
}

export interface Opportunity {
  id: string;
  marketId: string;
  marketTitle: string;
  marketType: string;
  btcPrice: number;
  polymarketImplied: number;
  spread: number;
  expectedProfit: number;
  confidence: number;
  detectedAt: string;
  expiresAt: string;
  liquidity: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'expiring' | 'expired';
  reasoning: string;
}

export interface Strategy {
  id: string;
  name: string;
  type: 'lag_arb' | 'mean_reversion' | 'momentum';
  description: string;
  isActive: boolean;
  isPaperTrading: boolean;
  params: {
    maxPositionSize: number;
    stopLossPercent: number;
    takeProfitPercent: number;
    dailyLossLimit: number;
    maxConcurrentTrades: number;
    minSpread: number;
    minConfidence: number;
    maxSlippage: number;
  };
  aiAgent: 'claude' | 'glm' | 'manual';
  performance: {
    totalTrades: number;
    winRate: number;
    totalPnl: number;
    sharpeRatio: number;
    maxDrawdown: number;
    avgReturn: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  id: string;
  marketId: string;
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
  status: 'open' | 'closing';
}

export interface PortfolioSnapshot {
  timestamp: string;
  value: number;
  pnl: number;
  positions: number;
}

export interface BacktestResult {
  strategy: string;
  startDate: string;
  endDate: string;
  initialCapital: number;
  finalCapital: number;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  winRate: number;
  totalTrades: number;
  equityCurve: { date: string; value: number }[];
}

export interface Settings {
  apiConnections: {
    coingecko: { enabled: boolean; apiKey: string | null };
    binance: { enabled: boolean; apiKey: string | null; secret: string | null };
    polymarket: { enabled: boolean; apiKey: string | null; privateKey: string | null };
  };
  riskLimits: {
    maxPortfolioRisk: number;
    maxSingleTrade: number;
    dailyStopLoss: number;
  };
  notifications: {
    browser: boolean;
    email: boolean;
    emailAddr: string;
    opportunities: boolean;
    trades: boolean;
    alerts: boolean;
  };
  theme: 'light' | 'dark';
  currency: 'USD' | 'EUR' | 'GBP';
}
