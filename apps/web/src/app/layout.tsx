import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arbitrage Edge — BTC/Polymarket Trading',
  description: 'Exploit price lag between BTC spot markets and Polymarket crypto prediction markets with AI-powered auto-trading.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try { var t = localStorage.getItem('ae-theme'); if (t === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); } catch(e) {}
          })();
        ` }} />
        <div style={{ minHeight: '100vh', background: 'var(--ios-bg)', color: 'var(--ios-label)', transition: 'background 0.3s, color 0.3s' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
