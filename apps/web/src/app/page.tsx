'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MOCK_BTC_PRICE, MOCK_SPARKLINE, MOCK_BTC_CHANGE_24H } from './_mock';

const FEATURES = [
  { icon: '🎯', title: 'Arb Scanner', desc: 'Real-time detection of price lag between BTC spot markets and Polymarket prediction markets.', gradient: 'linear-gradient(135deg, #007aff, #5ac8fa)' },
  { icon: '🧠', title: 'AI Auto-Trading', desc: 'AI-powered strategy execution with Claude and GLM agents. Paper trade or go live with one click.', gradient: 'linear-gradient(135deg, #af52de, #ff375f)' },
  { icon: '📈', title: 'Analytics', desc: 'Deep performance insights with P&L tracking, Sharpe ratio, drawdown analysis, and strategy comparison.', gradient: 'linear-gradient(135deg, #34c759, #30d158)' },
  { icon: '⚡', title: 'Lightning Fast', desc: 'WebSocket-powered real-time data. Detect and act on arbitrage opportunities in milliseconds.', gradient: 'linear-gradient(135deg, #ff9500, #ff3b30)' },
  { icon: '🛡️', title: 'Risk Management', desc: 'Built-in stop losses, position limits, and daily loss caps. Trade smarter, not harder.', gradient: 'linear-gradient(135deg, #5856d6, #007aff)' },
  { icon: '📊', title: 'Live Dashboard', desc: 'Professional trading dashboard with real-time charts, P&L tracking, and execution monitoring.', gradient: 'linear-gradient(135deg, #34c759, #007aff)' },
];

const TICKER = [
  { symbol: 'BTC', price: '$92,467', change: '+2.34%', positive: true },
  { symbol: 'ETH', price: '$3,567', change: '+4.12%', positive: true },
  { symbol: 'SOL', price: '$178', change: '+8.45%', positive: true },
  { symbol: 'DOGE', price: '$0.184', change: '+12.5%', positive: true },
  { symbol: 'XRP', price: '$2.41', change: '-1.2%', positive: false },
];

export default function Landing() {
  const [tickerOffset, setTickerOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTickerOffset(o => o + 0.5), 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--ios-bg)' }}>
      {/* Ticker */}
      <div style={{ background: 'rgba(0,0,0,0.03)', borderBottom: '0.5px solid var(--ios-separator)', overflow: 'hidden', height: 40, display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 32, transform: `translateX(${-tickerOffset}px)`, whiteSpace: 'nowrap' }}>
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 600, color: 'var(--ios-label)' }}>{t.symbol}</span>
              <span style={{ color: 'var(--ios-label2)' }}>{t.price}</span>
              <span style={{ color: t.positive ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 500 }}>{t.change}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(160deg, #0a0a1a 0%, #1a1a3e 40%, #0d2137 100%)',
        padding: '100px 24px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 50%, rgba(0,122,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(175,82,222,0.1) 0%, transparent 40%)' }} />
        
        {/* Animated sparkline */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <svg width="280" height="60" viewBox="0 0 280 60" style={{ margin: '0 auto 24px', position: 'relative' }}>
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#007aff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#007aff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={`M 0 ${60 - MOCK_SPARKLINE[0] / 1600} ${MOCK_SPARKLINE.map((v, i) => `L ${(i + 1) * 18} ${60 - v / 1600}`).join(' ')}`}
              fill="none"
              stroke="#007aff"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ position: 'relative' }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>⚡</div>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#fff', letterSpacing: '-2px', marginBottom: 8 }}>
            Arbitrage Edge
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto 12px', lineHeight: 1.5 }}>
            Exploit price lag between BTC markets & Polymarket
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(52,199,89,0.15)', padding: '6px 16px', borderRadius: 20, marginBottom: 32 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34c759', boxShadow: '0 0 8px rgba(52,199,89,0.5)' }} />
            <span style={{ color: '#34c759', fontSize: 14, fontWeight: 500 }}>BTC ${MOCK_BTC_PRICE.toLocaleString()} ({MOCK_BTC_CHANGE_24H > 0 ? '+' : ''}{MOCK_BTC_CHANGE_24H}%)</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: 'flex', gap: 12, justifyContent: 'center', position: 'relative' }}>
          <Link href="/dashboard" style={{
            height: 52, borderRadius: 16, padding: '0 32px',
            background: 'var(--ios-blue)', color: '#fff', fontSize: 17, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            boxShadow: '0 4px 20px rgba(0,122,255,0.4)',
          }}>
            Open Dashboard
          </Link>
          <Link href="/opportunities" style={{
            height: 52, borderRadius: 16, padding: '0 32px',
            background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 17, fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
          }}>
            View Opportunities
          </Link>
        </motion.div>
      </div>

      {/* Features */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.8px', marginBottom: 8, color: 'var(--ios-label)' }}>Built for Arbitrage</h2>
        <p style={{ fontSize: 16, color: 'var(--ios-label3)', marginBottom: 36 }}>Everything you need to detect and trade price discrepancies.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <div style={{
                padding: 28, borderRadius: 20, background: 'var(--ios-bg2)',
                boxShadow: 'var(--ios-shadow)',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: f.gradient,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 16,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.3px', marginBottom: 6, color: 'var(--ios-label)' }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--ios-label3)', lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
          padding: 32, borderRadius: 20, background: 'var(--ios-bg2)',
          boxShadow: 'var(--ios-shadow)',
        }}>
          {[
            { label: 'Opportunities Detected', value: '847', icon: '🎯' },
            { label: 'Active Arbitrageurs', value: '1,247', icon: '👥' },
            { label: 'Total P&L (All Users)', value: '$2.4M', icon: '💰' },
            { label: 'Avg Spread Captured', value: '3.2%', icon: '📊' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-1px', color: 'var(--ios-label)' }}>{s.value}</div>
              <div style={{ fontSize: 13, color: 'var(--ios-label3)', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
