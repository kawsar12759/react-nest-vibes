const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact', maximumFractionDigits: 1 });

export const UNIT_SUFFIX = { total: '', month: '/mo', night: '/night' };

export function formatPrice(price, unit = 'total', { short = false } = {}) {
  const value = short && price >= 100000 ? compact.format(price) : currency.format(price);
  return value + (UNIT_SUFFIX[unit] ?? '');
}

export const formatArea = (sqft) => `${Number(sqft).toLocaleString('en-US')} sq ft`;

export const formatDate = (value, opts = { month: 'short', day: 'numeric', year: 'numeric' }) =>
  value ? new Date(value).toLocaleDateString('en-US', opts) : '';

export function averageRating(reviews = []) {
  if (!reviews.length) return null;
  return Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;
}

export const readingMinutes = (text = '') => Math.max(1, Math.round(text.split(/\s+/).length / 200));

export const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('') || '?';

/** Friendly messages for the Firebase auth errors people actually hit. */
export function authErrorMessage(error) {
  const code = error?.code || '';
  const map = {
    'auth/invalid-credential': 'That email and password combination doesn’t match an account.',
    'auth/wrong-password': 'That email and password combination doesn’t match an account.',
    'auth/user-not-found': 'No account uses that email yet.',
    'auth/email-already-in-use': 'An account already uses that email. Sign in instead.',
    'auth/weak-password': 'Choose a stronger password (at least 8 characters).',
    'auth/too-many-requests': 'Too many attempts. Wait a minute, then try again.',
    'auth/popup-closed-by-user': 'The Google window was closed before signing in.',
    'auth/network-request-failed': 'Network error. Check your connection and try again.',
  };
  return map[code] || error?.message?.replace('Firebase: ', '') || 'Something went wrong. Try again.';
}
