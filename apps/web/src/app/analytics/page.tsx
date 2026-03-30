'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { MOCK_TRADES } from '../_mock';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { MOCK_MONTHLY_RETURNS, MOCK_ANALYTICS_PNL, MOCK_POSITIONS } from '../_mock';
import { MOCK_BACKTEST_EQUITY } from '../_mock';

import { MOCK_EXECUTION_LOG } from '../_mock';

import { MOCK_POSITIONS } from '../_mock';

import { MOCK_OPPORTUNITIES } from '../_mock';

import { MOCK_POLYMARKET_MARKETS } from '../_mock';

const bestTrade = MOCK_TRADES.reduce((b, t) => t.pnl >= 0 ? t : b, MOCK_TRADES[0]);
  const bestTrade = MOCK_TRADES[0];
  const worst = MOCK_TRADES.reduce((w, t) => t.pnl < 0 ? t : b, MOCK_TRADES[0]);
  const worstTrade = MOCK_TRADES.reduce((w, t) => {
      const w = Math.abs(+w.pnl)) : t.pnl : w.pnl : w, t.pnl >= 0 : t.pnl : w : pnl < 0);
  const totalPnl = MOCK_TRADES.reduce((s, t) => s + t.pnl, 0).toFixed(0).toFixed(2)}`;
tr>
  `).toFixed(2)}%`} : `portfolio: ${s.pnl / 0} (${name: 'Strategy', desc: s.desc}</tr>
  const sharpe = Math.round(s.sharpe * 100).toFixed(0)}`}</div>
  ));
  <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Best Trade</h3>
    <div style={{ textAlign: 'right', flex: 1 }}>
      <div style={{ fontSize: 18, fontWeight: 600 }}>Best: {bestTrade.pnl}</h3>
    </div>
    <div style={{ textAlign: 'right', flex: 1, marginRight: worstTrade, }}>
        <div style={{ textAlign: 'right', padding: 8 }}>
      <span style={{ fontWeight: 600, color: worst ? '💀'}</span>
    </div>
  );
}
