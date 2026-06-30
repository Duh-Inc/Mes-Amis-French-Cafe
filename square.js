/* =============================================
   Mes Amis Café — Square Web Payments SDK
   Used only on checkout.html.
   ============================================= */

'use strict';

const SQUARE_CONFIG = {
  appId:      'sandbox-sq0idb-RHii7WJhWOutcMVw54znPA',
  locationId: 'LQXV6WHR8T4R0',
  get backendUrl() {
    const isLocal = window.location.hostname === '127.0.0.1' ||
                    window.location.hostname === 'localhost';
    return isLocal
      ? 'http://localhost:3000/api/checkout'  // vercel dev
      : '/api/checkout';                       // production
  },
};

let squareCard   = null;
let squareClient = null;

function buildCardStyle() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    '.input-container': {
      borderColor:  isDark ? 'rgba(201,162,39,0.35)' : 'rgba(154,122,24,0.28)',
      borderRadius: '4px',
    },
    '.input-container.is-focus': { borderColor: isDark ? '#c9a227' : '#9a7a18' },
    '.input-container.is-error': { borderColor: '#f08080' },
    input: { color: isDark ? '#f0eada' : '#1e3468', fontSize: '14px' },
    'input::placeholder': { color: isDark ? 'rgba(240,234,218,0.4)' : 'rgba(30,52,104,0.4)' },
    '.message-text': { color: isDark ? '#c8d4e8' : '#4a6080' },
    '.message-icon': { color: isDark ? '#c9a227' : '#9a7a18' },
  };
}

async function initSquare() {
  if (!window.Square) {
    showSquareError('Square SDK failed to load. Please refresh the page.');
    return;
  }
  try {
    squareClient = window.Square.payments(SQUARE_CONFIG.appId, SQUARE_CONFIG.locationId);
    squareCard   = await squareClient.card({ style: buildCardStyle() });
    await squareCard.attach('#square-card-field');
    const payBtn = document.getElementById('pay-btn');
    if (payBtn) { payBtn.disabled = false; payBtn.setAttribute('aria-disabled', 'false'); }
  } catch (err) {
    console.error('[Square] Init error:', err);
    showSquareError('Could not load the payment form. Please refresh.');
  }
}

async function runCheckout(contactInfo) {
  if (!squareCard) { showSquareError('Payment form not ready. Please refresh.'); return null; }

  const result = await squareCard.tokenize();
  if (result.status !== 'OK') {
    showSquareError(result.errors?.map(e => e.message).join(' ') || 'Card error.');
    return null;
  }
  console.log('[Square] Card tokenized OK');

  const cart = window.MesAmis.Cart.getAll();
  const res  = await fetch(SQUARE_CONFIG.backendUrl, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceId: result.token, cart, contact: contactInfo }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Payment failed. Please try again.');
  }

  const { orderId } = await res.json();
  console.log('[Square] Order complete:', orderId);
  return orderId;
}

function showSquareError(msg) {
  const el = document.getElementById('square-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}
function clearSquareError() {
  const el = document.getElementById('square-error');
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

window.MesAmis = window.MesAmis || {};
window.MesAmis.Square = { init: initSquare, runCheckout, clearError: clearSquareError };
