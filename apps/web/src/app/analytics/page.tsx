'use client';
import Nav from '../_nav';
import { MOCK_ANALYTICS_PNL, MOCK_MONTHLY_RETURNS, MOCK_TRADES } from '../_mock';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const card: React.CSSProperties = { padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' };

const WIN_LOSS = [
  { name: 'Wins', value: MOCK_TRADES.filter(t => t.pnl >= 0).length, color: '#34c759' },
  { name: 'Losses', value: MOCK_TRADES.filter(t => t.pnl < 0).length, color: '#ff3b30' },
];

const STRATEGY_COMPARE = [
  { name: 'Lag Arb', pnl: 4210, trades: 156, winRate: 78, sharpe: 2.1 },
  { name: 'Mean Rev', pnl: 1890, trades: 89, winRate: 71, sharpe: 1.8 },
  { name: 'Momentum', pnl: 2870, trades: 67, winRate: 62, sharpe: 1.5 },
];

export default function Analytics() {
  const totalPnl = MOCK_TRADES.reduce((s, t) => s + t.pnl, 0);
  const wins = MOCK_TRADES.filter(t => t.pnl >= 0);
  const avgWin = wins.reduce((s, t) => s + t.pnl, 0) / wins.length;
  const losses = MOCK_TRADES.filter(t => t.pnl < 0);
  const avgLoss = losses.length ? losses.reduce((s, t) => s + t.pnl, 0) / losses.length : 0;

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Analytics</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>Performance insights & strategy metrics.</p>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total P&L', value: `$${totalPnl.toFixed(2)}`, color: totalPnl >= 0 ? 'var(--ios-green)' : 'var(--ios-red)' },
            { label: 'Win Rate', value: `${((wins.length / MOCK_TRADES.length) * 100).toFixed(0)}%`, color: 'var(--ios-blue)' },
            { label: 'Sharpe Ratio', value: '1.92', color: 'var(--ios-label)' },
            { label: 'Max Drawdown', value: '-6.8%', color: 'var(--ios-red)' },
          ].map((m, i) => (
            <div key={i} style={card}>
              <div style={{ fontSize: 12, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 4 }}>{m.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.5px', color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* P&L chart + Win rate donut */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Cumulative P&L</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={MOCK_ANALYTICS_PNL}>
                <defs>
                  <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34c759" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#34c759" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8e8e93' }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${v}`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'P&L']} />
                <Area type="monotone" dataKey="pnl" stroke="#34c759" strokeWidth="2" fill="url(#pnlGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Win / Loss</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={WIN_LOSS} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {WIN_LOSS.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 8 }}>
              {WIN_LOSS.map(d => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                  <span style={{ fontWeight: 600 }}>{d.name}</span>
                  <span style={{ color: 'var(--ios-label3)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly returns + Strategy comparison */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Monthly Returns</h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={MOCK_MONTHLY_RETURNS}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v}%`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} formatter={(v: number) => [`${v}%`, 'Return']} />
                <Bar dataKey="return" radius={[6, 6, 0, 0]}>
                  {MOCK_MONTHLY_RETURNS.map((d, i) => <Cell key={i} fill={d.return >= 0 ? '#34c759' : '#ff3b30'} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Strategy Comparison</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--ios-separator)' }}>
                  {['Strategy', 'P&L', 'Win%', 'Sharpe'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: 'var(--ios-label3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {STRATEGY_COMPARE.map(s => (
                  <tr key={s.name} style={{ borderBottom: '0.5px solid var(--ios-bg)' }}>
                    <td style={{ padding: '10px', fontWeight: 600 }}>{s.name}</td>
                    <td style={{ padding: '10px', color: 'var(--ios-green)', fontWeight: 600 }}>+${s.pnl.toLocaleString()}</td>
                    <td style={{ padding: '10px' }}>{s.winRate}%</td>
                    <td style={{ padding: '10px' }}>{s.sharpe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best/worst trades */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🏆 Best Trade</h3>
            {(() => {
              const best = MOCK_TRADES.reduce((b, t) => t.pnl > b.pnl ? t : b, MOCK_TRADES[0]);
              return (
                <>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{best.marketTitle}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)' }}>+${best.pnl.toFixed(2)} ({best.pnlPercent > 0 ? '+' : ''}{best.pnlPercent.toFixed(1)}%)</div>
                  <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 4 }}>{best.strategy} • {best.exitTime}</div>
                </>
              );
            })()}
          </div>
          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💀 Worst Trade</h3>
            {(() => {
              const worst = MOCK_TRADES.reduce((w, t) => t.pnl < w.pnl ? t : w, MOCK_TRADES[0]);
              return (
                <>
                  <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 }}>{worst.marketTitle}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-red)' }}>${worst.pnl.toFixed(2)} ({worst.pnlPercent.toFixed(1)}%)</div>
                  <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 4 }}>{worst.strategy} • {worst.exitTime}</div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
