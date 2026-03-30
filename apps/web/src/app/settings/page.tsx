'use client';
import { useState } from 'react';
import Nav from '../_nav';

const card: React.CSSProperties = { padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' };

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [binanceKey, setBinanceKey] = useState('');
  const [polymarketKey, setPolymarketKey] = useState('');
  const [coingeckoKey, setCoingeckoKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Settings</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>API connections, risk limits & preferences.</p>

        {/* API Keys */}
        <div style={card}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>🔌 API Connections</h3>
          {[
            { label: 'Binance API Key', value: binanceKey, set: setBinanceKey, placeholder: 'Enter Binance API key...', status: '⚠️ Not connected' },
            { label: 'Polymarket CLOB Key', value: polymarketKey, set: setPolymarketKey, placeholder: 'Enter Polymarket CLOB key...', status: '⚠️ Not connected' },
            { label: 'CoinGecko API Key', value: coingeckoKey, set: setCoingeckoKey, placeholder: 'Enter CoinGecko key (free tier)...', status: '⚠️ Not connected' },
          ].map(api => (
            <div key={api.label} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-label2)' }}>{api.label}</label>
                <span style={{ fontSize: 12, color: 'var(--ios-orange)' }}>{api.status}</span>
              </div>
              <input type="password" value={api.value} onChange={e => api.set(e.target.value)} placeholder={api.placeholder} style={{
                width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--ios-separator)',
                fontSize: 14, background: 'var(--ios-bg)', outline: 'none',
              }} />
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleSave} style={{
              padding: '10px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              background: 'var(--ios-blue)', color: '#fff',
            }}>Save Keys</button>
            {saved && <span style={{ fontSize: 13, color: 'var(--ios-green)', display: 'flex', alignItems: 'center' }}>✓ Saved</span>}
          </div>
        </div>

        {/* Risk Limits */}
        <div style={{ ...card, marginTop: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🛡️ Global Risk Limits</h3>
          {[
            { label: 'Max daily loss', value: '$1,000' },
            { label: 'Max open positions', value: '5' },
            { label: 'Max single trade size', value: '$500' },
            { label: 'Min confidence to auto-trade', value: '70%' },
          ].map(r => (
            <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '0.5px solid var(--ios-bg)' }}>
              <span style={{ fontSize: 14, color: 'var(--ios-label2)' }}>{r.label}</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ ...card, marginTop: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🔔 Notifications</h3>
          {[
            { label: 'New arbitrage opportunity', desc: 'When spread exceeds threshold', on: true },
            { label: 'Trade executed', desc: 'When auto-trader executes a trade', on: true },
            { label: 'Stop loss triggered', desc: 'When a position hits stop loss', on: true },
            { label: 'Daily summary', desc: 'End of day P&L report', on: false },
          ].map(n => (
            <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '0.5px solid var(--ios-bg)' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--ios-label)' }}>{n.label}</div>
                <div style={{ fontSize: 12, color: 'var(--ios-label3)' }}>{n.desc}</div>
              </div>
              <div style={{
                width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
                background: n.on ? 'var(--ios-green)' : 'var(--ios-separator)', position: 'relative',
              }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#fff',
                  position: 'absolute', top: 2, left: n.on ? 20 : 2,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>

        {/* Theme */}
        <div style={{ ...card, marginTop: 12 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>🎨 Theme</h3>
          <div style={{ display: 'flex', gap: 8 }}>
            {(['light', 'dark'] as const).map(t => (
              <button key={t} onClick={() => setTheme(t)} style={{
                flex: 1, padding: 14, borderRadius: 12, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: theme === t ? 'var(--ios-blue)' : 'var(--ios-bg)', color: theme === t ? '#fff' : 'var(--ios-label2)',
              }}>
                {t === 'light' ? '☀️ Light' : '🌙 Dark'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
