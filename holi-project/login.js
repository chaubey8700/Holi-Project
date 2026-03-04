/* ============================================
   js/login.js
   Login page logic + funny messages
   ============================================ */

// Funny wrong-password messages
const funnyMsgs = [
  '😂 Arre galat hai! Kuch bhi likho chalega...',
  '🤦 Nahi yaar! Ek baar aur try karo!',
  '😅 Hint: Koi bhi password chalega 😂',
  '🎨 Seriously? Kuch bhi type karo!',
  '😜 Bhai tu toh bilkul pakka nahi hai!'
];
let attempts = 0;

function doLogin() {
  const val = document.getElementById('pwdIn').value.trim();
  const errEl = document.getElementById('lerr');

  if (val.length > 0) {
    // ── SUCCESS ──
    // fire colour explosions
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        boom(Math.random() * window.innerWidth,
             Math.random() * window.innerHeight * 0.8, 40);
      }, i * 150);
    }

    // animate page out
    document.getElementById('loginPage').classList.add('hide');
    document.getElementById('musicPlayer').style.display = 'block';

    setTimeout(() => {
      document.getElementById('loginPage').style.display = 'none';
      togPlay();   // auto-start music
    }, 900);

  } else {
    // ── WRONG (empty) ──
    attempts++;
    errEl.textContent = funnyMsgs[Math.min(attempts - 1, funnyMsgs.length - 1)];
    errEl.style.animation = 'none';
    setTimeout(() => { errEl.style.animation = 'shake .4s ease'; }, 10);
  }
}

// Enter key support
document.getElementById('pwdIn').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
