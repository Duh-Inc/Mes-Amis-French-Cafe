/* =============================================
   Mes Amis Café — Cart Page JS
   Renders cart items, handles qty/remove, summary.
   Checkout delegates to checkout.html via localStorage.
   ============================================= */

'use strict';

function renderCart() {
  const { Cart } = window.MesAmis;
  const items       = Cart.getAll();
  const listEl      = document.getElementById('cart-items');
  const emptyEl     = document.getElementById('cart-empty');
  const summaryEl   = document.getElementById('summary-lines');
  const totalEl     = document.getElementById('total-value');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearBtn    = document.getElementById('clear-cart');

  if (!listEl) return;

  const isEmpty = items.length === 0;

  emptyEl.classList.toggle('visible', isEmpty);
  listEl.innerHTML = '';
  if (clearBtn) clearBtn.style.display = isEmpty ? 'none' : '';

  // Disable checkout link when empty
  if (checkoutBtn) {
    if (isEmpty) {
      checkoutBtn.setAttribute('aria-disabled', 'true');
      checkoutBtn.style.opacity = '0.5';
      checkoutBtn.style.pointerEvents = 'none';
    } else {
      checkoutBtn.setAttribute('aria-disabled', 'false');
      checkoutBtn.style.opacity = '';
      checkoutBtn.style.pointerEvents = '';
    }
  }

  if (isEmpty) {
    if (summaryEl) summaryEl.innerHTML = '';
    if (totalEl)   totalEl.textContent = '$0.00';
    initSpecialRequest(true);
    return;
  }

  // Render items
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.setAttribute('data-id', item.id);
    li.innerHTML = `
      <div class="cart-item__info">
        <p class="cart-item__name">${escHtml(item.name)}</p>
        <p class="cart-item__unit-price">$${item.price.toFixed(2)} each</p>
      </div>
      <div class="cart-item__qty" role="group" aria-label="Quantity for ${escHtml(item.name)}">
        <button class="qty-btn qty-dec" aria-label="Decrease quantity of ${escHtml(item.name)}">−</button>
        <span class="qty-display" aria-live="polite" aria-atomic="true">${item.qty}</span>
        <button class="qty-btn qty-inc" aria-label="Increase quantity of ${escHtml(item.name)}">+</button>
      </div>
      <span class="cart-item__subtotal" aria-label="Subtotal $${(item.price * item.qty).toFixed(2)}">
        $${(item.price * item.qty).toFixed(2)}
      </span>
      <button class="cart-item__remove" aria-label="Remove ${escHtml(item.name)} from cart" title="Remove">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `;

    li.querySelector('.qty-dec').addEventListener('click', () => {
      Cart.updateQty(item.id, item.qty - 1);
      renderCart();
    });
    li.querySelector('.qty-inc').addEventListener('click', () => {
      Cart.updateQty(item.id, item.qty + 1);
      renderCart();
    });
    li.querySelector('.cart-item__remove').addEventListener('click', () => {
      Cart.remove(item.id);
      window.MesAmis.showToast(`"${item.name}" removed from cart`);
      renderCart();
    });

    listEl.appendChild(li);
  });

  // Summary lines
  if (summaryEl) {
    summaryEl.innerHTML = items.map(item => `
      <div class="summary-line">
        <dt>${escHtml(item.name)} × ${item.qty}</dt>
        <dd>$${(item.price * item.qty).toFixed(2)}</dd>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = `$${Cart.total().toFixed(2)}`;
  initSpecialRequest(false);
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const SPECIAL_REQUEST_KEY = 'mesAmis_specialRequest';

function initSpecialRequest(isEmpty) {
  const wrap   = document.getElementById('cart-special-request');
  const input  = document.getElementById('special-request');
  const chars  = document.getElementById('special-request-chars');
  if (!wrap || !input) return;

  wrap.classList.toggle('visible', !isEmpty);

  if (input.dataset.initialized) return;
  input.dataset.initialized = '1';

  input.value = localStorage.getItem(SPECIAL_REQUEST_KEY) || '';
  updateChars();

  input.addEventListener('input', () => {
    localStorage.setItem(SPECIAL_REQUEST_KEY, input.value);
    updateChars();
  });

  function updateChars() {
    if (chars) chars.textContent = `${input.value.length} / 400`;
  }
}


document.addEventListener('DOMContentLoaded', () => {
  renderCart();

  const clearBtn = document.getElementById('clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      window.MesAmis.Cart.clear();
      window.MesAmis.showToast('Cart cleared.');
      renderCart();
    });
  }
});
