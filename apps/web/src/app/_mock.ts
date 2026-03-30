// ============================================================
// Mock Data — Realistic Trading Platform Data
// ============================================================

export const MOCK_BTC_PRICE = 92467.35;
export const MOCK_BTC_CHANGE_24H = 2.34;

export const MOCK_SPARKLINE = [
  89200, 89800, 90500, 89100, 89700, 90200, 91000, 91500, 90800, 91200, 92000, 91800, 92200, 91900, 92467,
];

export const MOCK_PORTFOLIO_HISTORY = [
  { date: 'Mar 1', value: 10000 },
  { date: 'Mar 2', value: 10120 },
  { date: 'Mar 3', value: 10080 },
  { date: 'Mar 4', value: 10350 },
  { date: 'Mar 5', value: 10290 },
  { date: 'Mar 6', value: 10580 },
  { date: 'Mar 7', value: 10410 },
  { date: 'Mar 8', value: 10720 },
  { date: 'Mar 9', value: 10640 },
  { date: 'Mar 10', value: 10930 },
  { date: 'Mar 11', value: 10810 },
  { date: 'Mar 12', value: 11150 },
  { date: 'Mar 13', value: 11020 },
  { date: 'Mar 14', value: 11340 },
  { date: 'Mar 15', value: 11210 },
  { date: 'Mar 16', value: 11580 },
  { date: 'Mar 17', value: 11420 },
  { date: 'Mar 18', value: 11710 },
  { date: 'Mar 19', value: 11590 },
  { date: 'Mar 20', value: 11840 },
  { date: 'Mar 21', value: 11720 },
  { date: 'Mar 22', value: 11980 },
  { date: 'Mar 23', value: 12140 },
  { date: 'Mar 24', value: 12050 },
  { date: 'Mar 25', value: 12320 },
  { date: 'Mar 26', value: 12210 },
  { date: 'Mar 27', value: 12480 },
  { date: 'Mar 28', value: 12390 },
  { date: 'Mar 29', value: 12610 },
  { date: 'Mar 30', value: 12580 },
];

export const MOCK_OPPORTUNITIES = [
  { id: '1', marketTitle: 'BTC above $95k by April 15?', marketType: 'Price Level', btcPrice: 92467, polymarketImplied: 88500, spread: 4.29, expectedProfit: 429, confidence: 87, detectedAt: '2m ago', expiresAt: 'Apr 15', liquidity: 245000, riskLevel: 'low' as const, status: 'active' as const, reasoning: 'BTC momentum strong, RSI 62. Polymarket underpricing relative to spot by 4.3%.' },
  { id: '2', marketTitle: 'BTC reaches $100k before May?', marketType: 'Price Level', btcPrice: 92467, polymarketImplied: 87000, spread: 5.86, expectedProfit: 586, confidence: 72, detectedAt: '5m ago', expiresAt: 'May 1', liquidity: 180000, riskLevel: 'medium' as const, status: 'active' as const, reasoning: 'Historical pattern shows BTC runs to 100k after halving. Polymarket lagging.' },
  { id: '3', marketTitle: 'BTC/USD daily close above $90k', marketType: 'Price Level', btcPrice: 92467, polymarketImplied: 91200, spread: 1.39, expectedProfit: 139, confidence: 94, detectedAt: '1m ago', expiresAt: 'Daily', liquidity: 520000, riskLevel: 'low' as const, status: 'active' as const, reasoning: 'BTC has closed above 90k for 5 consecutive days. High probability.' },
  { id: '4', marketTitle: 'ETH above $4k by April?', marketType: 'Price Level', btcPrice: 3567, polymarketImplied: 3420, spread: 4.12, expectedProfit: 412, confidence: 65, detectedAt: '8m ago', expiresAt: 'Apr 30', liquidity: 95000, riskLevel: 'medium' as const, status: 'active' as const, reasoning: 'ETH/BTC ratio rising. ETH lagging on Polymarket.' },
  { id: '5', marketTitle: 'BTC drops below $85k in April?', marketType: 'Price Level', btcPrice: 92467, polymarketImplied: 95000, spread: 2.67, expectedProfit: 267, confidence: 78, detectedAt: '3m ago', expiresAt: 'Apr 30', liquidity: 310000, riskLevel: 'medium' as const, status: 'active' as const, reasoning: 'Inverse arb: Polymarket overpricing crash probability. Short NO tokens.' },
  { id: '6', marketTitle: 'SOL above $200 by April?', marketType: 'Price Level', btcPrice: 178, polymarketImplied: 168, spread: 5.62, expectedProfit: 562, confidence: 58, detectedAt: '12m ago', expiresAt: 'Apr 30', liquidity: 62000, riskLevel: 'high' as const, status: 'active' as const, reasoning: 'SOL ecosystem momentum high but volatile. Large spread indicates uncertainty.' },
  { id: '7', marketTitle: 'BTC halving year new ATH?', marketType: 'Event', btcPrice: 92467, polymarketImplied: 88000, spread: 4.83, expectedProfit: 483, confidence: 81, detectedAt: '15m ago', expiresAt: 'Dec 31', liquidity: 890000, riskLevel: 'low' as const, status: 'active' as const, reasoning: 'Post-halving cycle historically peaks 12-18 months after. Strong trend.' },
  { id: '8', marketTitle: 'BTC weekly close in $90k-$95k range', marketType: 'Price Range', btcPrice: 92467, polymarketImplied: 91000, spread: 1.61, expectedProfit: 161, confidence: 89, detectedAt: '30m ago', expiresAt: 'Weekly', liquidity: 410000, riskLevel: 'low' as const, status: 'active' as const, reasoning: 'Current price in range. Low risk, steady return.' },
];

