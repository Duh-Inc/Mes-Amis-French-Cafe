/* ── Shared nav + footer injection ── */
(function () {
  const NAV_HTML = `  <nav class="nav" aria-label="Main navigation">
    <div class="nav__inner">
      <a href="index.html" class="nav__logo" aria-label="Mes Amis Café — Home">
        <img src="images/mesamis.png" alt="Mes Amis Café" class="nav__logo-img" />
      </a>
      <ul class="nav__links" role="list">
        <li><a href="index.html" class="nav__link">Home</a></li>
        <li><a href="menu.html" class="nav__link">Menu</a></li>
        <li><a href="gallery.html" class="nav__link">Gallery</a></li>
        <li><a href="about.html" class="nav__link">About</a></li>
        <li>
          <a href="cart.html" class="nav__cart-btn" aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg> Cart
            <span class="nav__cart-count" aria-label="items in cart" style="display:none">0</span>
          </a>
        </li>
      </ul>
      <button class="nav__theme-toggle" aria-label="Switch to light mode" title="Toggle theme">
        <svg class="icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
        </svg>
        <svg class="icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      </button>
      <button class="nav__hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
  <div id="mobile-menu" class="nav__mobile-menu" role="dialog" aria-label="Navigation menu">
    <a href="index.html" class="nav__mobile-link">Home</a>
    <a href="menu.html" class="nav__mobile-link">Menu</a>
    <a href="gallery.html" class="nav__mobile-link">Gallery</a>
    <a href="about.html" class="nav__mobile-link">About</a>
    <a href="cart.html" class="nav__mobile-link">Cart</a>
  </div>`;
  const FOOTER_HTML = `  <footer>
    <div class="footer__grid">
      <div>
        <div class="footer__logo-wrap">
          <img src="images/mesamis.png" alt="Mes Amis Café" class="footer__logo-img" />
        </div>
        <p class="footer__tagline">Café &amp; Crêperie · Est. 2026</p>
        <p class="footer__desc">Welcome to our little piece of France!</p>
      </div>
      <div>
        <p class="footer__heading">Navigate</p>
        <ul class="footer__link-list">
          <li><a href="index.html" class="footer__link">Home</a></li>
          <li><a href="menu.html" class="footer__link">Menu</a></li>
          <li><a href="about.html" class="footer__link">About</a></li>
          <li><a href="cart.html" class="footer__link">Cart</a></li>
        </ul>
      </div>
      <div>
        <p class="footer__heading">Visit</p>
        <address style="font-style:normal; font-size:0.9rem; color:var(--text-muted); line-height:1.8">
          469 Ashford Ave<br /> Ardsley, NY 10502<br />
          <a href="tel:+19142315298" class="footer__link">(914) 231-5298</a><br />
          <a href="mailto:mesamisfrenchcafe@gmail.com" class="footer__link">mesamisfrenchcafe@gmail.com</a>
        </address>
      </div>
      <div>
        <p class="footer__heading">Order Online</p>
        <ul class="footer__link-list">
          <li><a href="https://www.ubereats.com/store/mes-amis-french-cafe/1uUW-VKiWXecocAuegHHyQ" target="_blank" rel="noopener" class="footer__link">Uber Eats</a></li>
          <li><a href="https://www.doordash.com/en/store/mes-amis-french-cafe-inc-ardsley-42332227/105163347/" target="_blank" rel="noopener" class="footer__link">DoorDash</a></li>
          <li><a href="https://www.grubhub.com/restaurant/mes-amis-french-cafe-469-ashford-avenue-ardsley/14696032" target="_blank" rel="noopener" class="footer__link">Grubhub</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© 2026 Mes Amis Café. All rights reserved.</span>
      <span>Ardsley, NY</span>
    </div>
  </footer>`;

  function inject() {
    // Nav
    const navEl = document.querySelector('nav.nav');
    if (navEl) navEl.outerHTML = NAV_HTML;

    // Footer
    const footerEl = document.querySelector('footer');
    if (footerEl) footerEl.outerHTML = FOOTER_HTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();

/* =============================================
   Mes Amis Café — Shared JavaScript
   Nav, Cart state, Toast, Theme toggle
   ============================================= */

'use strict';

/* ── Cart state (persisted to localStorage) ── */
const Cart = (() => {
  const KEY = 'mesAmisCart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  function getAll() { return load(); }

  function count() {
    return load().reduce((s, i) => s + i.qty, 0);
  }

  function add(item) {
    const items = load();
    const ex = items.find(i => i.id === item.id);
    if (ex) {
      ex.qty += 1;
    } else {
      items.push({ id: item.id, name: item.name, price: parseFloat(item.price), qty: 1 });
    }
    save(items);
    updateCartBadge();
  }

  function remove(id) {
    save(load().filter(i => i.id !== id));
    updateCartBadge();
  }

  function updateQty(id, qty) {
    let items = load();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return;
    const newQty = Math.max(0, qty);
    if (newQty === 0) {
      items = items.filter(i => i.id !== id);
    } else {
      items[idx] = { ...items[idx], qty: newQty };
    }
    save(items);
    updateCartBadge();
  }

  function total() {
    return load().reduce((s, i) => s + (parseFloat(i.price) * i.qty), 0);
  }

  function clear() {
    save([]);
    updateCartBadge();
  }

  return { getAll, count, add, remove, updateQty, total, clear };
})();

/* ── Cart badge ── */
function updateCartBadge() {
  const badge = document.querySelector('.nav__cart-count');
  if (!badge) return;
  const n = Cart.count();
  badge.textContent = n;
  badge.style.display = n > 0 ? 'flex' : 'none';
  badge.classList.add('bump');
  setTimeout(() => badge.classList.remove('bump'), 300);
}

/* ── Toast ── */
function showToast(message, duration = 2800) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), duration);
}

/* ── Theme toggle ── */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mesAmisTheme', next);
  const btn = document.querySelector('.nav__theme-toggle');
  if (btn) {
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

function initThemeToggle() {
  const btn = document.querySelector('.nav__theme-toggle');
  if (!btn) return;
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  btn.setAttribute('aria-label', current === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  btn.addEventListener('click', toggleTheme);
}

/* ── Nav ── */
function initNav() {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Open menu');
      hamburger.focus();
    }
  });

  document.addEventListener('click', e => {
    const toggle = document.querySelector('.nav__theme-toggle');
    if (
      !hamburger.contains(e.target) &&
      !mobileMenu.contains(e.target) &&
      (!toggle || !toggle.contains(e.target))
    ) {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });

  // Mark active link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    if (link.getAttribute('href') === current) link.classList.add('active');
  });
}

/* ── Expose globally before DOMContentLoaded so cart.js can use it ── */
window.MesAmis = { Cart, showToast, updateCartBadge };

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initThemeToggle();
  updateCartBadge();
});
