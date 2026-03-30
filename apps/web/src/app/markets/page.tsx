'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { MOCK_POLYMARKET_MARKETS, MOCK_EXCHANGE_PRICES } from '../_mock';

const CATEGORIES = ['All', 'Price Level', 'Event', 'Trend'];

export default function Markets() {
  const [filter, setFilter] = useState('All');
  const [tab, setTab] = useState<'polymarket' | 'exchanges'>('polymarket');

  const filtered = filter === 'All' ? MOCK_POLYMARKET_MARKETS : MOCK_POLYMARKET_MARKETS.filter(m => m.category === filter);

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Markets</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>Browse Polymarket crypto markets & BTC exchange prices.</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {(['polymarket', 'exchanges'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: '8px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: tab === t ? 'var(--ios-blue)' : 'var(--ios-bg2)', color: tab === t ? '#fff' : 'var(--ios-label2)',
              boxShadow: tab === t ? '0 2px 8px rgba(0,122,255,0.3)' : 'var(--ios-shadow)',
            }}>
              {t === 'polymarket' ? '🎲 Polymarket' : '🏦 Exchanges'}
            </button>
          ))}
        </div>

        {tab === 'polymarket' ? (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{
                  padding: '6px 14px', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer',
                  background: filter === c ? 'var(--ios-label)' : 'var(--ios-bg2)', color: filter === c ? '#fff' : 'var(--ios-label2)',
                }}>{c}</button>
              ))}
            </div>

            {/* Market grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12 }}>
              {filtered.map(m => (
                <div key={m.id} style={{ padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 600, background: 'rgba(0,122,255,0.08)', color: 'var(--ios-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.category}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: m.change24h > 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>{m.change24h > 0 ? '+' : ''}{m.change24h}%</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.2px', marginBottom: 16, lineHeight: 1.3, color: 'var(--ios-label)' }}>{m.title}</h3>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <div style={{ flex: 1, padding: 10, borderRadius: 10, background: 'rgba(52,199,89,0.08)', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 2 }}>YES</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ios-green)' }}>{(m.yesPrice * 100).toFixed(0)}¢</div>
                    </div>
                    <div style={{ flex: 1, padding: 10, borderRadius: 10, background: 'rgba(255,59,48,0.08)', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: 'var(--ios-label3)', fontWeight: 500, marginBottom: 2 }}>NO</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ios-red)' }}>{(m.noPrice * 100).toFixed(0)}¢</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ios-label3)' }}>
                    <span>Vol: ${(m.volume24h / 1000).toFixed(0)}k</span>
                    <span>Liq: ${(m.liquidity / 1000).toFixed(0)}k</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Exchanges */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {MOCK_EXCHANGE_PRICES.map((e, i) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{e.exchange}</h3>
                  <span style={{ fontSize: 12, fontWeight: 600, color: e.change24h > 0 ? 'var(--ios-green)' : 'var(--ios-red)' }}>+{e.change24h}%</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-1px', marginBottom: 4 }}>${e.price.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: 'var(--ios-label3)' }}>Volume: {e.volume}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
