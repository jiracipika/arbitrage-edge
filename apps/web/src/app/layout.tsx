import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arbitrage Edge — BTC/Polymarket Trading',
  description: 'Exploit price lag between BTC spot markets and Polymarket crypto prediction markets with AI-powered auto-trading.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', background: 'var(--ios-bg)' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