export const MOCK_POSITIONS = [
  { id: 'p1', marketTitle: 'BTC above $90k by March 31', side: 'yes' as const, entryPrice: 0.87, currentPrice: 0.94, quantity: 200, size: 174, pnl: 14.00, pnlPercent: 8.05, entryTime: 'Mar 28, 14:22', strategy: 'Lag Arb', stopLoss: 0.80, takeProfit: 0.95, status: 'open' as const },
  { id: 'p2', marketTitle: 'ETH above $3.5k by April', side: 'yes' as const, entryPrice: 0.72, currentPrice: 0.68, quantity: 150, size: 108, pnl: -6.00, pnlPercent: -5.56, entryTime: 'Mar 27, 09:15', strategy: 'Mean Reversion', stopLoss: 0.60, takeProfit: 0.85, status: 'open' as const },
  { id: 'p3', marketTitle: 'SOL above $180 by April 5', side: 'yes' as const, entryPrice: 0.65, currentPrice: 0.78, quantity: 100, size: 65, pnl: 13.00, pnlPercent: 20.00, entryTime: 'Mar 26, 11:30', strategy: 'Momentum', stopLoss: 0.50, takeProfit: 0.90, status: 'open' as const },
  { id: 'p4', marketTitle: 'BTC drops below $85k in April', side: 'no' as const, entryPrice: 0.82, currentPrice: 0.89, quantity: 300, size: 246, pnl: 21.00, pnlPercent: 8.54, entryTime: 'Mar 29, 16:45', strategy: 'Lag Arb', stopLoss: 0.75, takeProfit: 0.95, status: 'open' as const },
];

