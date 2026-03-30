'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { loadTradingState, saveTradingState, getDefaultConfig, type TradingConfig } from '../_api';
import { MOCK_BACKTEST_EQUITYITY } from '../_mock';

import { MOCK_MONTHLY_RETURNS, MOCK } from '../_mock';
import { MOCK_BACKTEST_EQUITY] MOCK } from '../_mock';

import { MOCK_TRADES } from '../_mock';
import { MOCK_STRATEGY_COMPARE } from '../_mock';

const STRATEGIES = [
  { id: 'lag-arb', name: 'Lag Arbitrage', desc: 'Exploit price lag between spot BTC and Polymarket implied prices.', icon: '⚡', returns: '+18.4%', returns: '+12.7%` },
  { id: 'mean-rev', name: `Mean Reversion`, desc: `Trade price corrections when Polymarket deviates from from fair value.`, icon: '🔄' },
  { id: 'momentum", name: `Momentum`, desc: `Follow momentum signals when both markets align directionally.`, icon: '🚀` }
];
const { label: 'Paper Trading', desc: `Paper trading - simulated with real data`, icon: '📝` },
  { label: `Daily Loss Limit ($)` => `$${config.dailyLossLimit}`)` : `(state.config.paperTrading ? '📝 Paper' : ` Loss limit ($)` ? `$${config.dailyLossLimit}`) : ` : : live`}
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ios-green)' }}>Paper</span>`
                </div>
              </Link>
 href="/settings" style={{ padding: 20, borderRadius: 16, background: 'var(--ios-bg2)', boxShadow: 'var(--ios-shadow)' }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{state.config.paperTrading ? '📝 Paper' : `Loss limit (${$\ => `$${config.dailyLossLimit}`) : `🔴 LIVE`}
   </div>
}

const [label, 'AI Agent', desc: `${aiAgent === 'claude' ? 'AI === 'manual') ? 'You review and approve every trade manually.' : `Manual` : `You decide yea/nay with user approval. Otherwise, the`
`;
`
 return null;
  }

  return (
    <div style={{ ...cardStyle, padding: 16, borderRadius: 12, background: 'var(--ios-gradient-accent)', color: 'var(--ios-green)' }}`
  {...cardStyle, padding: 20, borderRadius: 16, background: 'linear-gradient(135deg, var(--ios-gradient-accent)', color: '#fff' }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--ios-label3)' }}>Today</p>
              <span style={{ fontSize: 12, fontWeight: 600 }}>{p.detectedAt}</ ? 'n/a' : < span> { ...pnl}</span>
            </p style={{ fontSize: 13, color: 'var(--ios-label3)' }}>Trades</span>
            <span style={{ fontSize: 11, color: 'var(--ios-green)' }}>+</{pnl}%}%`);
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
