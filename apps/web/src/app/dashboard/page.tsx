'use client';
import { useState, useEffect, useCallback } from 'react';
import Nav from '../_nav';
import { fetchBTCPrice, formatUSD, formatPercent, type BTCPrice } from '../_api';
import { MOCK_PORTFOLIO_HISTORY, MOCK_OPPORTUNITIES, MOCK_POSITIONS, MOCK_PNL, MOCK_POLYMARKET_MARKETS, MOCK_EXECUTION_LOG } from '../_mock';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const cardStyle: React.CSSProperties = { padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' };

export default function Dashboard() {
  const [btc, setBtc] = useState<BTCPrice | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'positions' | 'log'>('positions');

  const loadPrice = useCallback(async () => {
    try {
      const data = await fetchBTCPrice();
      setBtc(data);
    } catch {
      // keep existing or mock
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadPrice(); }, [loadPrice]);

  useEffect(() => {
    const iv = setInterval(loadPrice, 30000);
    return () => clearInterval(iv);
  }, [loadPrice]);

  const price = btc?.price ?? 92467;
  const change = btc?.change24h ?? 2.34;
  const sparkline = btc?.sparkline.length ? btc.sparkline : [89200, 89800, 90500, 89100, 89700, 90200, 91000, 91500, 90800, 91200, 92000, 91800, 92200, 91900, 92467];

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: 24 }}>
        {/* Live indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ios-green)', boxShadow: '0 0 8px rgba(52,199,89,0.5)' }} />
            <span style={{ fontSize: 12, color: 'var(--ios-green)', fontWeight: 500 }}>Live Data</span>
            <span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>• Auto-refresh 30s</span>
          </div>
        </div>

        {/* Top row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)', fontWeight: 500 }}>BTC/USD</div>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-1px', marginTop: 2 }}>
                  {loading ? '...' : formatUSD(price)}
                </div>
                <div style={{ fontSize: 14, color: change >= 0 ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 600, marginTop: 2 }}>
                  {change >= 0 ? '▲' : '▼'} {formatPercent(change)}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 32 }}>₿</div>
                <div style={{ fontSize: 10, color: 'var(--ios-label3)' }}>
                  H: {btc ? formatUSD(btc.high24h) : '-'}<br/>
                  L: {btc ? formatUSD(btc.low24h) : '-'}
                </div>
              </div>
            </div>
            <svg width="100%" height="40" viewBox={`0 0 ${sparkline.length * 18} 40`} style={{ marginTop: 8 }}>
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#007aff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={`M 0 ${40 - (sparkline[0] - 88000) / 400} ${sparkline.map((v, i) => `L ${(i + 1) * 18} ${40 - (v - 88000) / 400}`).join(' ')} L ${sparkline.length * 18} 40 L 0 40 Z`} fill="url(#sparkFill)" />
              <path d={`M 0 ${40 - (sparkline[0] - 88000) / 400} ${sparkline.map((v, i) => `L ${(i + 1) * 18} ${40 - (v - 88000) / 400}`).join(' ')}`} fill="none" stroke="#007aff" strokeWidth="2" />
            </svg>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 4 }}>Today's P&L</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)', letterSpacing: '-0.5px' }}>${MOCK_PNL.today.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 2 }}>{MOCK_PNL.todayTrades} trades</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 4 }}>This Week</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)', letterSpacing: '-0.5px' }}>${MOCK_PNL.week.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 2 }}>{MOCK_PNL.weekTrades} trades</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 4 }}>This Month</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)', letterSpacing: '-0.5px' }}>${MOCK_PNL.month.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 2 }}>{MOCK_PNL.monthTrades} trades</div>
          </div>
        </div>

        {/* Chart + Polymarket */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 16 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px' }}>Portfolio Value</h3>
              <span style={{ fontSize: 13, color: 'var(--ios-green)', fontWeight: 600 }}>+25.8%</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={MOCK_PORTFOLIO_HISTORY}>
                <defs><linearGradient id="pGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#007aff" stopOpacity="0.2" /><stop offset="100%" stopColor="#007aff" stopOpacity="0" /></linearGradient></defs>
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Value']} />
                <Area type="monotone" dataKey="value" stroke="#007aff" strokeWidth="2" fill="url(#pGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 12 }}>Polymarket Markets</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MOCK_POLYMARKET_MARKETS.slice(0, 5).map(m => (
                <div key={m.id} style={{ padding: '10px 12px', borderRadius: 12, background: 'var(--ios-bg)' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ios-label)', marginBottom: 4, lineHeight: 1.3 }}>{m.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ios-blue)' }}>YES {(m.yesPrice * 100).toFixed(0)}¢</span>
                    <span style={{ fontSize: 11, color: m.change24h > 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>{m.change24h > 0 ? '+' : ''}{m.change24h}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Positions & Log */}
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 12 }}>
          <div style={cardStyle}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {(['positions', 'log'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} style={{
                  padding: '6px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                  background: tab === t ? 'var(--ios-blue)' : 'var(--ios-bg)', color: tab === t ? '#fff' : 'var(--ios-label2)',
                }}>{t === 'positions' ? 'Open Positions' : 'Execution Log'}</button>
              ))}
            </div>

            {tab === 'positions' ? (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead><tr style={{ borderBottom: '1px solid var(--ios-separator)' }}>
                  {['Market', 'Side', 'Size', 'P&L', 'Strategy'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--ios-label3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {MOCK_POSITIONS.map(p => (
                    <tr key={p.id} style={{ borderBottom: '0.5px solid var(--ios-bg)' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 500, maxWidth: 200, lineHeight: 1.3 }}>{p.marketTitle}</td>
                      <td style={{ padding: '10px 12px' }}><span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: p.side === 'yes' ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)', color: p.side === 'yes' ? 'var(--ios-green)' : 'var(--ios-red)' }}>{p.side.toUpperCase()}</span></td>
                      <td style={{ padding: '10px 12px', fontWeight: 500 }}>${p.size}</td>
                      <td style={{ padding: '10px 12px', fontWeight: 600, color: p.pnl >= 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>${p.pnl.toFixed(2)} ({p.pnlPercent > 0 ? '+' : ''}{p.pnlPercent.toFixed(1)}%)</td>
                      <td style={{ padding: '10px 12px', color: 'var(--ios-label3)' }}>{p.strategy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {MOCK_EXECUTION_LOG.map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 12px', borderRadius: 8, background: i % 2 === 0 ? 'var(--ios-bg)' : 'transparent', fontSize: 12 }}>
                    <span style={{ color: 'var(--ios-label3)', fontFamily: 'monospace', width: 70 }}>{e.time}</span>
                    <span style={{ fontWeight: 600, color: e.action.includes('BUY') ? 'var(--ios-green)' : e.action.includes('SELL') ? 'var(--ios-red)' : 'var(--ios-blue)', width: 90 }}>{e.action}</span>
                    <span style={{ color: 'var(--ios-label)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.market}</span>
                    <span style={{ color: 'var(--ios-label3)' }}>{e.price}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Top Opportunities</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {MOCK_OPPORTUNITIES.slice(0, 4).map(o => (
                <div key={o.id} style={{ padding: 10, borderRadius: 10, background: 'var(--ios-bg)' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, marginBottom: 4, color: 'var(--ios-label)' }}>{o.marketTitle}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ios-green)' }}>+{o.spread.toFixed(1)}%</span>
                    <span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>{o.confidence}% conf</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