export const MOCK_TRADES = [
  { id: 't1', marketTitle: 'BTC above $90k by March 28', type: 'buy_yes', side: 'long', entryPrice: 0.82, exitPrice: 0.95, quantity: 200, pnl: 26.00, pnlPercent: 15.85, status: 'closed', entryTime: 'Mar 25, 10:12', exitTime: 'Mar 28, 09:45', fees: 1.20, slippage: 0.3, strategy: 'Lag Arb' },
  { id: 't2', marketTitle: 'ETH above $3.8k by March 29', type: 'buy_yes', side: 'long', entryPrice: 0.68, exitPrice: 0.55, quantity: 150, pnl: -19.50, pnlPercent: -19.12, status: 'closed', entryTime: 'Mar 24, 14:33', exitTime: 'Mar 29, 11:20', fees: 0.90, slippage: 0.4, strategy: 'Mean Reversion' },
  { id: 't3', marketTitle: 'SOL above $170 by March 27', type: 'buy_yes', side: 'long', entryPrice: 0.75, exitPrice: 0.88, quantity: 100, pnl: 13.00, pnlPercent: 17.33, status: 'closed', entryTime: 'Mar 22, 09:18', exitTime: 'Mar 27, 15:30', fees: 0.60, slippage: 0.2, strategy: 'Momentum' },
  { id: 't4', marketTitle: 'BTC above $92k by March 30', type: 'buy_yes', side: 'long', entryPrice: 0.91, exitPrice: 0.93, quantity: 250, pnl: 5.00, pnlPercent: 2.20, status: 'closed', entryTime: 'Mar 29, 08:00', exitTime: 'Mar 30, 07:15', fees: 1.50, slippage: 0.1, strategy: 'Lag Arb' },
  { id: 't5', marketTitle: 'BTC $80k-$85k range this week', type: 'buy_no', side: 'short', entryPrice: 0.90, exitPrice: 0.95, quantity: 180, pnl: 9.00, pnlPercent: 5.56, status: 'closed', entryTime: 'Mar 26, 12:00', exitTime: 'Mar 28, 20:00', fees: 1.08, slippage: 0.2, strategy: 'Lag Arb' },
  { id: 't6', marketTitle: 'ETH below $3k in March', type: 'buy_no', side: 'short', entryPrice: 0.85, exitPrice: 0.92, quantity: 120, pnl: 8.40, pnlPercent: 8.24, status: 'closed', entryTime: 'Mar 23, 16:45', exitTime: 'Mar 29, 23:59', fees: 0.72, slippage: 0.3, strategy: 'Mean Reversion' },
];

export const MOCK_POLYMARKET_MARKETS = [
  { id: 'pm1', title: 'BTC above $95k by April 15', yesPrice: 0.42, noPrice: 0.58, volume24h: 245000, change24h: 5.2, category: 'Price Level', liquidity: 890000 },
  { id: 'pm2', title: 'BTC reaches $100k before May', yesPrice: 0.28, noPrice: 0.72, volume24h: 180000, change24h: -3.1, category: 'Price Level', liquidity: 620000 },
  { id: 'pm3', title: 'ETH above $4k by April', yesPrice: 0.35, noPrice: 0.65, volume24h: 95000, change24h: 8.7, category: 'Price Level', liquidity: 340000 },
  { id: 'pm4', title: 'SOL above $200 by April', yesPrice: 0.22, noPrice: 0.78, volume24h: 62000, change24h: 12.4, category: 'Price Level', liquidity: 210000 },
  { id: 'pm5', title: 'BTC halving year new ATH', yesPrice: 0.67, noPrice: 0.33, volume24h: 520000, change24h: 2.8, category: 'Event', liquidity: 1200000 },
  { id: 'pm6', title: 'BTC drops below $85k in April', yesPrice: 0.15, noPrice: 0.85, volume24h: 310000, change24h: -4.5, category: 'Price Level', liquidity: 780000 },
  { id: 'pm7', title: 'Total crypto mcap above $4T by June', yesPrice: 0.38, noPrice: 0.62, volume24h: 140000, change24h: 6.1, category: 'Event', liquidity: 450000 },
  { id: 'pm8', title: 'ETH flips BTC in daily volume', yesPrice: 0.08, noPrice: 0.92, volume24h: 28000, change24h: -1.2, category: 'Event', liquidity: 85000 },
  { id: 'pm9', title: 'BTC dominance above 60% by April', yesPrice: 0.54, noPrice: 0.46, volume24h: 89000, change24h: 1.9, category: 'Trend', liquidity: 320000 },
  { id: 'pm10', title: 'DOGE above $0.30 by April', yesPrice: 0.18, noPrice: 0.82, volume24h: 72000, change24h: 15.3, category: 'Price Level', liquidity: 190000 },
  { id: 'pm11', title: 'US approves ETH ETF staking by Q2', yesPrice: 0.44, noPrice: 0.56, volume24h: 210000, change24h: 3.7, category: 'Event', liquidity: 560000 },
  { id: 'pm12', title: 'BTC mining difficulty ATH before May', yesPrice: 0.61, noPrice: 0.39, volume24h: 55000, change24h: 0.8, category: 'Event', liquidity: 180000 },
];

