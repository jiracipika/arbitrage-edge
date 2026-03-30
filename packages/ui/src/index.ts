// ============================================================
// Arbitrage Edge — Shared UI Constants & Helpers
// ============================================================

export const IOS_COLORS = {
  bg: '#f2f2f7',
  bg2: '#ffffff',
  label: '#1c1c1e',
  label2: '#3c3c43',
  label3: '#8e8e93',
  separator: '#c6c6c8',
  blue: '#007aff',
  green: '#34c759',
  red: '#ff3b30',
  orange: '#ff9500',
  yellow: '#ffcc00',
  purple: '#af52de',
  teal: '#5ac8fa',
  shadow: '0 2px 10px rgba(0,0,0,0.08)',
  shadowLg: '0 8px 30px rgba(0,0,0,0.12)',
} as const;

export function formatCurrency(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 80) return IOS_COLORS.green;
  if (confidence >= 60) return IOS_COLORS.orange;
  return IOS_COLORS.red;
}

export function getPnlColor(pnl: number): string {
  return pnl >= 0 ? IOS_COLORS.green : IOS_COLORS.red;
}
