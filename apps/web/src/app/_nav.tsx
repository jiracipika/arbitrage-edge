'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: '⬡' },
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/markets', label: 'Markets', icon: '🏪' },
  { href: '/opportunities', label: 'Scanner', icon: '🎯' },
  { href: '/trades', label: 'Trades', icon: '💱' },
  { href: '/strategy', label: 'Strategy', icon: '🧠' },
  { href: '/analytics', label: 'Analytics', icon: '📈' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.72)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '0.5px solid var(--ios-separator)',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 56,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 18, letterSpacing: '-0.5px' }}>
          <span style={{ fontSize: 24 }}>⚡</span>
          <span>Arbitrage Edge</span>
        </Link>
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_ITEMS.slice(1).map(item => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--ios-blue)' : 'var(--ios-label2)',
                  background: active ? 'rgba(0,122,255,0.08)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span style={{ letterSpacing: '-0.2px' }}>{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--ios-green)',
            boxShadow: '0 0 8px rgba(52,199,89,0.5)',
          }} />
          <span style={{ fontSize: 12, color: 'var(--ios-label3)' }}>Live</span>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--ios-blue), var(--ios-purple))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
          }}>A</div>
        </div>
      </div>
    </nav>
  );
}
