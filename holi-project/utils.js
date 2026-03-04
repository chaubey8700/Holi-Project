/* ============================================
   js/utils.js
   Scroll-reveal + misc helpers
   ============================================ */

// Scroll reveal — adds .visible when element enters viewport
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
