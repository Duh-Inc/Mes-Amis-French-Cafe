/* =============================================
   Mes Amis Café — Home Page JS
   ============================================= */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ── Scroll reveal for sig-cards ── */
  if ('IntersectionObserver' in window) {
    const cards = document.querySelectorAll('.sig-card');
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
      observer.observe(card);
    });
  }
});
