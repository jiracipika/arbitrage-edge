'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { MOCK_OPPORTUNITIES } from '../_mock';

const RISK_COLORS: Record<string, string> = { low: 'var(--ios-green)', medium: 'var(--ios-orange)', high: 'var(--ios-red)' };

export default function Opportunities() {
  const [minSpread, setMinSpread] = useState(0);
  const [minConf, setMinConf] = useState(0);
  const [detail, setDetail] = useState<string | null>(null);

  const filtered = MOCK_OPPORTUNITIES.filter(o => o.spread >= minSpread && o.confidence >= minConf);

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Arb Scanner</h1>
            <p style={{ fontSize: 15, color: 'var(--ios-label3)' }}>Real-time arbitrage opportunities detected.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ios-green)', boxShadow: '0 0 8px rgba(52,199,89,0.5)' }} />
            <span style={{ fontSize: 13, color: 'var(--ios-green)', fontWeight: 500 }}>Scanning</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: 16, borderRadius: 14, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ios-label3)', display: 'block', marginBottom: 6 }}>Min Spread %</label>
            <input type="range" min={0} max={10} step={0.5} value={minSpread} onChange={e => setMinSpread(+e.target.value)}
              style={{ width: '100%' }} />
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{minSpread}%</div>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ios-label3)', display: 'block', marginBottom: 6 }}>Min Confidence %</label>
            <input type="range" min={0} max={100} step={5} value={minConf} onChange={e => setMinConf(+e.target.value)}
              style={{ width: '100%' }} />
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{minConf}%</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'end', paddingBottom: 4 }}>
            <span style={{ fontSize: 13, color: 'var(--ios-label3)' }}>{filtered.length} opportunities</span>
          </div>
        </div>

        {/* Opportunity cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtered.map(o => (
            <div key={o.id} style={{
              padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)',
              border: detail === o.id ? '2px solid var(--ios-blue)' : '2px solid transparent',
              cursor: 'pointer', transition: 'border-color 0.2s',
            }} onClick={() => setDetail(detail === o.id ? null : o.id)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: 'rgba(0,122,255,0.08)', color: 'var(--ios-blue)', textTransform: 'uppercase' }}>{o.marketType}</span>
                    <span style={{ padding: '2px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: `${RISK_COLORS[o.riskLevel]}15`, color: RISK_COLORS[o.riskLevel], textTransform: 'uppercase' }}>{o.riskLevel} risk</span>
                    <span style={{ fontSize: 11, color: 'var(--ios-label3)' }}>Detected {o.detectedAt}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.2px', marginBottom: 8, color: 'var(--ios-label)' }}>{o.marketTitle}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--ios-green)', letterSpacing: '-1px' }}>+{o.spread.toFixed(1)}%</div>
                  <div style={{ fontSize: 12, color: 'var(--ios-label3)' }}>~${o.expectedProfit} profit</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Spot Price</span><br /><span style={{ fontSize: 14, fontWeight: 600 }}>${o.btcPrice.toLocaleString()}</span></div>
                <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>PM Implied</span><br /><span style={{ fontSize: 14, fontWeight: 600 }}>${o.polymarketImplied.toLocaleString()}</span></div>
                <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Confidence</span><br /><span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ios-blue)' }}>{o.confidence}%</span></div>
                <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Liquidity</span><br /><span style={{ fontSize: 14, fontWeight: 600 }}>${(o.liquidity / 1000).toFixed(0)}k</span></div>
                <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Expires</span><br /><span style={{ fontSize: 14, fontWeight: 600 }}>{o.expiresAt}</span></div>
              </div>

              {/* Detail expanded */}
              {detail === o.id && (
                <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: 'var(--ios-bg)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: 'var(--ios-label)' }}>🧠 AI Reasoning</div>
                  <p style={{ fontSize: 13, color: 'var(--ios-label2)', lineHeight: 1.5 }}>{o.reasoning}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button style={{
                      padding: '8px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: 'var(--ios-blue)', color: '#fff',
                    }}>Execute Trade</button>
                    <button style={{
                      padding: '8px 20px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                      background: 'var(--ios-bg2)', color: 'var(--ios-label)',
                    }}>Add to Watchlist</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
