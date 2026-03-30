# Arbitrage Edge — Architecture

## Overview
BTC/Polymarket arbitrage trading platform. Exploits price lag between BTC spot markets and Polymarket crypto prediction markets with real-time scanning, rich analytics, and AI-powered auto-trading.

## Monorepo Structure
```
arbitrage-edge/
├── package.json              # pnpm workspace root
├── pnpm-workspace.yaml       # workspace config
├── ARCHITECTURE.md           # this file
├── apps/
│   └── web/                  # Next.js 14 app
│       ├── package.json
│       ├── next.config.js
│       ├── vercel.json
│       └── src/
│           ├── app/
│           │   ├── layout.tsx
│           │   ├── page.tsx          # Landing
│           │   ├── dashboard/page.tsx
│           │   ├── markets/page.tsx
│           │   ├── opportunities/page.tsx
│           │   ├── trades/page.tsx
│           │   ├── strategy/page.tsx
│           │   ├── analytics/page.tsx
│           │   └── settings/page.tsx
│           └── globals.css
├── packages/
│   ├── core/                 # Types, constants, utils
│   │   ├── package.json
│   │   └── src/
│   │       ├── types.ts
│   │       └── constants.ts
│   └── ui/                   # Shared UI components
│       ├── package.json
│       └── src/
│           └── index.ts
```

## Pages & Features

### Landing (/)
- Hero section with animated BTC price ticker
- Feature cards: Arb Scanner, AI Trading, Analytics
- Gradient background with CTA to dashboard
- framer-motion entrance animations

### Dashboard (/dashboard)
- Live BTC price card with sparkline (recharts AreaChart)
- Active arbitrage opportunities table
- Open positions summary cards
- P&L breakdown (today/week/month)
- Mini portfolio value chart
- Polymarket crypto markets sidebar
- Real-time refresh indicator

### Markets (/markets)
- Polymarket crypto prediction markets grid
- BTC exchange data panel (Binance, Coinbase, Kraken)
- Market cards with price, volume, 24h change
- Filter by market type (price level, range, event)
- Sort by spread, volume, expiry

### Opportunities (/opportunities)
- Real-time arb scanner table sorted by profitability
- Columns: market, BTC price, Polymarket implied, spread %, confidence, action
- Filters: min spread %, min confidence, market type
- Auto-refresh with countdown indicator
- Opportunity detail modal with full analysis

### Trades (/trades)
- Tabbed interface: Open Positions | Trade History
- Open positions with live P&L calculation
- Trade history with date/symbol/status filters
- Execution log with timestamps and fill details
- Export CSV button

### Strategy (/strategy)
- Strategy selector: Lag Arbitrage, Mean Reversion, Momentum
- Risk parameters: max position size, stop loss %, daily loss limit, max concurrent trades
- Paper trading toggle with indicator
- AI agent selector (Claude/GLM/Manual)
- Backtesting section with equity curve chart
- Active strategy status card with controls

### Analytics (/analytics)
- P&L over time line chart (recharts)
- Win rate donut chart (recharts PieChart)
- Monthly returns bar chart
- Key metrics: Sharpe ratio, max drawdown, avg trade return, total P&L
- Best/worst trades cards
- Strategy comparison table

### Settings (/settings)
- API connection management (CoinGecko, Binance, Polymarket)
- Risk limit configuration
- Notification preferences (browser, email)
- Theme toggle (light/dark)
- Account & security settings

## Data Sources

### CoinGecko Free API
- BTC current price, 24h change, market cap
- Historical price data for charts
- Rate limit: 10-30 calls/min (free tier)

### Binance WebSocket
- Real-time BTC/USDT ticker stream
- Order book depth for spread analysis
- 1m/5m candlestick data

### Polymarket CLOB API
- Crypto prediction markets listing
- Market prices (YES/NO token prices)
- Order book data for liquidity analysis
- Market resolution data

## Auto-Trading Engine

### Strategy Templates
1. **Lag Arbitrage** — Detects price lag between BTC spot and Polymarket implied probability. Enters when spread exceeds threshold.
2. **Mean Reversion** — Identifies overextended Polymarket prices relative to BTC movement. Trades the snap-back.
3. **Momentum** — Rides trending moves where Polymarket lag creates sustained opportunities.

### Risk Management
- Per-trade position limits (% of portfolio)
- Stop-loss levels (configurable %)
- Daily loss limits (circuit breaker)
- Maximum concurrent open positions
- Slippage estimation and protection

### Paper Trading
- Full simulation mode with virtual balance
- Realistic fill simulation with slippage
- Paper trading results tracked separately
- One-click switch to live mode (with confirmation)

### AI Agent Integration
- **Claude**: Strategic analysis, market interpretation
- **GLM**: Fast signal processing, pattern recognition
- **Manual**: User-driven execution

## Chart Libraries
- **recharts**: Dashboard charts (LineChart, AreaChart, BarChart, PieChart)
- **lightweight-charts**: Candlestick charts for BTC price on dashboard

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Inline styles with CSS variables (Apple-like design)
- **Charts**: recharts + lightweight-charts
- **Animation**: framer-motion
- **Package Manager**: pnpm workspaces
- **Deployment**: Vercel

## Implementation Phases

### Phase 1 — Foundation (Current)
- Monorepo scaffold with pnpm workspaces
- All page routes and layouts
- Mock data layer
- Core types and constants
- Landing page with animations

### Phase 2 — Data Integration
- CoinGecko API client with caching
- Binance WebSocket connection manager
- Polymarket CLOB API client
- Real-time data pipeline

### Phase 3 — Trading Engine
- Strategy execution engine
- Risk management system
- Paper trading mode
- Order management

### Phase 4 — AI & Automation
- AI agent connectors (Claude, GLM)
- Signal generation pipeline
- Automated strategy execution
- Performance monitoring

### Phase 5 — Production
- Authentication & authorization
- Database persistence (Supabase)
- Notification system
- Monitoring & alerting
- Mobile app (React Native)
