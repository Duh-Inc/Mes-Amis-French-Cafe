/* =============================================
   Mes Amis Café — Gallery Page JS
   Filter buttons + lightbox
   ============================================= */

'use strict';

/* ── Filter ── */
function initFilter() {
  const filters = document.querySelectorAll('.gallery-filter');
  const items   = document.querySelectorAll('.gallery-item');

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const cat = btn.dataset.filter;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ── Lightbox ── */
function initLightbox() {
  const lightbox   = document.getElementById('lightbox');
  const closeBtn   = document.getElementById('lightbox-close');
  const imgWrap    = document.getElementById('lightbox-img-wrap');
  const captionEl  = document.getElementById('lightbox-caption');
  const items      = document.querySelectorAll('.gallery-item');
  let lastFocused  = null;

  function openLightbox(item) {
    const imgEl      = item.querySelector('img');
    const placeholder = item.querySelector('.gallery-placeholder');
    const caption    = item.querySelector('.gallery-item__caption');

    imgWrap.innerHTML = '';
    if (imgEl) {
      const clone = imgEl.cloneNode(true);
      clone.style.maxHeight = '70vh';
      clone.style.width = '100%';
      clone.style.objectFit = 'contain';
      imgWrap.appendChild(clone);
    } else if (placeholder) {
      const clone = placeholder.cloneNode(true);
      clone.style.height = '400px';
      clone.style.borderRadius = '4px';
      imgWrap.appendChild(clone);
    }
    captionEl.textContent = caption ? caption.textContent.trim() : '';
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    closeBtn.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  items.forEach(item => {
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View image: ${item.querySelector('.gallery-item__caption')?.textContent.trim() || 'gallery photo'}`);

    item.addEventListener('click', () => openLightbox(item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item); }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFilter();
  initLightbox();
});
