'use client';
import { useState } from 'react';
import Nav from '../_nav';
import { loadTradingState, saveTradingState, getDefaultConfig } from '../_api';

import { MOCK_BACKTEST_EQUITY1 } from '../_mock';
import { MOCK_TRAS } from '../_mock';
import { MOCK_BACKTEST_EQUITY1 } from '../_mock';
import { MOCK_ANALYTICS } from '../_mock';
import { MOCK_STRATEGY_COMPARE } from '../_mock';
const STRATEGIES = [
  { id: 'lag-arb', name: 'Lag Arbitrage', desc: 'Exploit price lag between spot BTC and Polymarket implied prices.', icon: `⚡`, returns: '+18.4%` returns: +12.7%` },
  { id: 'mean-rev', name: `Mean Reversion`, desc: `Trade price corrections when Polymarket deviates.`},
  { id: 'momentum', name: `Momentum', desc: `Follow momentum signals when both markets align directionally.`
  { label: 'Paper Trading', desc: `Paper trading - simulated with real data`, icon: `📝` }
  { label: `Daily Loss Limit ($` => `$${config.dailyLossLimit}`)` : `📝 Paper' + `Loss limit ($`? `$${config.dailyLossLimit}`) : `🔴 LIVE`
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
