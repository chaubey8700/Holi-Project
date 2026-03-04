/* ============================================
   js/music.js
   Music player — songs, play/pause, progress
   ============================================

   HOW TO ADD REAL SONGS:
   1. Download MP3 files (Balam Pichkari etc.)
   2. Put them inside  songs/  folder
   3. Replace the url values below like:
         url: 'songs/balam-pichkari.mp3'
   ============================================ */

const SONGS = [
   {
    name: '🎵 Balam Pichkari',
    url:  'songs/Balam Pichkari Yeh Jawaani Hai Deewani 128 Kbps.mp3'
    // fallback demo: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
  },
  {
    name: '🎵 Badri Ki Dulhaniya',
    url:  'songs/Badri Ki Dulhania (title Track) Badrinath Ki Dulhania 128 Kbps.mp3'
  },
  {
    name: '🎵 Rang Barse',
    url:  'songs/Rang Barse Bheege Chunarwali Silsila 128 Kbps.mp3'
  },
  {
    name: '🎵 Holi Khele Raghuveera',
    url:  'songs/Hori Khele Raghuveera Baghban 128 Kbps.mp3'
  }
];

let currentSong = 0;
let audio       = null;
let isPlaying   = false;
const vbars     = document.querySelectorAll('.vbar');

function loadSong(idx) {
  if (audio) { audio.pause(); audio = null; }

  audio = new Audio(SONGS[idx].url);

  // update progress bar
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      document.getElementById('pfill').style.width =
        (audio.currentTime / audio.duration * 100) + '%';
    }
  });

  // auto-play next song when current ends
  audio.addEventListener('ended', nextS);

  document.getElementById('sname').textContent = SONGS[idx].name;
}

function togPlay() {
  if (!audio) loadSong(currentSong);

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    document.getElementById('pbtn').textContent = '▶';
    vbars.forEach(b => b.classList.add('paused'));
  } else {
    audio.play().catch(() => {
      // autoplay blocked by browser — user must interact first
      console.log('Autoplay blocked, waiting for user interaction');
    });
    isPlaying = true;
    document.getElementById('pbtn').textContent = '⏸';
    vbars.forEach(b => b.classList.remove('paused'));
  }
}

function nextS() {
  currentSong = (currentSong + 1) % SONGS.length;
  loadSong(currentSong);
  if (isPlaying) audio.play().catch(() => {});
}

function prevS() {
  currentSong = (currentSong - 1 + SONGS.length) % SONGS.length;
  loadSong(currentSong);
  if (isPlaying) audio.play().catch(() => {});
}
