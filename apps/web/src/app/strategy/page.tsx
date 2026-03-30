'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { loadTradingState, saveTradingState } from '../_api';
import { MOCK_BACKTEST_EQUITY } from '../_mock';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const STRATEGIES = [
  { id: 'lag-arb', name: 'Lag Arbitrage', desc: 'Exploit price lag between spot BTC and Polymarket implied prices.', icon: '⚡' },
  { id: 'mean-rev', name: 'Mean Reversion', desc: 'Trade price corrections when Polymarket deviates from fair value.', icon: '🔄' },
  { id: 'momentum', name: 'Momentum', desc: 'Follow momentum signals when both markets align directionally.', icon: '🚀' },
];

const card: React.CSSProperties = { padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' };

export default function Strategy() {
  const [state, setState] = useState(loadTradingState());
  const [active, setActive] = useState<string>(state.config.strategy);
  const [paperTrading, setPaperTrading] = useState(state.config.paperTrading);
  const [aiAgent, setAiAgent] = useState(state.config.aiAgent);

  const updateConfig = (partial: Record<string, unknown>) => {
    const newState = { ...state, config: { ...state.config, ...partial } };
    setState(newState);
    saveTradingState(newState);
  };

  const strat = STRATEGIES.find(s => s.id === active) || STRATEGIES[0];

  return (
    <div>
      <Nav />
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 4 }}>Strategy</h1>
        <p style={{ fontSize: 15, color: 'var(--ios-label3)', marginBottom: 24 }}>Configure auto-trading strategies and risk parameters.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
          {STRATEGIES.map(s => (
            <div key={s.id} onClick={() => { setActive(s.id); updateConfig({ strategy: s.id as any }); }} style={{
              ...card, cursor: 'pointer' as const,
              border: active === s.id ? '2px solid var(--ios-blue)' : '2px solid transparent',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: 'var(--ios-label)' }}>{s.name}</h3>
              <p style={{ fontSize: 12, color: 'var(--ios-label3)', lineHeight: 1.4 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={card}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Risk Management</h3>
            {[
              { label: 'Max Position Size ($)', key: 'maxPositionSize', value: state.config.maxPositionSize, min: 100, max: 5000, step: 100 },
              { label: 'Stop Loss (%)', key: 'stopLossPercent', value: state.config.stopLossPercent, min: 5, max: 50, step: 1 },
              { label: 'Daily Loss Limit ($)', key: 'dailyLossLimit', value: state.config.dailyLossLimit, min: 100, max: 5000, step: 100 },
              { label: 'Max Concurrent Trades', key: 'maxConcurrent', value: state.config.maxConcurrent, min: 1, max: 10, step: 1 },
            ].map(p => (
              <div key={p.key} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ios-label2)' }}>{p.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--ios-blue)' }}>{p.value}</span>
                </div>
                <input type="range" min={p.min} max={p.max} step={p.step} value={p.value}
                  onChange={e => updateConfig({ [p.key]: +e.target.value })} style={{ width: '100%' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Trading Mode</h3>
                  <p style={{ fontSize: 13, color: 'var(--ios-label3)' }}>{paperTrading ? 'Paper trading - simulated with real data' : 'LIVE - real money at risk'}</p>
                </div>
                <div onClick={() => { setPaperTrading(!paperTrading); updateConfig({ paperTrading: !paperTrading }); }} style={{
                  width: 52, height: 32, borderRadius: 16, cursor: 'pointer',
                  background: paperTrading ? 'var(--ios-green)' : 'var(--ios-red)', position: 'relative',
                }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 3, left: paperTrading ? 3 : 23, boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }} />
                </div>
              </div>
            </div>

            <div style={card}>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>AI Agent</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['claude', 'glm', 'manual'] as const).map(a => (
                  <button key={a} onClick={() => { setAiAgent(a); updateConfig({ aiAgent: a }); }} style={{
                    flex: 1, padding: '12px 8px', borderRadius: 12, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
                    background: aiAgent === a ? 'var(--ios-blue)' : 'var(--ios-bg)', color: aiAgent === a ? '#fff' : 'var(--ios-label2)',
                  }}>{a === 'claude' ? '🟣 Claude' : a === 'glm' ? '🔵 GLM' : '👤 Manual'}</button>
                ))}
              </div>
              <p style={{ fontSize: 12, color: 'var(--ios-label3)', marginTop: 8 }}>
                {aiAgent === 'manual' ? 'You review and approve every trade manually.' : `${aiAgent === 'claude' ? 'Claude' : 'GLM'} will analyze and execute trades autonomously.`}
              </p>
            </div>

            <div style={{ ...card, background: 'linear-gradient(135deg, #007aff, #5856d6)', color: '#fff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>Active Strategy</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>{strat.name}</div>
                  <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>{paperTrading ? '📝 Paper' : '🔴 LIVE'} &middot; {aiAgent.toUpperCase()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8 }}>Total P&L</div>
                  <div style={{ fontSize: 24, fontWeight: 700, marginTop: 4 }}>+${state.totalPnl.toFixed(0)}</div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>{state.positions.length} open positions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ ...card, marginTop: 16 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Backtest &mdash; {strat.name} (Last 12 Weeks)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MOCK_BACKTEST_EQUITY}>
              <defs><linearGradient id="btGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#007aff" stopOpacity="0.2" /><stop offset="100%" stopColor="#007aff" stopOpacity="0" /></linearGradient></defs>
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8e8e93' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 13 }} formatter={(v: number) => [`$${v.toLocaleString()}`, 'Equity']} />
              <Area type="monotone" dataKey="value" stroke="#007aff" strokeWidth="2" fill="url(#btGrad)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
            <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Start</span><br /><span style={{ fontWeight: 600 }}>$10,000</span></div>
            <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>End</span><br /><span style={{ fontWeight: 600 }}>$12,340</span></div>
            <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Return</span><br /><span style={{ fontWeight: 600, color: 'var(--ios-green)' }}>+23.4%</span></div>
            <div><span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Max Drawdown</span><br /><span style={{ fontWeight: 600, color: 'var(--ios-red)' }}>-4.2%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
