/* ============================================
   js/countdown.js
   Holi countdown timer
   ============================================ */

// ── SET HOLI DATE HERE ──
const HOLI_DATE = new Date('2025-03-14T00:00:00');

function updateCountdown() {
  const now  = new Date();
  const diff = HOLI_DATE - now;

  if (diff <= 0) {
    document.getElementById('cdmsg').textContent = '🎉 Aaj Holi Hai! Rang khelo! 🎉';
    ['cd-d','cd-h','cd-m','cd-s'].forEach(id => {
      document.getElementById(id).textContent = '00';
    });
    return;
  }

  const days    = Math.floor(diff / 864e5);
  const hours   = Math.floor((diff % 864e5) / 36e5);
  const minutes = Math.floor((diff % 36e5)  / 6e4);
  const seconds = Math.floor((diff % 6e4)   / 1e3);

  document.getElementById('cd-d').textContent = String(days).padStart(2,'0');
  document.getElementById('cd-h').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(minutes).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(seconds).padStart(2,'0');

  document.getElementById('cdmsg').textContent =
    'Holi aa rahi hai — teri muskaan ka intezaar hai 🌺';
}

updateCountdown();
setInterval(updateCountdown, 1000);
