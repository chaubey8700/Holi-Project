/* ============================================
   js/particles.js
   Color powder particle explosions + cursor
   ============================================ */

// ── CUSTOM CURSOR ──────────────────────────────
const cdot  = document.getElementById('cdot');
const cring = document.getElementById('cring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px';
  cdot.style.top  = my + 'px';
});

// ring follows with lag (smooth)
(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cring.style.left = rx + 'px';
  cring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

// ── PARTICLE CANVAS ────────────────────────────
const cvs = document.getElementById('particleCanvas');
const ctx = cvs.getContext('2d');

function resizeCvs() {
  cvs.width  = window.innerWidth;
  cvs.height = window.innerHeight;
}
resizeCvs();
window.addEventListener('resize', resizeCvs);

// Holi colors palette
const COLORS = [
  '#e91e8c','#ff6b00','#ffd700','#00c9c9',
  '#9c27b0','#43e97b','#ff4081','#ff1744',
  '#00e5ff','#ffeb3b'
];

let parts = [];

// Create explosion at (x, y)
function boom(x, y, count = 55) {
  // tiny powder dots
  for (let i = 0; i < count; i++) {
    const angle = Math.PI * 2 * i / count + (Math.random() - .5) * 0.6;
    const speed = 2 + Math.random() * 8;
    parts.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 4,
      r:  3 + Math.random() * 6,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)],
      a:  1,
      g:  0.1 + Math.random() * 0.08,
      blob: false
    });
  }
  // big color blobs
  for (let i = 0; i < 6; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 3;
    parts.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      r:  20 + Math.random() * 30,
      c:  COLORS[Math.floor(Math.random() * COLORS.length)],
      a:  0.55,
      g:  0.04,
      blob: true
    });
  }
}

// Draw loop
function drawParticles() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  parts = parts.filter(p => p.a > 0.01);

  parts.forEach(p => {
    ctx.save();
    ctx.globalAlpha = p.a;
    ctx.beginPath();
    if (p.blob) {
      const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      grd.addColorStop(0, p.c);
      grd.addColorStop(1, 'transparent');
      ctx.fillStyle = grd;
    } else {
      ctx.fillStyle = p.c;
    }
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // physics
    p.x  += p.vx;
    p.y  += p.vy;
    p.vy += p.g;
    p.vx *= 0.98;
    p.a  -= p.blob ? 0.012 : 0.02;
    p.r  *= 0.995;
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

// click to explode
document.addEventListener('click', e => {
  // ignore music buttons and login button
  if (e.target.closest('.music-btn') ||
      e.target.closest('#pwdIn')     ||
      e.target.closest('.login-btn')) return;
  boom(e.clientX, e.clientY);
});

// touch support (mobile)
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  boom(t.clientX, t.clientY, 35);
}, { passive: true });

// ambient auto-bursts in background
function autoBoom() {
  boom(
    Math.random() * window.innerWidth,
    Math.random() * window.innerHeight * 0.8,
    28
  );
  setTimeout(autoBoom, 3000 + Math.random() * 3000);
}
setTimeout(autoBoom, 3000);
setTimeout(autoBoom, 5500);
