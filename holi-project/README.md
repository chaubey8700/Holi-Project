# 🎨 Holi Website — Project Guide
### Teri Wife Ke Liye Special Holi Surprise 💕

---

## 📁 FOLDER STRUCTURE

```
holi-project/
│
├── 📄 index.html          ← MAIN FILE — browser mein yahi open hoga
│
├── 🎨 css/
│   ├── base.css           ← Reset, variables, cursor, lightbox, footer
│   ├── login.css          ← Login page ka sara style
│   ├── music.css          ← Music player ka style
│   ├── hero.css           ← Hero section (Happy Holi heading)
│   ├── gallery.css        ← Orbiting photo gallery
│   └── sections.css       ← Wife lines, message, rangoli, countdown
│
├── ⚡ js/
│   ├── photos.js          ← ★ PHOTOS YAHAN HAIN — wife ki photos
│   ├── particles.js       ← Color powder explosions + cursor
│   ├── login.js           ← Login logic + funny messages
│   ├── music.js           ← Music player (play/pause/next/prev)
│   ├── gallery.js         ← Orbit animation builder
│   ├── countdown.js       ← Holi countdown timer
│   └── utils.js           ← Scroll reveal
│
├── 🎵 songs/              ← MP3 files yahan rakho
│   ├── balam-pichkari.mp3
│   ├── badri-ki-dulhaniya.mp3
│   ├── rang-barse.mp3
│   └── holi-khele.mp3
│
└── 🖼️ images/             ← Agar alag photo files use karo to yahan rakho
```

---

## 🔧 KAHAN KYA PASTE KARNA HAI

### ✅ 1. index.html
Yeh MAIN file hai. Isko seedha browser mein open karo.
Isme koi code paste nahi karna — sirf open karo!

---

### ✅ 2. css/base.css
**Kya hai:** Global CSS — colors, fonts, cursor, lightbox
**Kab change karo:** Agar overall colors ya fonts badlne hon
```
--mg: #e91e8c;   ← pink/magenta color
--sf: #ff6b00;   ← orange color
--gd: #ffd700;   ← golden color
```

---

### ✅ 3. css/login.css
**Kya hai:** Login page ka design
**Kab change karo:** Login card ka look badalna ho
- Hint text change karna ho → `.login-hint` ke andar
- Button color → `.login-btn` background

---

### ✅ 4. css/music.css
**Kya hai:** Music player (bottom-right corner)
**Kab change karo:** Player ki position ya size badlni ho
- Position change: `bottom: 14px; right: 14px;`

---

### ✅ 5. css/hero.css
**Kya hai:** "Happy Holi" wala pehla screen
**Kab change karo:** Heading ya quote text badlna ho
- Quote text: `index.html` mein `.hero-quote` ke andar

---

### ✅ 6. css/gallery.css
**Kya hai:** Ghoomti hui photo gallery ka style
**Kab change karo:** Photo circle size ya ring color
- Ring colors: `.op-wrap::before` ka `conic-gradient`

---

### ✅ 7. css/sections.css
**Kya hai:** Wife lines cards, message, rangoli, countdown
**Kab change karo:** Pyaare message ya wife lines badlne hon
- Wife lines text: `index.html` mein `.line-card` ke andar
- Message text: `index.html` mein `.msg-text` ke andar

---

### ✅ 8. js/photos.js  ← SABSE IMPORTANT ★
**Kya hai:** Wife ki photos ka data
**Kab change karo:** Nai photos add karni hon

```javascript
// Aise add karo nai photo:
,{
  src: 'images/photo3.jpg',   // ya base64 string
  pos: 'center top'           // face upar hai to 'top', beech mein hai to 'center'
}
```

---

### ✅ 9. js/particles.js
**Kya hai:** Rang wale particles + custom cursor
**Kab change karo:** Colors ya explosion size badlni ho
```javascript
const COLORS = ['#e91e8c', '#ff6b00', ...];  // rang yahan badlo
```

---

### ✅ 10. js/login.js
**Kya hai:** Login button ka kaam
**Kab change karo:** Funny messages ya password logic
```javascript
const funnyMsgs = [
  '😂 Arre galat hai!...',   // messages yahan badlo
];
```

---

### ✅ 11. js/music.js  ← SONGS YAHAN ★
**Kya hai:** Music player logic
**Songs add karne ke liye:**
1. MP3 file download karo
2. `songs/` folder mein rakho
3. `url:` wali line mein naam likho:
```javascript
{ name: '🎵 Balam Pichkari', url: 'songs/balam-pichkari.mp3' },
```

---

### ✅ 12. js/gallery.js
**Kya hai:** Photos ko orbit mein ghoomata hai
**Kab change karo:** Orbit speed ya size
```javascript
const ORBIT_CONFIG = [
  { rPct: 28, size: 120, dur: 12, dir:  1 },
  // rPct = kitna door center se (%)
  // size = photo circle ka size (px)
  // dur  = ek chakkar mein kitne seconds
  // dir  = 1 clockwise, -1 anticlockwise
];
```

---

### ✅ 13. js/countdown.js
**Kya hai:** Holi tak ka countdown
**Kab change karo:** Date badlni ho
```javascript
const HOLI_DATE = new Date('2025-03-14T00:00:00');
// Sirf date badlo yahan ↑
```

---

## 🚀 CHALANE KE TARIKE

### Option 1 — Direct (Easiest!)
```
index.html → double click → browser mein khulega ✅
```

### Option 2 — Python Server
```bash
cd holi-project
python3 -m http.server 8080
# Browser: http://localhost:8080
```

### Option 3 — Mobile pe bhejo
```
Puri holi-project/ folder zip karo
→ WhatsApp pe bhejo
→ Extract karo
→ index.html open karo
```

### Option 4 — Free Hosting (Netlify)
```
1. netlify.com/drop pe jao
2. Pura folder drag & drop karo
3. 30 second mein live link milega!
   Jaise: https://holi-jaan.netlify.app
```

---

## 💕 Made with Love
*Teri wife ke chehere ki muskaan dekhna hi sabse bada reward hai! 🌺*
