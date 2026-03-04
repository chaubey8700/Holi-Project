/* Open Book Gallery */

const BOOK_CONFIG = { autoFlipSec: 4, autoPlay: true };

let bookState = { current: 0, total: 0, timer: null, flipping: false };

function buildOrbit() {
  const wrap = document.getElementById("orbitWrapper");
  wrap.innerHTML = "";

  if (!PHOTOS || PHOTOS.length === 0) {
    wrap.innerHTML = "<div class=book-scene><div class=book><div class=book-cover-left></div><div class=book-spine></div><div class=book-cover-right><div class=book-placeholder>js/photos.js mein apni photos daalo!</div></div></div></div>";
    return;
  }

  bookState.total = Math.ceil(PHOTOS.length / 2);
  bookState.current = 0;

  const scene = document.createElement("div");
  scene.className = "book-scene";

  const book = document.createElement("div");
  book.className = "book";
  book.id = "theBook";
  book.innerHTML = "<div class=book-cover-left id=coverLeft></div><div class=book-spine></div><div class=book-cover-right id=coverRight></div>";

  PHOTOS.forEach((photo, idx) => {
    const isLeft = idx % 2 === 0;
    const pageEl = document.createElement("div");
    pageEl.className = "book-page-container " + (isLeft ? "left-flip" : "right-flip");
    pageEl.id = "page-" + idx;
    pageEl.style.display = "none";
    pageEl.innerHTML = "<div class=page-face><img class=page-photo src=" + photo.src + " alt=Memory style=\"object-position:" + (photo.pos||"center top") + "\"><span class=page-num>" + (idx+1) + "</span></div><div class=\"page-face back\"></div>";
    pageEl.querySelector("img").addEventListener("click", () => openLightbox(photo.src));
    book.appendChild(pageEl);
  });

  scene.appendChild(book);
  wrap.appendChild(scene);

  const dots = document.createElement("div");
  dots.className = "book-dots";
  dots.id = "bookDots";
  for (let i = 0; i < bookState.total; i++) {
    const d = document.createElement("div");
    d.className = "book-dot" + (i === 0 ? " active" : "");
    d.addEventListener("click", () => goToSpread(i));
    dots.appendChild(d);
  }
  wrap.appendChild(dots);

  const nav = document.createElement("div");
  nav.className = "book-nav";
  nav.innerHTML = "<button class=book-btn id=btnPrev onclick=prevSpread()>Pehle</button><span class=book-page-info id=pageInfo></span><button class=book-btn id=btnNext onclick=nextSpread()>Aage</button>";
  wrap.appendChild(nav);

  showSpread(0);
  if (BOOK_CONFIG.autoPlay) startAutoFlip();
}

function showSpread(spreadIdx) {
  const total = PHOTOS.length;
  const book = document.getElementById("theBook");
  if (!book) return;
  book.querySelectorAll(".book-page-container").forEach(p => { p.style.display = "none"; p.classList.remove("is-flipped","flipping"); });
  const lIdx = spreadIdx * 2, rIdx = lIdx + 1;
  const lp = document.getElementById("page-" + lIdx);
  const rp = rIdx < total ? document.getElementById("page-" + rIdx) : null;
  if (lp) lp.style.display = "block";
  if (rp) rp.style.display = "block";
  updateUI(spreadIdx);
}

function goToSpread(targetIdx) {
  if (bookState.flipping || targetIdx === bookState.current) return;
  if (targetIdx < 0 || targetIdx >= bookState.total) return;
  resetAutoFlip();
  bookState.flipping = true;
  const oldIdx = bookState.current;
  const oldL = document.getElementById("page-" + (oldIdx*2));
  const oldR = document.getElementById("page-" + (oldIdx*2+1));
  const newL = document.getElementById("page-" + (targetIdx*2));
  const newR = document.getElementById("page-" + (targetIdx*2+1));
  if (newL) { newL.style.display = "block"; newL.classList.add("is-flipped","flipping"); }
  if (newR) { newR.style.display = "block"; newR.classList.add("is-flipped","flipping"); }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (oldL) oldL.classList.add("is-flipped");
    if (oldR) oldR.classList.add("is-flipped");
    if (newL) newL.classList.remove("is-flipped");
    if (newR) newR.classList.remove("is-flipped");
    bookState.current = targetIdx;
    updateUI(targetIdx);
    setTimeout(() => {
      if (oldL) { oldL.style.display = "none"; oldL.classList.remove("is-flipped","flipping"); }
      if (oldR) { oldR.style.display = "none"; oldR.classList.remove("is-flipped","flipping"); }
      if (newL) newL.classList.remove("flipping");
      if (newR) newR.classList.remove("flipping");
      bookState.flipping = false;
    }, 1300);
  }));
}

function nextSpread() { goToSpread((bookState.current+1) % bookState.total); }
function prevSpread() { goToSpread((bookState.current-1+bookState.total) % bookState.total); }

function updateUI(idx) {
  const info = document.getElementById("pageInfo");
  if (info) info.textContent = (idx+1) + " / " + bookState.total;
  document.querySelectorAll(".book-dot").forEach((d,i) => d.classList.toggle("active", i===idx));
}

function startAutoFlip() { clearInterval(bookState.timer); bookState.timer = setInterval(nextSpread, BOOK_CONFIG.autoFlipSec*1000); }
function resetAutoFlip() { if (BOOK_CONFIG.autoPlay) { clearInterval(bookState.timer); bookState.timer = setInterval(nextSpread, BOOK_CONFIG.autoFlipSec*1000); } }

function openLightbox(src) { document.getElementById("lbimg").src=src; document.getElementById("lbox").classList.add("active"); document.body.style.overflow="hidden"; }
document.getElementById("lbcl").addEventListener("click", closeLightbox);
document.getElementById("lbox").addEventListener("click", e => { if(e.target===document.getElementById("lbox")) closeLightbox(); });
function closeLightbox() { document.getElementById("lbox").classList.remove("active"); document.body.style.overflow=""; }

window.addEventListener("load", buildOrbit);
