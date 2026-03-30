'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { MOCK_POSITIONS, MOCK_TRADES } from '../_mock';

export default function Trades() {
  const [tab, setTab] = useState<'positions' | 'history'>('positions');

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Trades</h1>
            <p style={{ fontSize: 15, color: 'var(--ios-label3)' }}>Open positions & trade history.</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['positions', 'history'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: '8px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: tab === t ? 'var(--ios-blue)' : 'var(--ios-bg2)', color: tab === t ? '#fff' : 'var(--ios-label2)',
                boxShadow: tab === t ? '0 2px 8px rgba(0,122,255,0.3)' : 'var(--ios-shadow)',
              }}>
                {t === 'positions' ? `Open (${MOCK_POSITIONS.length})` : 'History'}
              </button>
            ))}
            <button style={{
              padding: '8px 16px', borderRadius: 12, fontSize: 13, fontWeight: 600, border: '1px solid var(--ios-separator)', cursor: 'pointer',
              background: 'var(--ios-bg2)', color: 'var(--ios-label2)',
            }}>Export CSV</button>
          </div>
        </div>

        {tab === 'positions' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 8 }}>
              <div style={{ padding: 16, borderRadius: 14, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginBottom: 4 }}>Total Position Size</div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>${MOCK_POSITIONS.reduce((s, p) => s + p.size, 0).toLocaleString()}</div>
              </div>
              <div style={{ padding: 16, borderRadius: 14, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginBottom: 4 }}>Unrealized P&L</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)' }}>+${MOCK_POSITIONS.reduce((s, p) => s + p.pnl, 0).toFixed(2)}</div>
              </div>
              <div style={{ padding: 16, borderRadius: 14, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginBottom: 4 }}>Avg Return</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--ios-green)' }}>+{(MOCK_POSITIONS.reduce((s, p) => s + p.pnlPercent, 0) / MOCK_POSITIONS.length).toFixed(1)}%</div>
              </div>
            </div>

            {/* Position cards */}
            {MOCK_POSITIONS.map(p => (
              <div key={p.id} style={{ padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: p.side === 'yes' ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)', color: p.side === 'yes' ? 'var(--ios-green)' : 'var(--ios-red)' }}>{p.side.toUpperCase()}</span>
                      <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500, background: 'var(--ios-bg)', color: 'var(--ios-label3)' }}>{p.strategy}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--ios-label)', maxWidth: 400, lineHeight: 1.3 }}>{p.marketTitle}</h3>
                    <div style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 4 }}>Entered {p.entryTime}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 24, fontWeight: 700, color: p.pnl >= 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>
                      {p.pnl >= 0 ? '+' : ''}${p.pnl.toFixed(2)}
                    </div>
                    <div style={{ fontSize: 13, color: p.pnl >= 0 ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 500 }}>
                      {p.pnlPercent > 0 ? '+' : ''}{p.pnlPercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 20, marginTop: 12, padding: '12px 16px', borderRadius: 10, background: 'var(--ios-bg)' }}>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Entry</span><br /><span style={{ fontSize: 13, fontWeight: 600 }}>{p.entryPrice}</span></div>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Current</span><br /><span style={{ fontSize: 13, fontWeight: 600 }}>{p.currentPrice}</span></div>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Size</span><br /><span style={{ fontSize: 13, fontWeight: 600 }}>${p.size}</span></div>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Qty</span><br /><span style={{ fontSize: 13, fontWeight: 600 }}>{p.quantity}</span></div>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Stop Loss</span><br /><span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-red)' }}>{p.stopLoss}</span></div>
                  <div><span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Take Profit</span><br /><span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-green)' }}>{p.takeProfit}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Trade history table */
          <div style={{ borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--ios-bg)' }}>
                  {['Market', 'Side', 'Entry', 'Exit', 'Qty', 'P&L', 'Strategy', 'Time'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--ios-label3)', fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_TRADES.map(t => (
                  <tr key={t.id} style={{ borderBottom: '0.5px solid var(--ios-bg)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 500, maxWidth: 180, lineHeight: 1.3 }}>{t.marketTitle}</td>
                    <td style={{ padding: '12px 16px' }}><span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600, background: t.side === 'long' ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)', color: t.side === 'long' ? 'var(--ios-green)' : 'var(--ios-red)' }}>{t.side.toUpperCase()}</span></td>
                    <td style={{ padding: '12px 16px' }}>{t.entryPrice}</td>
                    <td style={{ padding: '12px 16px' }}>{t.exitPrice}</td>
                    <td style={{ padding: '12px 16px' }}>{t.quantity}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: t.pnl >= 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>
                      {t.pnl >= 0 ? '+' : ''}${t.pnl.toFixed(2)} ({t.pnlPercent > 0 ? '+' : ''}{t.pnlPercent.toFixed(1)}%)
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--ios-label3)' }}>{t.strategy}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ios-label3)', fontSize: 11 }}>{t.exitTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
