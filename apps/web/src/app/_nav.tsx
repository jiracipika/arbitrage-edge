'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/markets', label: 'Markets', icon: '🏪' },
  { href: '/opportunities', label: 'Scanner', icon: '🎯' },
  { href: '/trades', label: 'Trades', icon: '💱' },
  { href: '/strategy', label: 'Strategy', icon: '🧠' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
];

export default function Nav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ae-theme') as 'light' | 'dark' | null;
    const t = saved || 'light';
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('ae-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--ios-nav-bg)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '0.5px solid var(--ios-separator)',
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56,
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px' }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <span className="hide-sm">Arbitrage Edge</span>
          </Link>

          {/* Desktop nav */}
          <div className="hide-mobile" style={{ display: 'flex', gap: 4 }}>
            {NAV_ITEMS.map(item => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 10,
                  fontSize: 13, fontWeight: active ? 600 : 500,
                  color: active ? 'var(--ios-blue)' : 'var(--ios-label2)',
                  background: active ? 'rgba(0,122,255,0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}>
                  <span style={{ fontSize: 14 }}>{item.icon}</span>
                  <span style={{ letterSpacing: '-0.2px' }}>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ios-green)', boxShadow: '0 0 8px rgba(52,199,89,0.5)' }} />
              <span className="hide-sm" style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Live</span>
            </div>
            <button onClick={toggleTheme} style={{
              background: 'var(--ios-surface-1)', border: 'none', borderRadius: 8,
              padding: '4px 8px', fontSize: 16, cursor: 'pointer',
            }}>{theme === 'light' ? '🌙' : '☀️'}</button>
            <Link href="/settings" style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--ios-gradient-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 14, fontWeight: 600,
            }}>A</Link>
            {/* Mobile hamburger */}
            <button className="hide-mobile" onClick={() => setMobileOpen(!mobileOpen)} style={{
              display: 'none', background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--ios-label)',
            }}>☰</button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div style={{
        display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: 'var(--ios-nav-bg)', backdropFilter: 'blur(20px)',
        borderTop: '0.5px solid var(--ios-separator)',
        padding: '8px 16px', paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
      }} className="mobile-bottom-nav">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {NAV_ITEMS.slice(0, 5).map(item => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                padding: '4px 8px', fontSize: 10, fontWeight: active ? 600 : 400,
                color: active ? 'var(--ios-blue)' : 'var(--ios-label3)',
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: flex !important; }
          nav > div > div:nth-child(2) { display: none !important; }
          .mobile-bottom-nav { display: block !important; }
        }
      `}</style>
    </>
  );
}