export const MOCK_EXCHANGE_PRICES = [
  { exchange: 'Binance', price: 92467.35, change24h: 2.34, volume: '2.1B' },
  { exchange: 'Coinbase', price: 92482.10, change24h: 2.31, volume: '1.4B' },
  { exchange: 'Kraken', price: 92455.80, change24h: 2.37, volume: '890M' },
  { exchange: 'Bybit', price: 92471.20, change24h: 2.33, volume: '1.7B' },
];

export const MOCK_PNL = {
  today: 342.50,
  week: 1847.20,
  month: 5830.00,
  todayTrades: 8,
  weekTrades: 34,
  monthTrades: 127,
};

export const MOCK_MONTHLY_RETURNS = [
  { month: 'Oct', return: 8.2 },
  { month: 'Nov', return: 12.5 },
  { month: 'Dec', return: -3.1 },
  { month: 'Jan', return: 9.7 },
  { month: 'Feb', return: 6.3 },
  { month: 'Mar', return: 14.8 },
];

export const MOCK_ANALYTICS_PNL = [
  { date: 'Mar 1', pnl: 0 },
  { date: 'Mar 2', pnl: 120 },
  { date: 'Mar 3', pnl: 80 },
  { date: 'Mar 4', pnl: 350 },
  { date: 'Mar 5', pnl: 290 },
  { date: 'Mar 6', pnl: 580 },
  { date: 'Mar 7', pnl: 410 },
  { date: 'Mar 8', pnl: 720 },
  { date: 'Mar 9', pnl: 640 },
  { date: 'Mar 10', pnl: 930 },
  { date: 'Mar 11', pnl: 810 },
  { date: 'Mar 12', pnl: 1150 },
  { date: 'Mar 13', pnl: 1020 },
  { date: 'Mar 14', pnl: 1340 },
  { date: 'Mar 15', pnl: 1210 },
  { date: 'Mar 16', pnl: 1580 },
  { date: 'Mar 17', pnl: 1420 },
  { date: 'Mar 18', pnl: 1710 },
  { date: 'Mar 19', pnl: 1590 },
  { date: 'Mar 20', pnl: 1840 },
  { date: 'Mar 21', pnl: 1720 },
  { date: 'Mar 22', pnl: 1980 },
  { date: 'Mar 23', pnl: 2140 },
  { date: 'Mar 24', pnl: 2050 },
  { date: 'Mar 25', pnl: 2320 },
  { date: 'Mar 26', pnl: 2210 },
  { date: 'Mar 27', pnl: 2480 },
  { date: 'Mar 28', pnl: 2390 },
  { date: 'Mar 29', pnl: 2610 },
  { date: 'Mar 30', pnl: 2580 },
];

export const MOCK_BACKTEST_EQUITY = [
  { date: 'Week 1', value: 10200 },
  { date: 'Week 2', value: 10450 },
  { date: 'Week 3', value: 10380 },
  { date: 'Week 4', value: 10720 },
  { date: 'Week 5', value: 10650 },
  { date: 'Week 6', value: 11080 },
  { date: 'Week 7', value: 10920 },
  { date: 'Week 8', value: 11450 },
  { date: 'Week 9', value: 11210 },
  { date: 'Week 10', value: 11890 },
  { date: 'Week 11', value: 11650 },
  { date: 'Week 12', value: 12340 },
];

export const MOCK_EXECUTION_LOG = [
  { time: '09:45:12', action: 'BUY YES', market: 'BTC above $90k by March 31', price: 0.87, qty: 200, status: 'filled' },
  { time: '09:44:58', action: 'SIGNAL', market: 'BTC above $95k by April 15', price: '-', qty: '-', status: 'detected' },
  { time: '09:42:30', action: 'SELL YES', market: 'BTC above $92k by March 30', price: 0.93, qty: 250, status: 'filled' },
  { time: '09:38:15', action: 'STOP LOSS', market: 'ETH above $3.8k by March 29', price: 0.55, qty: 150, status: 'triggered' },
  { time: '09:30:00', action: 'BUY YES', market: 'BTC drops below $85k in April', price: 0.82, qty: 300, status: 'filled' },
  { time: '09:15:22', action: 'LIMIT ORDER', market: 'SOL above $180 by April 5', price: 0.63, qty: 100, status: 'pending' },
  { time: '09:00:00', action: 'SESSION START', market: '-', price: '-', qty: '-', status: 'system' },
];
