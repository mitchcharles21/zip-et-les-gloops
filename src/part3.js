
/* ---------------------------------------------------------------- canvas engine */
const cv = $('cv'), ctx = cv.getContext('2d');
const INK = '#3a2358';
let W = 0, H = 0, dpr = 1, SW = 0, SX = 0, T = 0;
const ease = {
  outBack: (x) => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
  outCubic: (x) => 1 - Math.pow(1 - x, 3),
  inOut: (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2)
};
const hex = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const rgb = (c, a = 1) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`;
const PALS = {
  menu: ['#8fdcff', '#fff3d9', '#7ed957', '#4fc36b'], count: ['#7fd4ff', '#e9faff', '#7ed957', '#46bd63'],
  numbers: ['#b9a3ff', '#ffe3f3', '#a68bff', '#7f6be0'], add: ['#6fd8ff', '#e2f8ff', '#ffd36b', '#ffb347'],
  letters: ['#ffb3d9', '#fff3f9', '#cba5ff', '#a37cf2'], first: ['#a8e6a1', '#f6ffe3', '#5cc77a', '#3fa75f'],
  drive: ['#a6e88a', '#78d36a', '#7ed957', '#5fcf63'], colors: ['#ffd1e8', '#fff4fa', '#8fe3b0', '#5ccf8a'], place: ['#ffd0a8', '#fff1e0', '#9bdc6a', '#6fc455']
};
PALS.race = PALS.drive;
PALS.sub = PALS.add; PALS.compare = PALS.numbers; PALS.clock = PALS.count; PALS.shapes = PALS.colors; PALS.pattern = PALS.numbers; PALS.sight = PALS.letters; PALS.syl = PALS.first; PALS.rhyme = PALS.place;
PALS.story = PALS.place; PALS.geo = PALS.drive; PALS.hunt = PALS.colors; PALS.planets = PALS.numbers;
const pal = PALS.menu.map(hex), palTo = pal.map((c) => c.slice());
function setPal(name) { PALS[name].map(hex).forEach((c, i) => { palTo[i] = c; }); }
const BLOB_COLORS = ['#ff7aa8', '#ffc93c', '#46d9a6', '#ff9a4d', '#9b7bff', '#4cc9f0'];

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2); W = window.innerWidth; H = window.innerHeight;
  cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  SW = Math.min(W, 560); SX = (W - SW) / 2; layout();
}

/* scene objects */
const zip = { x: 0, y: 0, aim: -Math.PI / 2, aimTo: -Math.PI / 2, recoil: 0, sq: 0, hop: 0, mood: 'idle', moodT: 0, blink: 0, nextBlink: 2 };
let blobs = [], bubble = null, parts = [];
const clouds = Array.from({ length: 5 }, (_, i) => ({ x: Math.random() * 600, y: 60 + i * 55 + Math.random() * 30, s: 0.7 + Math.random() * 0.7, v: 6 + Math.random() * 8 }));
const amb = Array.from({ length: 14 }, () => ({ x: Math.random(), y: Math.random(), r: 5 + Math.random() * 12, v: 10 + Math.random() * 18, p: Math.random() * 6 }));
const daisies = Array.from({ length: 12 }, () => ({ x: Math.random(), l: Math.random() > 0.5 ? 0 : 1 }));

const ZS = 0.8;
function layout() {
  zip.x = W / 2; zip.y = H - 108;
  const pr = $('prompt');
  const pb = !pr.hidden ? pr.offsetTop + pr.offsetHeight : H * 0.28;
  $('puzzle').style.top = (pb + 34) + 'px';
  if (kindNow() === 'drive') { layoutDrive(pb); return; }
  const top = pb + 42;
  const bottom = zip.y - 104;
  const n = blobs.length || 3, rows = Math.ceil(n / 2), cellH = Math.max(60, (bottom - top) / rows);
  const r = clamp(Math.min(SW * 0.19, cellH * 0.41), 34, 90);
  blobs.forEach((b, i) => {
    const row = Math.floor(i / 2), inRow = row === rows - 1 && n % 2 === 1 ? 1 : 2, col = i % 2;
    b.bx = inRow === 1 ? W / 2 : W / 2 + (col === 0 ? -1 : 1) * Math.min(SW * 0.25, r * 1.5 + 8);
    b.by = top + (row + 0.5) * cellH; b.r = r;
  });
}

/* ---------------------------------------------------------------- drawing helpers */
function starPath(c, x, y, R, r) {
  c.beginPath();
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R; c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
  c.closePath();
}
function hillY(x, base, amp, ph) { return base + Math.sin(x * 0.008 + ph) * amp + Math.sin(x * 0.019 + ph * 2) * amp * 0.4; }

function drawBackground(dt) {
  if (kindNow() === 'race') return;
  if (kindNow() === 'drive') { drawField(dt); return; }
  for (let i = 0; i < 4; i++) for (let k = 0; k < 3; k++) pal[i][k] += (palTo[i][k] - pal[i][k]) * Math.min(1, dt * 3);
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, rgb(pal[0])); g.addColorStop(0.75, rgb(pal[1])); g.addColorStop(1, rgb(pal[1]));
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  // sun with a sleepy-happy face
  const sx = W - 70 - Math.max(0, (W - SW) / 2 * 0.3), sy = Math.max(120, H * 0.2) + 40;
  ctx.save(); ctx.translate(sx, sy);
  ctx.fillStyle = 'rgba(255,240,150,.35)'; ctx.beginPath(); ctx.arc(0, 0, 54 + Math.sin(T * 2) * 3, 0, 7); ctx.fill();
  ctx.fillStyle = '#ffe066'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 34, 0, 7); ctx.fill(); ctx.stroke();
  ctx.lineWidth = 3.5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(-11, -4, 4.5, Math.PI, 0); ctx.moveTo(15.5, -4); ctx.arc(11, -4, 4.5, Math.PI, 0); ctx.stroke();
  ctx.beginPath(); ctx.arc(0, 4, 10, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  ctx.fillStyle = 'rgba(255,120,150,.55)'; ctx.beginPath(); ctx.arc(-19, 7, 5, 0, 7); ctx.arc(19, 7, 5, 0, 7); ctx.fill();
  ctx.restore();
  // clouds
  for (const c of clouds) {
    c.x += c.v * dt; if (c.x > W + 120) c.x = -140;
    ctx.save(); ctx.translate(c.x, c.y + Math.sin(T * 0.6 + c.s * 5) * 4); ctx.scale(c.s, c.s);
    ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 4 / c.s;
    ctx.beginPath(); ctx.arc(-30, 6, 22, Math.PI * 0.5, Math.PI * 1.5); ctx.arc(-6, -10, 28, Math.PI, Math.PI * 1.9); ctx.arc(26, 0, 24, Math.PI * 1.35, Math.PI * 2.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.restore();
  }
  // floating bubbles
  for (const a of amb) {
    a.y -= (a.v / H) * dt; if (a.y < -0.05) { a.y = 1.05; a.x = Math.random(); }
    const x = a.x * W + Math.sin(T * 0.8 + a.p) * 14, y = a.y * H;
    ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(x, y, a.r, 0, 7); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.18)'; ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.beginPath(); ctx.arc(x - a.r * 0.35, y - a.r * 0.35, a.r * 0.18, 0, 7); ctx.fill();
  }
  // hills
  for (let layer = 0; layer < 2; layer++) {
    const base = H * (layer ? 0.855 : 0.8), amp = layer ? 14 : 22, ph = layer ? 2.2 : 0.4;
    ctx.fillStyle = rgb(pal[2 + layer]); ctx.strokeStyle = INK; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-10, H + 10);
    for (let x = -10; x <= W + 10; x += 10) ctx.lineTo(x, hillY(x, base, amp, ph));
    ctx.lineTo(W + 10, H + 10); ctx.closePath(); ctx.fill(); ctx.stroke();
    if (layer === 0) {
      for (const d of daisies) {
        if (d.l !== 0) continue;
        const x = d.x * W, y = hillY(x, base, amp, ph) + 16 + (d.x * 37 % 14);
        ctx.fillStyle = '#fff'; for (let k = 0; k < 5; k++) { const a = (k * Math.PI * 2) / 5 + T * 0.2; ctx.beginPath(); ctx.arc(x + Math.cos(a) * 5, y + Math.sin(a) * 5, 3.2, 0, 7); ctx.fill(); }
        ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.arc(x, y, 3, 0, 7); ctx.fill();
      }
    }
  }
}

function drawBlob(b) {
  if (b.state === 'gone') return;
  const age = T - b.t0;
  let x = b.bx + Math.sin(T * 0.9 + b.ph * 1.3) * 5, y = b.by + Math.sin(T * 1.6 + b.ph) * 6, sx = 1, sy = 1, alpha = b.alpha, face = 'idle';
  const r = b.r;
  if (b.state === 'in') {
    const p = clamp((age - b.delay) / 0.6, 0, 1);
    if (age < b.delay) return;
    const e = ease.outBack(p); y += (1 - e) * H * 0.55; sx = 0.75 + 0.25 * e; sy = 0.75 + 0.25 * e; alpha = Math.min(1, p * 3);
    if (p >= 1) { b.state = 'idle'; b.t0 = T; }
  } else if (b.state === 'shake') {
    face = 'oops';
    const p = age / 0.6; x += Math.sin(age * 46) * 11 * Math.max(0, 1 - p); sy = 1 - 0.06 * Math.max(0, 1 - p);
    if (p >= 1) { b.state = 'idle'; b.t0 = T; }
  } else if (b.state === 'win') {
    face = 'happy';
    if (age < 0.3) { const p = age / 0.3; sy = 1 - 0.22 * p; sx = 1 + 0.16 * p; }
    else {
      const p = clamp((age - 0.3) / 0.55, 0, 1); y -= Math.sin(p * Math.PI) * 110; sy = 1.18 - 0.1 * p; sx = 0.92 + 0.1 * p;
      if (age >= 0.85) { burst(x, y, 26); Snd.pop(); b.state = 'gone'; return; }
    }
  } else if (b.state === 'out') {
    const p = clamp(age / 0.6, 0, 1); alpha = 1 - p; y -= p * 70; sx = sy = 1 - 0.25 * p; face = 'happy';
    if (p >= 1) { b.state = 'gone'; return; }
  }
  if (b.dim) b.alpha += (0.28 - b.alpha) * 0.12; else b.alpha += (1 - b.alpha) * 0.2;
  b.cx = x; b.cy = y;
  ctx.save(); ctx.globalAlpha = clamp(alpha, 0, 1);
  // shadow
  ctx.fillStyle = 'rgba(58,35,88,.14)'; ctx.beginPath(); ctx.ellipse(x, b.by + r * 1.12, r * 0.8 * clamp(1 - Math.abs(y - b.by) / 160, 0.15, 1), r * 0.16, 0, 0, 7); ctx.fill();
  if (b.glow) {
    const pr = r * 1.28 + Math.sin(T * 6) * 5;
    ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(x, y, pr, 0, 7); ctx.stroke();
    ctx.strokeStyle = '#ffc93c'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, pr, 0, 7); ctx.stroke();
  }
  ctx.translate(x, y + r * 0.9); ctx.scale(sx, sy); ctx.translate(0, -r * 0.9);
  if (kindNow() === 'drive') drawSignBody(b, r, face); else {
  // body (wobbly jelly)
  const col = hex(b.color);
  ctx.beginPath();
  for (let i = 0; i <= 56; i++) {
    const a = (i / 56) * Math.PI * 2, wob = 1 + 0.045 * Math.sin(3 * a + T * 2.2 + b.ph) + 0.03 * Math.sin(5 * a - T * 1.6);
    const px = Math.cos(a) * r * wob * 1.02, py = Math.sin(a) * r * wob * (Math.sin(a) > 0 ? 0.92 : 1.04);
    if (i) ctx.lineTo(px, py); else ctx.moveTo(px, py);
  }
  ctx.closePath();
  const gr = ctx.createRadialGradient(-r * 0.35, -r * 0.45, r * 0.1, 0, 0, r * 1.15);
  gr.addColorStop(0, rgb(col.map((v) => v + (255 - v) * 0.5))); gr.addColorStop(0.55, b.color); gr.addColorStop(1, rgb(col.map((v) => v * 0.78)));
  ctx.fillStyle = gr; ctx.fill(); ctx.lineWidth = 5; ctx.lineJoin = 'round'; ctx.strokeStyle = INK; ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.ellipse(-r * 0.45, -r * 0.62, r * 0.2, r * 0.1, -0.7, 0, 7); ctx.fill();
  // belly badge with the answer
  ctx.fillStyle = '#fffaf0'; ctx.strokeStyle = INK; ctx.lineWidth = 3.5;
  ctx.beginPath(); ctx.ellipse(0, r * 0.3, r * 0.58, r * 0.46, 0, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const fs = r * (b.label.length > 1 ? Math.min(0.62, (b.label.length > 5 ? 2.1 : 2.6) / b.label.length) : 0.78);
  ctx.font = `700 ${fs}px Fredoka, 'Arial Rounded MT Bold', sans-serif`; ctx.fillText(b.label, 0, r * 0.33);
  // face: eyes
  const ey = -r * 0.42, ex = r * 0.3;
  for (const s of [-1, 1]) {
    ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 3.5;
    if (face === 'happy') {
      ctx.beginPath(); ctx.arc(s * ex, ey + 4, r * 0.13, Math.PI * 1.05, Math.PI * 1.95); ctx.lineWidth = 4.5; ctx.stroke();
    } else {
      ctx.beginPath(); ctx.ellipse(s * ex, ey, r * 0.15, r * 0.17 * (b.blink > 0 ? 0.15 : 1), 0, 0, 7); ctx.fill(); ctx.stroke();
      if (b.blink <= 0) { ctx.fillStyle = INK; const dx = clamp((zip.x - x) / 400, -1, 1) * r * 0.05, dy = r * 0.06; ctx.beginPath(); ctx.arc(s * ex + dx, ey + dy + (face === 'oops' ? 2 : 0), r * 0.075, 0, 7); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(s * ex + dx - 2, ey + dy - 2, r * 0.025, 0, 7); ctx.fill(); }
    }
  }
  // mouth
  ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.lineCap = 'round';
  if (face === 'happy') { ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(0, -r * 0.18, r * 0.13, 0, Math.PI); ctx.closePath(); ctx.fill(); }
  else if (face === 'oops') { ctx.beginPath(); ctx.ellipse(0, -r * 0.1, r * 0.06, r * 0.08, 0, 0, 7); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(0, -r * 0.2, r * 0.1, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  // cheeks
  ctx.fillStyle = 'rgba(255,90,130,.35)'; ctx.beginPath(); ctx.arc(-r * 0.62, -r * 0.18, r * 0.09, 0, 7); ctx.arc(r * 0.62, -r * 0.18, r * 0.09, 0, 7); ctx.fill();
  }
  ctx.restore();
  if (T > b.nextBlink) { b.blink = 0.12; b.nextBlink = T + 2 + Math.random() * 3; }
  if (b.blink > 0) b.blink -= 1 / 60;
}

/* ---------------------------------------------------------------- road trip scene */
function layoutDrive(pb) {
  const n = blobs.length || 3, r = n >= 5 ? 34 : n === 4 ? 40 : Math.min(SW * 0.13, 52);
  const sp = n === 2 ? SW * 0.34 : n <= 3 ? Math.min(SW * 0.3, 150) : (SW - 24 - r * 1.9) / (n - 1);
  car.hx = W / 2; car.hy = zip.y + 6;
  let sum = 0;
  blobs.forEach((b, i) => {
    const off = i - (n - 1) / 2;
    b.bx = W / 2 + off * sp; b.by0 = pb + 30 + r * 0.72 + Math.abs(off) * (n >= 4 ? 28 : 46); b.by = b.by0 + drv.off; b.r = r; sum += b.by0;
  });
  const avg = blobs.length ? sum / blobs.length : pb + 100;
  car.jy = car.hy - (car.hy - avg) * 0.42;
}
function roadEnd(b) { return [b.bx, b.by + b.r * 1.2]; }
function pathPt(b, t) {
  const [ex, ey] = roadEnd(b), hx = car.hx, hy = car.hy, jy = car.jy + drv.off;
  const L1 = hy - jy, L2 = Math.hypot(ex - hx, ey - jy) * 1.15, ts = L1 / (L1 + L2);
  if (t <= ts) return [hx, hy - L1 * (t / ts)];
  const u = (t - ts) / (1 - ts), m = 1 - u, c1y = jy - 70, c2y = ey + 110;
  return [m * m * m * hx + 3 * m * m * u * hx + 3 * m * u * u * ex + u * u * u * ex, m * m * m * jy + 3 * m * m * u * c1y + 3 * m * u * u * c2y + u * u * u * ey];
}
function setCarAt(b, t) {
  const p = pathPt(b, t), a = pathPt(b, Math.max(0, t - 0.015)), c = pathPt(b, Math.min(1, t + 0.015));
  car.x = p[0]; car.y = p[1]; car.rot = Math.atan2(c[0] - a[0], -(c[1] - a[1]));
}
function carStep() {
  const dt = clamp(T - (drv.lt || T), 0, 0.05); drv.lt = T;
  const tgt = car.mode === 'go' ? 260 : car.mode === 'settle' ? 300 : drv.sliding ? 170 : 70;
  drv.spd += (tgt - drv.spd) * Math.min(1, dt * 4); drv.pos += drv.spd * dt;
  if (drv.sliding) { const p = clamp((T - drv.sl0) / 0.85, 0, 1); drv.off = -H * 0.8 * (1 - ease.outCubic(p)); if (p >= 1) { drv.sliding = false; drv.off = 0; } }
  if (car.mode === 'wait') { car.x = car.hx; car.y = H + 220; car.rot = 0; }
  else if (car.mode === 'enter') {
    const p = clamp((T - car.t0) / 0.75, 0, 1); car.x = car.hx; car.y = lerp(H + 160, car.hy, ease.outBack(p)); car.rot = 0;
    if (p >= 1) car.mode = 'idle';
  } else if (car.mode === 'idle') { car.x = car.hx; car.y = car.hy; car.rot = 0; }
  else if (car.mode === 'go') {
    const p = clamp((T - car.t0) / car.dur, 0, 1); setCarAt(car.b, 0.96 * ease.inOut(p));
    if (Math.random() < 0.5) parts.push({ k: 'dot', x: car.x + rnd(-20, 20), y: car.y + 50, vx: rnd(-15, 15), vy: rnd(10, 40), g: 0, life: 0.5, max: 0.5, r: rnd(4, 9), c: 'rgba(255,255,255,.7)' });
    if (p >= 1) {
      const b = car.b; car.mode = 'park'; bubbleHit(b);
      if (S.done) { car.mode = 'settle'; car.t0 = T; car.fx = car.x; car.fy = car.y; car.rot0 = car.rot; }
      else { car.mode = 'back'; car.t0 = T; }
    }
  } else if (car.mode === 'settle') {
    // the car keeps going: the junction and signs slide past while it rejoins the main road
    const p = ease.inOut(clamp((T - car.t0) / 1.15, 0, 1)), cf = car.hy - car.fy;
    drv.off = (cf + H * 0.55) * p; car.y = car.fy + cf * p; car.x = lerp(car.fx, car.hx, p); car.rot = car.rot0 * (1 - p);
    if (p >= 1) car.mode = 'idle';
  } else if (car.mode === 'back') {
    const p = clamp((T - car.t0) / 0.6, 0, 1); setCarAt(car.b, 0.96 * (1 - ease.inOut(p)));
    if (p >= 1) car.mode = 'idle';
  }
  for (const b of blobs) if (b.by0 != null) b.by = b.by0 + drv.off;
}
function drawRoads() {
  const jy = car.jy + drv.off;
  const main = () => { ctx.beginPath(); ctx.moveTo(car.hx, H + 20); ctx.lineTo(car.hx, -20); };
  const forks = () => { ctx.beginPath(); for (const b of blobs) { const [ex, ey] = roadEnd(b); ctx.moveTo(car.hx, jy); ctx.bezierCurveTo(car.hx, jy - 70, ex, ey + 110, ex, ey); } };
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  for (const [w, col] of [[66, INK], [54, '#6f6788']]) { ctx.strokeStyle = col; ctx.lineWidth = w; main(); ctx.stroke(); forks(); ctx.stroke(); }
  ctx.strokeStyle = '#fff'; ctx.lineWidth = 4; ctx.setLineDash([14, 16]); ctx.lineDashOffset = drv.pos;
  main(); ctx.stroke(); forks(); ctx.stroke();
  ctx.restore();
}
function drvHash(n) { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
function drawField(dt) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#b4ee94'); g.addColorStop(1, '#7ed36c'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,.09)'; for (let y = -180 + (drv.pos % 180); y < H; y += 180) ctx.fillRect(0, y, W, 90);
  const gap = 130, base = Math.floor(drv.pos / gap), fr = drv.pos % gap;
  for (let k = -1; k * gap < H + gap; k++) {
    const y = k * gap + fr, row = base - k;
    for (const side of [0, 1]) {
      const h = drvHash(row * 2 + side); if (h < 0.3) continue;
      const fx = 0.05 + drvHash(row * 5 + side + 9) * 0.11, x = side ? W - fx * W : fx * W;
      if (h > 0.62) { ctx.fillStyle = '#8a5a35'; ctx.strokeStyle = INK; ctx.lineWidth = 4; rr(ctx, x - 5, y + 8, 10, 24, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#3fb86a'; ctx.beginPath(); ctx.arc(x, y - 6, 26, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.3)'; ctx.beginPath(); ctx.arc(x - 8, y - 14, 7, 0, 7); ctx.fill(); }
      else { ctx.fillStyle = '#56c466'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 20, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff8fc7'; for (const a2 of [0, 2, 4]) { ctx.beginPath(); ctx.arc(x + Math.cos(a2) * 9, y + Math.sin(a2) * 9, 4, 0, 7); ctx.fill(); } }
    }
  }
  ctx.fillStyle = '#ffd34d'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(W - 46, 52 + 0 * dt, 24, 0, 7); ctx.fill(); ctx.stroke();
}
function drawSignBody(b, r, face) {
  ctx.lineJoin = 'round';
  ctx.fillStyle = '#b7824f'; ctx.strokeStyle = INK; ctx.lineWidth = 4; rr(ctx, -6, r * 0.4, 12, r * 0.85, 4); ctx.fill(); ctx.stroke();
  const w = r * 1.9, h = r * 1.4;
  ctx.fillStyle = b.color; ctx.lineWidth = 5; rr(ctx, -w / 2, -h / 2, w, h, r * 0.3); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fffaf0'; ctx.lineWidth = 3; rr(ctx, -w / 2 + 7, -h / 2 + 7, w - 14, h - 14, r * 0.22); ctx.fill(); ctx.stroke();
  ctx.fillStyle = INK; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = `700 ${r * (b.label.length > 1 ? Math.min(0.8, 3.4 / b.label.length) : 0.98)}px Fredoka, 'Arial Rounded MT Bold', sans-serif`;
  ctx.fillText(b.label, 0, r * 0.05 + (face === 'oops' ? 3 : 0));
}
function drawCar() {
  const wob = car.mode === 'go' ? Math.sin(T * 40) * 1.5 : Math.sin(T * 3) * 1.2;
  ctx.save(); ctx.translate(car.x + wob, car.y); ctx.rotate(car.rot); ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  ctx.fillStyle = 'rgba(40,20,70,.22)'; ctx.beginPath(); ctx.ellipse(8, 12, 46, 64, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#2d2540'; ctx.strokeStyle = INK; ctx.lineWidth = 4;
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) { rr(ctx, sx * 38 - 9, sy * 36 - 15, 18, 30, 6); ctx.fill(); ctx.stroke(); }
  const cc = carCols(), bg = ctx.createLinearGradient(-36, 0, 36, 0); bg.addColorStop(0, cc.l); bg.addColorStop(0.5, cc.m); bg.addColorStop(1, cc.d);
  ctx.fillStyle = bg; ctx.lineWidth = 5; rr(ctx, -36, -62, 72, 124, 28); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.35)'; rr(ctx, -8, -56, 6, 40, 3); ctx.fill();
  ctx.fillStyle = '#ffe066'; ctx.lineWidth = 3; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * 21, -58, 8, 5, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = cc.s; rr(ctx, -26, -24, 52, 58, 16); ctx.fill(); ctx.stroke();
  // Zip at the wheel
  const zc = zipCols();
  for (const s of [-1, 1]) { ctx.fillStyle = zc.e; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(s * 17, -14, 8, 0, 7); ctx.fill(); ctx.stroke(); }
  const zg = ctx.createRadialGradient(-6, -8, 2, 0, 2, 26); zg.addColorStop(0, zc.l); zg.addColorStop(1, zc.m);
  ctx.fillStyle = zg; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 4, 24, 0, 7); ctx.fill(); ctx.stroke();
  const happy = zip.mood === 'happy';
  for (const s of [-1, 1]) {
    if (happy) { ctx.strokeStyle = INK; ctx.lineWidth = 3.5; ctx.beginPath(); ctx.arc(s * 9, 1, 5, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); continue; }
    ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(s * 9, 0, 6, 7, 0, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(s * 9, -2, 3, 0, 7); ctx.fill();
  }
  ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(0, 8, 7, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
  ctx.fillStyle = '#bfeaff'; ctx.lineWidth = 3; ctx.strokeStyle = INK; rr(ctx, -24, -40, 48, 12, 6); ctx.fill(); ctx.stroke();
  ctx.save(); ctx.translate(0, 4); drawGlasses(save.shop.eq.glasses, 24); drawHat(save.shop.eq.hat, 24); ctx.restore();
  ctx.restore();
}
function drawFriend() {
  if (!S.adv) return;
  const c = CHARS[S.adv.idx], hopAge = T - S.friendHop, hop = hopAge < 0.8 ? Math.abs(Math.sin(hopAge * 8)) * 30 * (1 - hopAge / 0.8) : 0;
  const x = W - 52, y = zip.y + 34 + Math.sin(T * 2.4) * 3 - hop;
  ctx.save(); ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '58px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';
  ctx.fillStyle = 'rgba(40,20,70,.2)'; ctx.beginPath(); ctx.ellipse(x, zip.y + 74, 30, 7, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#000'; ctx.fillText(c.e, x, y);
  for (let i = 0; i < S.adv.n; i++) { ctx.fillStyle = i < S.adv.q ? '#ffc93c' : 'rgba(255,255,255,.8)'; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(x + (i - 1) * 18, zip.y - 14, 6.5, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.restore();
}

/* ---------------------------------------------------------------- Zip's wardrobe */
const mixHex = (h, t, to) => rgb(hex(h).map((v, i) => v + (to[i] - v) * t));
function zipCols() { const it = SHOP.zip.find((x) => x.id === save.shop.eq.zip) || SHOP.zip[0]; return { m: it.hex, l: mixHex(it.hex, 0.5, [255, 255, 255]), d: mixHex(it.hex, 0.25, [0, 0, 40]), e: mixHex(it.hex, 0.18, [0, 0, 60]) }; }
function carCols() { const it = SHOP.car.find((x) => x.id === save.shop.eq.car) || SHOP.car[0]; return { m: it.hex, l: mixHex(it.hex, 0.3, [255, 255, 255]), d: mixHex(it.hex, 0.22, [0, 0, 40]), s: mixHex(it.hex, 0.4, [0, 0, 40]) }; }
function heartPath(c, x, y, r) { c.beginPath(); c.moveTo(x, y + r * 0.9); c.bezierCurveTo(x - r * 1.3, y + r * 0.1, x - r * 0.9, y - r * 0.9, x, y - r * 0.35); c.bezierCurveTo(x + r * 0.9, y - r * 0.9, x + r * 1.3, y + r * 0.1, x, y + r * 0.9); c.closePath(); }
function drawGlasses(id, R) {
  if (!id) return;
  const gy = -R * 0.12, ex = R * 0.34;
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = Math.max(2.5, R * 0.09);
  if (id === 'shades') {
    ctx.beginPath(); ctx.moveTo(-ex + R * 0.2, gy - R * 0.06); ctx.lineTo(ex - R * 0.2, gy - R * 0.06); ctx.stroke();
    for (const s of [-1, 1]) { ctx.fillStyle = '#2d2540'; rr(ctx, s * ex - R * 0.28, gy - R * 0.22, R * 0.56, R * 0.42, R * 0.15); ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.55)'; rr(ctx, s * ex - R * 0.2, gy - R * 0.16, R * 0.16, R * 0.07, R * 0.03); ctx.fill(); }
  } else if (id === 'hearts') {
    for (const s of [-1, 1]) { heartPath(ctx, s * ex, gy, R * 0.32); ctx.fillStyle = '#ff5c93'; ctx.fill(); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.arc(s * ex - R * 0.12, gy - R * 0.12, R * 0.05, 0, 7); ctx.fill(); }
  } else if (id === 'stars') {
    for (const s of [-1, 1]) { starPath(ctx, s * ex, gy, R * 0.36, R * 0.17); ctx.fillStyle = '#ffd34d'; ctx.fill(); ctx.stroke(); }
  }
  ctx.restore();
}
function drawHat(id, R) {
  if (!id) return;
  const y0 = -R * 0.92;
  ctx.save(); ctx.lineJoin = 'round'; ctx.lineCap = 'round'; ctx.strokeStyle = INK; ctx.lineWidth = Math.max(2.5, R * 0.1);
  if (id === 'party') {
    const g = ctx.createLinearGradient(-R * 0.4, 0, R * 0.4, 0); g.addColorStop(0, '#ff8fc7'); g.addColorStop(1, '#ffc93c');
    ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(-R * 0.42, y0 + R * 0.14); ctx.lineTo(R * 0.04, y0 - R * 1.05); ctx.lineTo(R * 0.42, y0 + R * 0.14); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; for (const [dx, dy] of [[-0.15, -0.15], [0.12, -0.4], [0.02, 0.0], [-0.05, -0.65]]) { ctx.beginPath(); ctx.arc(dx * R, y0 + dy * R, R * 0.05, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#4cc9f0'; ctx.beginPath(); ctx.arc(R * 0.04, y0 - R * 1.05, R * 0.13, 0, 7); ctx.fill(); ctx.stroke();
  } else if (id === 'crown') {
    const y1 = y0 + R * 0.12;
    ctx.fillStyle = '#ffc93c'; ctx.beginPath(); ctx.moveTo(-R * 0.5, y1); ctx.lineTo(-R * 0.54, y0 - R * 0.5); ctx.lineTo(-R * 0.26, y0 - R * 0.18); ctx.lineTo(0, y0 - R * 0.62); ctx.lineTo(R * 0.26, y0 - R * 0.18); ctx.lineTo(R * 0.54, y0 - R * 0.5); ctx.lineTo(R * 0.5, y1); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff5c7a'; ctx.beginPath(); ctx.arc(0, y0 - R * 0.1, R * 0.08, 0, 7); ctx.fill(); ctx.fillStyle = '#4cc9f0'; for (const s of [-1, 1]) { ctx.beginPath(); ctx.arc(s * R * 0.32, y0 - R * 0.02, R * 0.06, 0, 7); ctx.fill(); }
  } else if (id === 'top') {
    ctx.fillStyle = '#3a3150'; rr(ctx, -R * 0.38, y0 - R * 0.78, R * 0.76, R * 0.86, R * 0.08); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff5c7a'; ctx.fillRect(-R * 0.37, y0 - R * 0.16, R * 0.74, R * 0.16); ctx.strokeRect(-R * 0.37, y0 - R * 0.16, R * 0.74, R * 0.16);
    ctx.fillStyle = '#2d2540'; ctx.beginPath(); ctx.ellipse(0, y0 + R * 0.1, R * 0.64, R * 0.14, 0, 0, 7); ctx.fill(); ctx.stroke();
  } else if (id === 'cap') {
    ctx.fillStyle = '#ff5a5a'; ctx.beginPath(); ctx.arc(0, y0 + R * 0.14, R * 0.58, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#d94444'; ctx.beginPath(); ctx.ellipse(R * 0.5, y0 + R * 0.16, R * 0.46, R * 0.12, 0.08, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffd34d'; ctx.beginPath(); ctx.arc(0, y0 - R * 0.42, R * 0.07, 0, 7); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}

function drawZip() {
  const R = 44, cx = zip.x, cy = zip.y + Math.sin(T * 2) * 4 - Math.abs(Math.sin(zip.hop * Math.PI)) * 26 * (zip.hop > 0 ? 1 : 0);
  ctx.save(); ctx.translate(cx, cy); ctx.scale((1 + zip.sq) * ZS, (1 - zip.sq) * ZS);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // flame
  const fl = 22 + Math.sin(T * 32) * 5 + Math.sin(T * 17) * 3;
  const fg = ctx.createLinearGradient(0, R * 1.1, 0, R * 1.1 + fl + 20); fg.addColorStop(0, '#ffe066'); fg.addColorStop(1, '#ff7a2e');
  ctx.fillStyle = fg; ctx.strokeStyle = INK; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-18, R * 1.15); ctx.quadraticCurveTo(-14, R * 1.15 + fl, 0, R * 1.15 + fl + 16); ctx.quadraticCurveTo(14, R * 1.15 + fl, 18, R * 1.15); ctx.closePath(); ctx.fill(); ctx.stroke();
  // barrel (drawn behind the head, so it pokes out over his shoulder)
  ctx.save(); ctx.rotate(zip.aim); ctx.translate(zip.recoil, 0);
  const bl = 98;
  ctx.fillStyle = '#ffc93c'; ctx.strokeStyle = INK; ctx.lineWidth = 5;
  rr(ctx, R * 0.2, -17, bl - R * 0.2, 34, 12); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.55)'; rr(ctx, R * 0.5, -11, bl - R * 0.8, 7, 3.5); ctx.fill();
  ctx.fillStyle = '#ff6b6b'; ctx.strokeStyle = INK; rr(ctx, bl - 12, -23, 20, 46, 10); ctx.fill(); ctx.stroke();
  ctx.restore();
  // ears
  for (const s of [-1, 1]) {
    ctx.fillStyle = zipCols().e; ctx.beginPath(); ctx.arc(s * R * 0.68, -R * 0.78, R * 0.3, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ff9ec7'; ctx.beginPath(); ctx.arc(s * R * 0.68, -R * 0.78, R * 0.14, 0, 7); ctx.fill();
  }
  // body
  const bg = ctx.createRadialGradient(-R * 0.3, -R * 0.4, R * 0.1, 0, 0, R * 1.1); { const zc = zipCols(); bg.addColorStop(0, zc.l); bg.addColorStop(0.6, zc.m); bg.addColorStop(1, zc.d); }
  ctx.fillStyle = bg; ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill(); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.ellipse(-R * 0.45, -R * 0.62, R * 0.18, R * 0.09, -0.6, 0, 7); ctx.fill();
  // eyes
  const ax = Math.cos(zip.aim), ay = Math.sin(zip.aim), bl2 = zip.blink > 0 ? 0.12 : 1, happy = zip.mood === 'happy', oops = zip.mood === 'oops';
  for (const s of [-1, 1]) {
    const ex = s * R * 0.34, ey = -R * 0.12;
    if (happy) { ctx.strokeStyle = INK; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(ex, ey + 6, R * 0.17, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke(); continue; }
    ctx.fillStyle = '#fff'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(ex, ey, R * 0.23, R * 0.27 * bl2, 0, 0, 7); ctx.fill(); ctx.stroke();
    if (bl2 > 0.5) {
      ctx.fillStyle = INK; ctx.beginPath(); ctx.arc(ex + ax * R * 0.08, ey + ay * R * 0.08 + (oops ? 3 : 0), R * 0.12, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex + ax * R * 0.08 - 3, ey + ay * R * 0.08 - 3, R * 0.04, 0, 7); ctx.fill();
    }
  }
  ctx.fillStyle = 'rgba(255,110,150,.45)'; ctx.beginPath(); ctx.arc(-R * 0.6, R * 0.22, R * 0.11, 0, 7); ctx.arc(R * 0.6, R * 0.22, R * 0.11, 0, 7); ctx.fill();
  ctx.strokeStyle = INK; ctx.lineWidth = 4;
  if (happy) { ctx.fillStyle = INK; ctx.beginPath(); ctx.moveTo(-R * 0.25, R * 0.2); ctx.quadraticCurveTo(0, R * 0.62, R * 0.25, R * 0.2); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff8fa8'; ctx.beginPath(); ctx.ellipse(0, R * 0.38, R * 0.1, R * 0.06, 0, 0, 7); ctx.fill(); }
  else if (oops) { ctx.beginPath(); ctx.ellipse(0, R * 0.3, R * 0.08, R * 0.1, 0, 0, 7); ctx.stroke(); }
  else { ctx.beginPath(); ctx.arc(0, R * 0.14, R * 0.2, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); }
  drawGlasses(save.shop.eq.glasses, R);
  // pod
  const pg = ctx.createLinearGradient(-R, R * 0.3, R, R * 1.2); pg.addColorStop(0, '#ff8a8a'); pg.addColorStop(1, '#e04848');
  ctx.fillStyle = pg; ctx.strokeStyle = INK; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(-R * 1.12, R * 0.34); ctx.lineTo(R * 1.12, R * 0.34); ctx.quadraticCurveTo(R * 0.95, R * 1.24, 0, R * 1.24); ctx.quadraticCurveTo(-R * 0.95, R * 1.24, -R * 1.12, R * 0.34); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#fffaf0'; rr(ctx, -R * 1.18, R * 0.28, R * 2.36, R * 0.2, R * 0.1); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffc93c'; for (const s of [-1, 0, 1]) { ctx.beginPath(); ctx.arc(s * R * 0.5, R * 0.75, 5, 0, 7); ctx.fill(); ctx.stroke(); }
  drawHat(save.shop.eq.hat, R);
  ctx.restore();
}
function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

function drawBubble() {
  if (!bubble) return;
  const p = bubble.p, e = ease.inOut(p);
  const tx = bubble.blob.cx != null ? bubble.blob.cx : bubble.blob.bx, ty = bubble.blob.cy != null ? bubble.blob.cy : bubble.blob.by;
  const dx = tx - bubble.x0, dy = ty - bubble.y0, len = Math.hypot(dx, dy) || 1;
  const x = bubble.x0 + dx * e + (-dy / len) * Math.sin(p * Math.PI) * 26, y = bubble.y0 + dy * e + (dx / len) * Math.sin(p * Math.PI) * 26;
  bubble.x = x; bubble.y = y;
  if (Math.random() < 0.8) parts.push({ k: 'dot', x: x + rnd(-6, 6), y: y + rnd(-6, 6), vx: rnd(-20, 20), vy: rnd(-20, 20), g: 0, life: 0.4, max: 0.4, r: rnd(2, 5), c: pick(['#fff', '#bdeaff', '#ffe066']) });
  ctx.save(); ctx.translate(x, y); ctx.scale(1 + 0.08 * Math.sin(T * 30), 1 - 0.08 * Math.sin(T * 30));
  const g = ctx.createRadialGradient(-6, -7, 2, 0, 0, 24); g.addColorStop(0, 'rgba(255,255,255,.95)'); g.addColorStop(1, 'rgba(140,215,255,.75)');
  ctx.fillStyle = g; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, 22, 0, 7); ctx.fill(); ctx.stroke();
  ctx.rotate(T * 8); ctx.fillStyle = '#ffc93c'; ctx.lineWidth = 2.5; starPath(ctx, 0, 0, 12, 5.5); ctx.fill(); ctx.stroke();
  ctx.restore();
}

/* particles */
function burst(x, y, n) {
  const cols = ['#ff7aa8', '#ffc93c', '#46d9a6', '#4cc9f0', '#9b7bff', '#ff9a4d'];
  for (let i = 0; i < n; i++) {
    const a = rnd(0, Math.PI * 2), v = rnd(120, 340);
    parts.push({ k: Math.random() < 0.5 ? 'star' : 'dot', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 120, g: 520, life: rnd(0.7, 1.2), max: 1.2, r: rnd(5, 11), c: pick(cols), rot: rnd(0, 6), vr: rnd(-8, 8) });
  }
  parts.push({ k: 'ring', x, y, vx: 0, vy: 0, g: 0, life: 0.45, max: 0.45, r: 20, c: '#fff' });
}
function floatText(x, y, text) { parts.push({ k: 'text', x, y, vx: 0, vy: -70, g: 0, life: 1.3, max: 1.3, r: 34, c: '#ffc93c', text }); }
function drawParts(dt) {
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i]; p.life -= dt;
    if (p.life <= 0) { parts.splice(i, 1); continue; }
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += p.g * dt;
    const a = clamp(p.life / p.max * 1.6, 0, 1);
    ctx.save(); ctx.globalAlpha = a;
    if (p.k === 'star') { ctx.translate(p.x, p.y); ctx.rotate((p.rot += p.vr * dt)); ctx.fillStyle = p.c; ctx.strokeStyle = INK; ctx.lineWidth = 2; starPath(ctx, 0, 0, p.r, p.r * 0.45); ctx.fill(); ctx.stroke(); }
    else if (p.k === 'dot') { ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * Math.min(1, a + 0.3), 0, 7); ctx.fill(); }
    else if (p.k === 'ring') { const k = 1 - p.life / p.max; ctx.strokeStyle = p.c; ctx.lineWidth = 6 * (1 - k); ctx.beginPath(); ctx.arc(p.x, p.y, p.r + k * 90, 0, 7); ctx.stroke(); }
    else if (p.k === 'text') { ctx.font = `700 ${p.r}px Fredoka, sans-serif`; ctx.textAlign = 'center'; ctx.lineWidth = 7; ctx.strokeStyle = INK; ctx.lineJoin = 'round'; ctx.strokeText(p.text, p.x, p.y); ctx.fillStyle = p.c; ctx.fillText(p.text, p.x, p.y); }
    ctx.restore();
  }
}

/* ---------------------------------------------------------------- game state */
const MODEDEF = {
  count: { gen: 'count', kind: 'shoot' }, numbers: { gen: 'numbers', kind: 'shoot' }, add: { gen: 'add', kind: 'shoot' }, letters: { gen: 'letters', kind: 'shoot' },
  first: { gen: 'first', kind: 'shoot' }, colors: { gen: 'colors', kind: 'shoot' }, drive: { gen: 'drive', kind: 'drive' }, race: { gen: 'race', kind: 'race' }, sub: { gen: 'sub', kind: 'shoot' }, compare: { gen: 'compare', kind: 'shoot' }, clock: { gen: 'clock', kind: 'shoot' }, shapes: { gen: 'shapes', kind: 'shoot' }, pattern: { gen: 'pattern', kind: 'shoot' }, sight: { gen: 'sight', kind: 'shoot' }, syl: { gen: 'syl', kind: 'shoot' }, rhyme: { gen: 'rhyme', kind: 'shoot' }, geo: { gen: 'geo', kind: 'shoot' }, hunt: { gen: 'hunt', kind: 'shoot' }, planets: { gen: 'planets', kind: 'shoot' }, place: { gen: 'place', kind: 'place' }
};
const car = { x: 0, y: 0, rot: 0, mode: 'wait', b: null, t0: 0, dur: 1, hx: 0, hy: 0, jy: 0, on: false, fx: 0, fy: 0, rot0: 0 };
const drv = { pos: 0, spd: 70, off: 0, lt: 0, sl0: 0, sliding: false };
function kindNow() { return S.screen === 'play' && S.mode && MODEDEF[S.mode] ? MODEDEF[S.mode].kind : 'shoot'; }
const S = { adv: null, advView: 'intro', advIdx: 0, stNext: null, friendHop: -9, screen: 'splash', mode: null, q: null, tries: 0, canTap: false, done: false, idle: 0, nudged: false, round: null, pendingSticker: false, greeted: false, shotTimer: 0, qid: 0 };
const MODES = ['count', 'numbers', 'add', 'letters', 'first', 'drive', 'place', 'colors'];
const screens = { splash: $('splash'), menu: $('menu'), roundend: $('roundend'), sticker: $('stickerscr'), album: $('albumscr'), adv: $('advscr'), trophy: $('trophyscr'), shop: $('shopscr'), cat: $('catscr'), settings: $('settingsscr'), path: $('pathscr'), paint: $('paintscr'), story: $('storyscr') };

function applyLang() {
  document.documentElement.lang = L;
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = UI[L][el.dataset.i18n]; });
  document.querySelectorAll('[data-ph]').forEach((el) => { el.placeholder = UI[L][el.dataset.ph]; });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', UI[L][el.dataset.i18nAria]); });
  $('l-fr').setAttribute('aria-pressed', String(L === 'fr')); $('l-en').setAttribute('aria-pressed', String(L === 'en'));
  document.title = L === 'fr' ? 'L’Académie de Zip' : 'Zip’s Academy';
  $('starn').textContent = balance();
  renderPips(); if (S.screen === 'album') renderAlbum(); if (S.screen === 'adv') renderAdv(S.advView); if (S.screen === 'trophy') Prog.render(); if (S.screen === 'shop') renderShop(); if (S.screen === 'story') storyList(); if (S.screen === 'path') renderPath(S.pathView, false); if (S.screen === 'cat') openCat(S.cat); if (S.screen === 'settings') renderSettings(); Prog.updateBtn();
}
function renderPips() {
  if (typeof updatePlayBtn === 'function') updatePlayBtn();
  document.querySelectorAll('.mode').forEach((m) => {
    const lv = save.lv[m.dataset.mode], box = m.querySelector('.pips');
    box.innerHTML = [1, 2, 3].map((i) => `<i class="${i <= lv ? 'on' : ''}"></i>`).join('');
  });
}
function show(name) {
  S.screen = name;
  for (const k in screens) screens[k].hidden = k !== name;
  const play = name === 'play';
  $('prompt').hidden = !play; $('home').hidden = !play; $('gear').hidden = name !== 'menu'; $('stars').hidden = name === 'splash';
  if (!play) { race.active = false; blobs = []; bubble = null; S.q = null; S.canTap = false; $('puzzle').hidden = true; P.active = false; }
  if (!play) car.on = false;
  if (name !== 'story') STORY.tk++;
  setPal(play ? S.mode : 'menu');
  Snd.setTrack(play ? 'play' : 'menu');
}
function updateStars(bump) { $('starn').textContent = balance(); if (bump) { const s = $('stars'); s.classList.remove('bump'); void s.offsetWidth; s.classList.add('bump'); } }

function addStars(n) {
  save.stars += n; Prog.ensureDay().stars += n;
  const had = save.stickers;
  while (save.stickers < STICKERS.length && save.stars >= (save.stickers + 1) * STICKER_EVERY) save.stickers++;
  if (save.stickers > had) S.pendingSticker = true;
  setTimeout(() => updateStars(true), 700);
}
function gate(fn) { if (S.pendingSticker) { S.pendingSticker = false; showSticker(fn); } else fn(); }
function pickStopMode() { const c = CHARS[S.adv.idx]; return c.mode === 'mix' ? pick(MODES) : c.mode; }

function startMode(m) {
  S.path = null;
  if (m === 'race') { startRace(); return; }
  S.adv = null; S.mode = m; S.round = { n: 0, first: 0, stars: 0 }; zip.aimTo = -Math.PI / 2; show('play'); newQuestion();
}
function newQuestion(keepCount) {
  Voice.stop();
  const q = GEN[MODEDEF[S.mode].gen](save.lv[S.mode]), kind = MODEDEF[S.mode].kind;
  S.q = q; S.tries = 0; S.done = false; S.canTap = false; S.idle = 0; S.nudged = false; bubble = null; blobs = []; S.qid++;
  zip.aimTo = -Math.PI / 2;
  const id = S.qid;
  const p = $('prompt'); $('pvis').innerHTML = q.vis; $('ptext').textContent = q.text;
  p.hidden = false; p.style.animation = 'none'; void p.offsetHeight; p.style.animation = '';
  $('puzzle').hidden = kind !== 'place';
  if (kind === 'place') {
    setupPuzzle(q);
    requestAnimationFrame(() => requestAnimationFrame(() => { if (id !== S.qid) return; layout(); Snd.whoosh(); setTimeout(() => { if (id === S.qid) Voice.say(q.say); }, 350); }));
    return;
  }
  P.active = false;
  const colors = shuffle(BLOB_COLORS);
  blobs = q.opts.map((o, i) => ({ val: o.val, label: o.label, say: o.say, color: o.hex || colors[i % colors.length], ph: rnd(0, 6), bx: W / 2, by: H / 2, r: 60, state: 'in', t0: T, delay: 0.1 + i * 0.09, alpha: 1, dim: false, glow: false, blink: 0, nextBlink: T + rnd(1, 4), cx: null, cy: null }));
  if (kind === 'drive') { if (!car.on) car.mode = 'wait'; car.b = null; drv.off = -H * 0.8; drv.sliding = true; drv.sl0 = T; }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (id !== S.qid) return;
    layout(); blobs.forEach((b) => { b.t0 = T; }); S.canTap = true; Snd.whoosh();
    if (kind === 'drive') { if (!car.on) { car.mode = 'enter'; car.t0 = T; car.on = true; } drv.sl0 = T; }
    setTimeout(() => { if (id === S.qid) Voice.say(q.say); }, 350);
  }));
}
function fire(b) {
  if (!S.canTap || S.done || b.state === 'in' || b.state === 'gone') return;
  S.canTap = false; S.idle = 0;
  Snd.click();
  const id = S.qid;
  if (kindNow() === 'drive') {
    setTimeout(() => { if (id !== S.qid || !S.q) return; car.mode = 'go'; car.b = b; car.t0 = T; car.dur = 0.95; Snd.vroom(); }, 130);
    return;
  }
  const tx = b.cx != null ? b.cx : b.bx, ty = b.cy != null ? b.cy : b.by;
  zip.aimTo = clamp(Math.atan2(ty - zip.y, tx - zip.x), -Math.PI + 0.25, -0.25);
  setTimeout(() => {
    if (id !== S.qid || !S.q) return;
    const a = zip.aim, tipx = zip.x + Math.cos(a) * 112 * ZS, tipy = zip.y + Math.sin(a) * 112 * ZS;
    bubble = { x0: tipx, y0: tipy, x: tipx, y: tipy, p: 0, blob: b };
    zip.recoil = -16; zip.sq = 0.1; Snd.shoot();
  }, 130);
}
function bubbleHit(b) {
  const q = S.q; if (!q || S.done) return;
  if (b.val === q.ans) correct(b); else wrong(b);
}
function missCommon() {
  S.tries++; Snd.bad(); Prog.miss(); zip.mood = 'oops'; zip.moodT = 1.1;
  let line = pick(TX[L].again);
  if (S.tries >= 2) { line += ' ' + S.q.hint; S.hint = true; }
  Voice.say(line);
}
function wrong(b) {
  parts.push({ k: 'ring', x: b.cx, y: b.cy, vx: 0, vy: 0, g: 0, life: 0.4, max: 0.4, r: 20, c: '#ffd6e0' });
  b.state = 'shake'; b.t0 = T;
  missCommon();
  if (S.tries >= 2) blobs.forEach((x) => { if (x.val === S.q.ans) x.glow = true; else if (x.state !== 'gone') x.dim = true; });
  setTimeout(() => { if (!S.done) S.canTap = true; }, 450);
}
function correct(b) {
  b.state = 'win'; b.t0 = T; b.glow = false; b.dim = false; b.alpha = 1;
  blobs.forEach((x) => { if (x !== b && x.state !== 'gone') { x.state = 'out'; x.t0 = T; x.glow = false; } });
  win(b.cx, b.cy, '');
}
function win(x, y, extra) {
  S.done = true; S.canTap = false;
  const first = S.tries === 0, gain = first ? 2 : 1;
  zip.mood = 'happy'; zip.moodT = 1.8; zip.hop = 0.001; S.friendHop = T;
  Snd.good(); if (kindNow() === 'drive') setTimeout(() => Snd.honk(), 150);
  burst(x, y, 14);
  floatText(x, y - 70, '+' + gain + ' ⭐');
  setTimeout(() => Snd.star(), 450);
  const line = nameLine(pick(TX[L].praise));
  setTimeout(() => { Voice.say((extra ? extra + ' ' : '') + line); }, 400);
  addStars(gain); S.round.stars += gain; S.round.n++; if (first) S.round.first++;
  Prog.answer(first);
  if (S.mode === 'place') save.st.place++; if (S.mode === 'drive') save.st.drive++;
  if (Prog.streak >= 3) setTimeout(() => floatText(zip.x, zip.y - 150, '🔥 ' + Prog.streak), 500);
  persist();
  const id = S.qid;
  setTimeout(() => Prog.check(), 1100);
  setTimeout(() => { if (id === S.qid) afterQuestion(); }, 2200);
}
function afterQuestion() {
  if (S.pendingSticker) { S.pendingSticker = false; showSticker(proceed); return; }
  proceed();
}
function proceed() {
  if (S.path) { S.path.q++; if (S.path.q >= S.path.n) { pathStepDone(false); return; } show('play'); newQuestion(); return; }
  if (S.adv) {
    S.adv.q++;
    if (S.adv.q >= S.adv.n) { finishStop(); return; }
    S.mode = pickStopMode(); show('play'); newQuestion(); return;
  }
  if (S.round.n >= ROUND_LEN) endRound(); else { show('play'); newQuestion(); }
}
function showSticker(next) {
  S.stNext = next || proceed;
  show('sticker');
  $('sticker-pic').textContent = STICKERS[save.stickers - 1];
  const el = $('sticker-pic'); el.style.animation = 'none'; void el.offsetHeight; el.style.animation = '';
  Snd.sticker(); burst(W / 2, H * 0.4, 30);
  setTimeout(() => Voice.say(TX[L].sayStickers), 300);
}
function endRound() {
  const r = S.round; const lv = save.lv[S.mode];
  if (r.first >= 7 && lv < 3) save.lv[S.mode] = lv + 1; else if (r.first <= 3 && lv > 1) save.lv[S.mode] = lv - 1;
  Prog.round(S.mode, r.first >= ROUND_LEN); updAcc(S.mode, r.first / ROUND_LEN);
  persist(); renderPips();
  show('roundend');
  const n = r.first >= 7 ? 3 : r.first >= 4 ? 2 : 1;
  $('re-title').textContent = nameLine(pick(TX[L].roundTitle), true);
  $('re-stars').innerHTML = Array.from({ length: 3 }, (_, i) => `<span style="--i:${i}">${i < n ? '⭐' : '☆'}</span>`).join('');
  $('re-text').textContent = TX[L].roundText(r.first, ROUND_LEN);
  Snd.sticker(); burst(W / 2, H * 0.35, 24);
  setTimeout(() => Voice.say($('re-title').textContent), 500);
  setTimeout(() => Prog.check(), 900);
}
function goMenu() {
  Voice.stop(); S.qid++; S.adv = null; S.path = null;
  if (S.fromCat) { const c = S.fromCat; S.fromCat = null; openCat(c); return; }
  show('menu'); renderPips(); Prog.updateBtn();
}

/* ---------------------------------------------------------------- adventure */
function renderAdv(view) {
  S.advView = view;
  const cur = save.adv.stop;
  let doneUpTo, ch, say, btn, title;
  if (view === 'intro') { doneUpTo = cur; ch = CHARS[cur]; say = ch[L].need; btn = UI[L].go; title = TX[L].stopTitle(cur + 1, CHARS.length); }
  else if (view === 'thanks') { doneUpTo = S.advIdx + 1; ch = CHARS[S.advIdx]; say = ch[L].thanks; btn = UI[L].next; title = '💖'; }
  else { doneUpTo = CHARS.length; ch = { e: '🎉', n: '' }; say = TX[L].advDone; btn = UI[L].menu; title = TX[L].advDoneT; }
  $('adv-title').textContent = title;
  $('adv-path').innerHTML = CHARS.map((c, i) => {
    const cls = i < doneUpTo ? 'done' : (i === doneUpTo && view === 'intro' ? 'cur' : 'lock');
    return (i ? '<i></i>' : '') + `<span class="stop ${cls}">${i <= doneUpTo || view === 'done' ? c.e : '❔'}</span>`;
  }).join('');
  $('adv-emoji').textContent = ch.e; $('adv-name').textContent = ch.n; $('adv-say').textContent = say; $('adv-go').textContent = btn;
  $('adv-back').hidden = view !== 'intro';
  return say;
}
function openAdv() {
  show('adv'); const say = renderAdv('intro'); Voice.say(say);
}
function startStop() {
  const i = save.adv.stop;
  S.adv = { idx: i, q: 0, n: STOP_LEN }; S.round = { n: 0, first: 0, stars: 0 }; S.mode = pickStopMode();
  Voice.stop(); show('play'); newQuestion();
}
function finishStop() {
  const i = S.adv.idx, c = CHARS[i];
  Prog.round(S.mode, S.round.first >= S.adv.n);
  if (!save.adv.friends.includes(c.id)) save.adv.friends.push(c.id);
  save.adv.stop = i + 1; S.advIdx = i;
  addStars(3);
  let finished = false;
  if (save.adv.stop >= CHARS.length) { finished = true; save.adv.stop = 0; save.st.adv++; addStars(7); }
  S.adv = null; S.advFinished = finished;
  persist(); Prog.check();
  show('adv'); const say = renderAdv('thanks'); Snd.sticker(); burst(W / 2, H * 0.3, 30);
  setTimeout(() => Voice.say(say), 400);
}
function advNext() {
  if (S.screen !== 'adv') show('adv');
  if (S.advView === 'thanks') {
    if (S.advFinished) { S.advFinished = false; const say = renderAdv('done'); Voice.say(say); Snd.sticker(); burst(W / 2, H * 0.3, 36); }
    else { const say = renderAdv('intro'); Voice.say(say); }
  } else if (S.advView === 'done') goMenu();
  else startStop();
}

/* ---------------------------------------------------------------- letter puzzle (drag the letters into place) */
const P = { active: false, q: null, slotEls: [], tileEls: [], drag: null };
function setupPuzzle(q) {
  const sl = $('slots'), tr = $('tray'); sl.innerHTML = ''; tr.innerHTML = '';
  P.q = q; P.active = false; P.drag = null;
  sl.style.setProperty('--sw', Math.min(56, Math.floor((Math.min(W, 520) - 32 - (q.letters.length - 1) * 8) / q.letters.length)) + 'px');
  P.slotEls = q.letters.map((ch, i) => {
    const d = document.createElement('div'), blank = q.blanks.includes(i);
    d.className = 'slot' + (blank ? '' : ' given'); d.dataset.ch = ch; d.textContent = blank ? '' : ch; sl.appendChild(d); return d;
  });
  const cols = shuffle(BLOB_COLORS);
  P.tileEls = q.tiles.map((ch, i) => {
    const t = document.createElement('div'); t.className = 'ptile'; t.textContent = ch; t.dataset.ch = ch;
    t.style.setProperty('--c', cols[i % cols.length]); t.style.setProperty('--d', (250 + i * 80) + 'ms'); tr.appendChild(t); return t;
  });
  const id = S.qid; setTimeout(() => { if (id === S.qid) P.active = true; }, 700);
}
function nextBlank() { return P.slotEls.find((s) => !s.classList.contains('filled') && !s.classList.contains('given')); }
function refreshHint() {
  P.slotEls.forEach((s) => s.classList.remove('target')); P.tileEls.forEach((t) => t.classList.remove('glow'));
  if (S.tries < 2) return;
  const s = nextBlank(); if (!s) return;
  s.classList.add('target');
  const t = P.tileEls.find((x) => !x.classList.contains('used') && x.dataset.ch === s.dataset.ch); if (t) t.classList.add('glow');
}
function returnTile(t) { t.classList.add('back'); t.style.transform = ''; setTimeout(() => t.classList.remove('back'), 320); }
function dropTile(d, e) {
  const t = d.t; t.classList.remove('drag');
  const blanks = P.slotEls.filter((s) => !s.classList.contains('filled') && !s.classList.contains('given'));
  let target = null;
  if (!d.moved) target = blanks[0];
  else {
    let bd = 1e9;
    for (const s of blanks) { const r = s.getBoundingClientRect(), dd = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)); if (dd < bd && dd < 72) { bd = dd; target = s; } }
  }
  if (!target) { returnTile(t); return; }
  if (target.dataset.ch === t.dataset.ch) {
    target.textContent = t.dataset.ch; target.classList.add('filled'); t.classList.add('used'); t.style.transform = '';
    Snd.drop(); burst(target.getBoundingClientRect().left + 28, target.getBoundingClientRect().top + 30, 6);
    refreshHint();
    if (!nextBlank()) {
      P.active = false; P.tileEls.forEach((x) => { if (!x.classList.contains('used')) x.classList.add('fade'); });
      const r = $('slots').getBoundingClientRect();
      win(r.left + r.width / 2, r.top + r.height / 2, P.q.word + '!');
    }
  } else {
    t.style.transform = ''; t.classList.add('back', 'shake'); setTimeout(() => t.classList.remove('back', 'shake'), 420);
    missCommon(); refreshHint();
  }
}
const tray = $('tray');
tray.addEventListener('pointerdown', (e) => {
  const t = e.target.closest('.ptile'); if (!t || !P.active || t.classList.contains('used') || P.drag) return;
  Snd.unlock(); e.preventDefault();
  try { t.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
  t.classList.remove('back', 'shake'); t.classList.add('drag');
  P.drag = { t, id: e.pointerId, x0: e.clientX, y0: e.clientY, moved: false };
});
tray.addEventListener('pointermove', (e) => {
  const d = P.drag; if (!d || e.pointerId !== d.id) return;
  const dx = e.clientX - d.x0, dy = e.clientY - d.y0; if (Math.hypot(dx, dy) > 8) d.moved = true;
  d.t.style.transform = `translate(${dx}px, ${dy}px) scale(1.12)`;
});
const endDrag = (e) => {
  const d = P.drag; if (!d || e.pointerId !== d.id) return; P.drag = null;
  if (e.type === 'pointercancel') { d.t.classList.remove('drag'); returnTile(d.t); return; }
  dropTile(d, e);
};
tray.addEventListener('pointerup', endDrag); tray.addEventListener('pointercancel', endDrag);

/* ---------------------------------------------------------------- shop */
let shopTab = 'hat';
const TAB_IC = { hat: '🎩', glasses: '🕶️', zip: '🎨', car: '🚗' };
const owned = (tab, it) => it.p === 0 || !!save.shop.owned[tab + ':' + it.id];
function renderShop() {
  $('shop-bal').textContent = TX[L].shopHave(balance());
  $('shop-tabs').innerHTML = Object.keys(TAB_IC).map((t) => `<button type="button" data-tab="${t}" aria-pressed="${t === shopTab}" aria-label="${UI[L]['tab_' + t]}">${TAB_IC[t]}</button>`).join('');
  $('shop-grid').innerHTML = SHOP[shopTab].map((it) => {
    const own = owned(shopTab, it), eq = save.shop.eq[shopTab] === it.id;
    const pic = it.hex ? `<span class="dot" style="background:${it.hex}"></span>` : `<span class="ic">${it.ic}</span>`;
    return `<button type="button" class="item${own ? ' owned' : ''}${eq ? ' eq' : ''}" data-id="${it.id}">${pic}<span>${it[L]}</span><span class="pr">${eq ? (L === 'fr' ? 'Porté' : 'On') : own ? '✓' : it.p + ' ⭐'}</span></button>`;
  }).join('');
}
function openShop() { show('shop'); renderShop(); }
$('shop-tabs').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; Snd.click(); shopTab = b.dataset.tab; renderShop(); });
$('shop-grid').addEventListener('click', (e) => {
  const b = e.target.closest('.item'); if (!b) return;
  const it = SHOP[shopTab].find((x) => x.id === b.dataset.id); if (!it) return;
  if (owned(shopTab, it)) {
    Snd.click();
    save.shop.eq[shopTab] = (shopTab === 'hat' || shopTab === 'glasses') && save.shop.eq[shopTab] === it.id ? '' : it.id;
  } else if (balance() >= it.p) {
    save.spent += it.p; save.shop.owned[shopTab + ':' + it.id] = true; save.shop.eq[shopTab] = it.id; save.st.bought++;
    Snd.good(); burst(zip.x, zip.y - 40, 22); zip.mood = 'happy'; zip.moodT = 1.6; zip.hop = 0.001; updateStars(true);
    Voice.say(TX[L].shopYay); setTimeout(() => Prog.check(), 600);
  } else {
    Snd.bad(); b.classList.remove('shake'); void b.offsetWidth; b.classList.add('shake'); Voice.say(TX[L].shopMore(it.p - balance())); return;
  }
  persist(); renderShop();
});
$('shopbtn').addEventListener('click', () => { Snd.unlock(); Snd.click(); openShop(); });
$('shop-back').addEventListener('click', () => { Snd.click(); goMenu(); });
$('stars').addEventListener('click', () => { if (S.screen === 'menu') { Snd.unlock(); Snd.click(); openShop(); } });

function renderAlbum() {
  const g = $('album-grid');
  g.innerHTML = STICKERS.map((s, i) => `<div class="tile${i < save.stickers ? '' : ' lock'}"><span>${i < save.stickers ? s : '❔'}</span></div>`).join('');
  $('album-count').textContent = TX[L].albumCount(save.stickers, STICKERS.length) + (save.stickers < STICKERS.length ? ' · ' + TX[L].next((save.stickers + 1) * STICKER_EVERY - save.stars) : ' · ' + TX[L].full);
}

/* ---------------------------------------------------------------- main loop */
let last = performance.now();
function frame(now) {
  try { tickFrame(now); } catch (err) { console.error(err); }
  requestAnimationFrame(frame);
}
/* ---------------------------------------------------------------- race */
const RACE_N = 6, RACE_GAP = 130, RACE_FIRST = 120, RACE_VIS = 120, RACE_BASE = 26, RACE_STOP = 24, RACE_END = RACE_FIRST + (RACE_N - 1) * RACE_GAP + 110;
const AI_DEF = [{ c: '#ff9a5c', e: '🦊', v: 27.5 }, { c: '#7ad7ff', e: '🐸', v: 25.2 }];
const race = { active: false, id: 0, st: 'idle', p: 0, boost: 0, lane: 1, laneX: 0, k: 0, gates: [], ai: [], cd: 0, lastCd: 99, goT: -9, wait: 0, right: 0, place: 0, finT: 0 };
function raceGeom() {
  const pr = $('prompt'), pb = pr.hidden ? H * 0.2 : pr.offsetTop + pr.offsetHeight;
  const roadW = Math.min(SW * 0.84, 360), laneW = roadW / 3, x0 = W / 2 - roadW / 2, carY = H - 128, topY = pb + 28;
  return { roadW, laneW, x0, carY, topY, scale: Math.max(2.2, (carY - topY) / RACE_VIS) };
}
function startRace() {
  S.adv = null; S.mode = 'race'; S.round = { n: 0, first: 0, stars: 0 };
  show('play'); Voice.stop(); S.qid++;
  Object.assign(race, { active: true, id: race.id + 1, st: 'count', p: 0, boost: 0, lane: 1, k: 0, gates: [], cd: 3, lastCd: 99, goT: -9, wait: 0, right: 0, place: 0, finT: 0 });
  race.ai = AI_DEF.map((d, i) => Object.assign({}, d, { p: 0, lane: i === 0 ? 0 : 2, x: 0, fin: 0, ph: Math.random() * 6 }));
  const g = raceGeom(); race.laneX = g.x0 + g.laneW * 1.5; race.ai.forEach((a) => { a.x = g.x0 + g.laneW * (a.lane + 0.5); });
  car.x = race.laneX; car.y = g.carY; car.rot = 0; car.mode = 'idle';
  raceQuestion(0, 400);
}
function raceQuestion(k, delay) {
  const q = GEN.race(save.lv.race); S.q = q; S.qid++; S.done = false; S.tries = 0;
  const colors = shuffle(BLOB_COLORS);
  race.gates[k] = { k, g: RACE_FIRST + k * RACE_GAP, q, opts: q.opts.map((o, i) => ({ val: o.val, label: o.label, say: o.say, color: colors[i % colors.length] })), res: null, lane: -1, committed: false };
  const p = $('prompt'); $('pvis').innerHTML = q.vis; $('ptext').textContent = q.text;
  p.hidden = false; p.style.animation = 'none'; void p.offsetHeight; p.style.animation = '';
  const id = race.id;
  setTimeout(() => { if (race.active && race.id === id && race.k === k) Voice.say(q.say); }, delay);
}
function raceLane(l) {
  if (!race.active || race.st === 'finish' || race.st === 'done') return;
  race.lane = clamp(l, 0, 2); Snd.click();
  const gt = race.gates[race.k]; if (gt) gt.committed = true;
}
function raceTap(x) { const G = raceGeom(); raceLane(Math.floor((x - G.x0) / G.laneW)); }
function racePass(gt) {
  gt.lane = race.lane; const o = gt.opts[race.lane], ok = o.val === gt.q.ans; gt.res = ok; race.k++; S.round.n++;
  const G = raceGeom(), x = car.x, y = G.carY - 80;
  if (ok) {
    race.boost = 1.05; race.right++; S.round.first++; S.round.stars++;
    Snd.good(); Snd.vroom(); burst(x, y, 14); floatText(x, y - 36, '+1 ⭐ 🚀'); addStars(1); Prog.answer(true);
    if (Prog.streak >= 3) setTimeout(() => floatText(x, y - 100, '🔥 ' + Prog.streak), 400);
    setTimeout(() => Snd.star(), 300); setTimeout(() => Prog.check(), 900);
    Voice.say(nameLine(pick(TX[L].praise)));
  } else {
    race.boost = -0.6; Snd.bad(); Prog.miss(); parts.push({ k: 'ring', x, y, vx: 0, vy: 0, g: 0, life: 0.4, max: 0.4, r: 20, c: '#ffd6e0' }); floatText(x, y - 36, '🐌');
    const right = gt.opts.find((z) => z.val === gt.q.ans); Voice.say(RX[L].was(right ? right.say : ''));
  }
  persist();
  if (race.k < RACE_N) raceQuestion(race.k, 1900);
}
function raceFinish() {
  race.st = 'finish'; race.finT = 0; race.place = 1 + race.ai.filter((a) => a.fin).length;
  Snd.sticker(); burst(W / 2, H * 0.42, 26);
}
function raceStep(dt) {
  if (!race.active) return;
  const G = raceGeom(), tx = G.x0 + G.laneW * (race.lane + 0.5);
  race.laneX += (tx - race.laneX) * Math.min(1, dt * 11);
  car.x = race.laneX; car.y = G.carY; car.rot = clamp((tx - race.laneX) * 0.006, -0.35, 0.35); car.mode = race.boost > 0.4 ? 'go' : 'idle';
  race.boost *= Math.exp(-dt / 2.2);
  for (const a of race.ai) { if (Math.random() < dt * 0.25) a.lane = ri(0, 2); a.x += (G.x0 + G.laneW * (a.lane + 0.5) - a.x) * Math.min(1, dt * 4); }
  if (race.st === 'count') {
    race.cd -= dt; const n = Math.max(0, Math.ceil(race.cd));
    if (n !== race.lastCd) { race.lastCd = n; if (n >= 1) Snd.click(); else { Snd.honk(); race.st = 'run'; race.goT = T; } }
    return;
  }
  const gt = race.gates[race.k];
  let v = RACE_BASE * Math.max(0.35, 1 + race.boost), blocked = false;
  if (race.st === 'run' && gt && !gt.committed && gt.g - race.p <= RACE_STOP) { blocked = true; v = 0; }
  if (race.st === 'finish') { race.finT += dt; v = RACE_BASE * Math.max(0, 1 - race.finT / 1.6); }
  if (blocked) { race.wait += dt; if (race.wait > 10) { race.wait = 0; Voice.say(S.q.say); } } else race.wait = 0;
  race.p += v * dt;
  if (!blocked) {
    const lvf = 0.9 + 0.05 * save.lv.race;
    for (const a of race.ai) { a.ph += dt; a.p += a.v * lvf * (0.92 + 0.14 * Math.sin(a.ph * 0.7)) * dt; if (!a.fin && a.p >= RACE_END) a.fin = T; }
  }
  if (race.st === 'run') {
    if (gt && race.p >= gt.g) racePass(gt);
    if (race.p >= RACE_END) raceFinish();
  } else if (race.st === 'finish' && race.finT > 2) { race.st = 'done'; afterRace(); }
}
function afterRace() {
  race.active = false;
  const place = race.place, bonus = [0, 3, 2, 1][place] || 1;
  addStars(bonus);
  const lv = save.lv.race; if (race.right >= 5 && lv < 3) save.lv.race = lv + 1; else if (race.right <= 2 && lv > 1) save.lv.race = lv - 1;
  if (place === 1) save.st.race++;
  Prog.round('race', race.right >= RACE_N); updAcc('race', race.right / RACE_N);
  persist(); renderPips();
  if (S.path) { pathStepDone(true); return; }
  const go = () => {
    show('roundend');
    $('re-title').textContent = RX[L].title[place];
    $('re-stars').innerHTML = Array.from({ length: 3 }, (_, i) => `<span style="--i:${i}">${i < 4 - place ? '⭐' : '☆'}</span>`).join('');
    $('re-text').textContent = RX[L].text(race.right, RACE_N, bonus);
    Snd.sticker(); burst(W / 2, H * 0.35, 24);
    setTimeout(() => Voice.say(RX[L].say[place]), 500); setTimeout(() => Prog.check(), 900);
  };
  if (S.pendingSticker) { S.pendingSticker = false; showSticker(go); } else go();
}
function drawAICar(x, y, col, emoji) {
  ctx.save(); ctx.translate(x, y); ctx.scale(0.82, 0.82); ctx.lineJoin = 'round';
  ctx.fillStyle = 'rgba(40,20,70,.22)'; ctx.beginPath(); ctx.ellipse(8, 12, 46, 64, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#2d2540'; ctx.strokeStyle = INK; ctx.lineWidth = 4;
  for (const sx of [-1, 1]) for (const sy of [-1, 1]) { rr(ctx, sx * 38 - 9, sy * 36 - 15, 18, 30, 6); ctx.fill(); ctx.stroke(); }
  const bg = ctx.createLinearGradient(-36, 0, 36, 0); bg.addColorStop(0, mixHex(col, 0.3, [255, 255, 255])); bg.addColorStop(0.5, col); bg.addColorStop(1, mixHex(col, 0.22, [0, 0, 40]));
  ctx.fillStyle = bg; ctx.lineWidth = 5; rr(ctx, -36, -62, 72, 124, 28); ctx.fill(); ctx.stroke();
  ctx.fillStyle = mixHex(col, 0.4, [0, 0, 40]); rr(ctx, -26, -24, 52, 58, 16); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#ffe066'; ctx.lineWidth = 3; for (const s of [-1, 1]) { ctx.beginPath(); ctx.ellipse(s * 21, -58, 8, 5, 0, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '40px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.fillStyle = '#000'; ctx.fillText(emoji, 0, 6);
  ctx.restore();
}
function drawRace() {
  const G = raceGeom(), { roadW, laneW, x0, carY, scale } = G, p = race.p, off = p * scale;
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#b4ee94'); g.addColorStop(1, '#7ed36c'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,.09)'; for (let y = -200 + (off % 200); y < H; y += 200) ctx.fillRect(0, y, W, 100);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  // roadside scenery (world-fixed so it scrolls with the car)
  const step = 38, i0 = Math.floor(p / step) - 2, i1 = Math.ceil((p + (carY + 80) / scale) / step);
  for (let i = i0; i <= i1; i++) {
    const y = carY - (i * step - p) * scale; if (y < -60 || y > H + 60) continue;
    const side = i % 2 ? 1 : -1, k = i % 3, off2 = 24 + ((i * 37) % 22);
    const x = side < 0 ? x0 - off2 : x0 + roadW + off2;
    if (k === 0) { ctx.fillStyle = '#8a5a35'; ctx.strokeStyle = INK; ctx.lineWidth = 4; rr(ctx, x - 5, y + 6, 10, 22, 3); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#3fb86a'; ctx.beginPath(); ctx.arc(x, y - 4, 20, 0, 7); ctx.fill(); ctx.stroke(); }
    else if (k === 1) { ctx.fillStyle = '#56c466'; ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, 15, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#ff8fc7'; for (const a of [0, 2, 4]) { ctx.beginPath(); ctx.arc(x + Math.cos(a) * 7, y + Math.sin(a) * 7, 3.5, 0, 7); ctx.fill(); } }
    else { ctx.font = '26px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(i % 2 ? '🌼' : '🌷', x, y); }
  }
  // road
  ctx.fillStyle = '#4f4a66'; ctx.fillRect(x0, 0, roadW, H);
  const seg = 34;
  for (let y = -seg * 2 + (off % (seg * 2)); y < H; y += seg * 2) { ctx.fillStyle = '#ff6b6b'; ctx.fillRect(x0 - 9, y, 9, seg); ctx.fillRect(x0 + roadW, y, 9, seg); ctx.fillStyle = '#fffaf0'; ctx.fillRect(x0 - 9, y + seg, 9, seg); ctx.fillRect(x0 + roadW, y + seg, 9, seg); }
  ctx.strokeStyle = INK; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x0 - 9, 0); ctx.lineTo(x0 - 9, H); ctx.moveTo(x0 + roadW + 9, 0); ctx.lineTo(x0 + roadW + 9, H); ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 5; ctx.setLineDash([34, 30]); ctx.lineDashOffset = -off % 64;
  ctx.beginPath(); for (let l = 1; l <= 2; l++) { ctx.moveTo(x0 + laneW * l, -40); ctx.lineTo(x0 + laneW * l, H + 40); } ctx.stroke(); ctx.setLineDash([]);
  // finish line
  const fy = carY - (RACE_END - p) * scale;
  if (fy > -60 && fy < H + 60) {
    const sq = 18; ctx.strokeStyle = INK; ctx.lineWidth = 3;
    for (let r = 0; r < 2; r++) for (let c = 0; c < Math.ceil(roadW / sq); c++) { ctx.fillStyle = (r + c) % 2 ? '#fffaf0' : INK; ctx.fillRect(x0 + c * sq, fy - sq + r * sq, Math.min(sq, roadW - c * sq), sq); }
    ctx.font = '40px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText('🏁', x0 - 24, fy - 12); ctx.fillText('🏁', x0 + roadW + 24, fy - 12);
  }
  // gates
  const rS = clamp(laneW * 0.33, 26, 52);
  for (const gt of race.gates) {
    if (!gt) continue;
    const y = carY - (gt.g - p) * scale; if (y < -90 || y > H + 100) continue;
    const passed = gt.res !== null;
    for (let i = 0; i < gt.opts.length; i++) {
      const o = gt.opts[i], cx = x0 + laneW * (i + 0.5), pick1 = passed ? gt.lane === i : race.lane === i && gt === race.gates[race.k];
      ctx.save(); ctx.translate(cx, y + (passed ? 0 : Math.sin(T * 3 + i) * 2)); ctx.globalAlpha = passed && !pick1 ? 0.35 : 1;
      if (pick1) { ctx.strokeStyle = passed ? (gt.res ? '#2ecf7a' : '#ff6b6b') : '#fff'; ctx.lineWidth = 8; rr(ctx, -rS * 0.95 - 5, -rS * 0.7 - 5, rS * 1.9 + 10, rS * 1.4 + 10, rS * 0.38); ctx.stroke(); }
      drawSignBody({ color: o.color, label: o.label }, rS, '');
      if (passed && pick1) { ctx.font = '30px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000'; ctx.fillText(gt.res ? '✅' : '❌', rS * 0.8, -rS * 0.7); }
      ctx.restore();
    }
  }
  // AI cars, then speed lines, then the player
  for (const a of race.ai) { const y = carY - (a.p - p) * scale; if (y > -90 && y < H + 90) drawAICar(a.x, y, a.c, a.e); }
  if (race.boost > 0.3) {
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.6, race.boost * 0.5)})`; ctx.lineWidth = 4;
    ctx.beginPath(); for (let i = 0; i < 12; i++) { const lx = x0 + ((i * 97) % roadW), ly = (T * 1100 + i * 173) % (H + 80) - 40; ctx.moveTo(lx, ly); ctx.lineTo(lx, ly + 46); } ctx.stroke();
    const fl = 26 + Math.random() * 16 + race.boost * 14; ctx.fillStyle = '#ff9a3c'; ctx.strokeStyle = INK; ctx.lineWidth = 3;
    for (const s of [-1, 1]) { ctx.beginPath(); ctx.moveTo(car.x + s * 17 - 9, carY + 54); ctx.lineTo(car.x + s * 17, carY + 54 + fl); ctx.lineTo(car.x + s * 17 + 9, carY + 54); ctx.closePath(); ctx.fill(); ctx.stroke(); }
  }
  ctx.save(); ctx.translate(car.x, car.y); ctx.scale(0.82, 0.82); ctx.translate(-car.x, -car.y); drawCar(); ctx.restore();
  // hints + countdown
  const gt = race.gates[race.k];
  if (race.st === 'run' && gt && !gt.committed && race.wait > 2.5) {
    ctx.font = `700 24px Fredoka, 'Arial Rounded MT Bold', sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 6; ctx.strokeStyle = INK; ctx.fillStyle = '#fff';
    const ty = carY - 74 + Math.sin(T * 5) * 4; ctx.strokeText(RX[L].tap, W / 2, ty); ctx.fillText(RX[L].tap, W / 2, ty);
  }
  let big = '';
  if (race.st === 'count') big = String(Math.max(1, Math.ceil(race.cd))); else if (T - race.goT < 0.9) big = 'GO!';
  if (big) {
    const ph = race.st === 'count' ? (1 - (race.cd % 1 || 1)) : (T - race.goT) / 0.9, s = 1 + (1 - Math.min(1, ph * 3)) * 0.5;
    ctx.save(); ctx.translate(W / 2, H * 0.5); ctx.scale(s, s); ctx.font = `700 130px Fredoka, 'Arial Rounded MT Bold', sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.lineWidth = 16; ctx.strokeStyle = INK; ctx.fillStyle = big === 'GO!' ? '#46d9a6' : '#ffc93c'; ctx.strokeText(big, 0, 0); ctx.fillText(big, 0, 0); ctx.restore();
  }
  // progress bar
  const bx0 = SX + 52, bx1 = SX + SW - 52, by = H - 34, frac = (v) => bx0 + (bx1 - bx0) * Math.min(1, v / RACE_END);
  ctx.lineWidth = 14; ctx.strokeStyle = INK; ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx1, by); ctx.stroke();
  ctx.lineWidth = 7; ctx.strokeStyle = '#fffaf0'; ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx1, by); ctx.stroke();
  for (const a of race.ai) { ctx.fillStyle = a.c; ctx.strokeStyle = INK; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(frac(a.p), by, 11, 0, 7); ctx.fill(); ctx.stroke(); }
  ctx.fillStyle = carCols().m; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(frac(p), by, 14, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#fff'; starPath(ctx, frac(p), by, 8, 3.6); ctx.fill();
  ctx.font = '30px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#000';
  ctx.fillText('🏁', bx1 + 26, by); const rank = 1 + race.ai.filter((a) => a.p > p).length; ctx.fillText(['🥇', '🥈', '🥉'][rank - 1], bx0 - 26, by);
}

/* ---------------------------------------------------------------- paint */
const pcv = $('pcv'), pctx = pcv.getContext('2d');
const PAINT = { color: '#ff5a5f', tool: 'brush', size: 1, stamp: '⭐', strokes: 0, hist: [], down: false, lx: 0, ly: 0, hue: 0, dist: 0, cw: 0, ch: 0 };
const PCOLORS = ['#ff5a5f', '#ff9a3c', '#ffd93d', '#4cd37b', '#4cb5ff', '#a77bff', '#3a2358'];
const PSTAMPS = ['⭐', '🐱', '🦄', '❤️', '🚗', '🌸'], PBRUSH = [6, 14, 28], PSTAMPSZ = [44, 72, 110];
(function buildPaintUI() {
  $('p-colors').innerHTML = PCOLORS.map((c) => `<button type="button" class="pc" data-c="${c}" style="background:${c}" aria-label="${c}"></button>`).join('') +
    '<button type="button" class="pc rb" data-t="rainbow" aria-label="rainbow"></button>';
  $('p-tools').innerHTML = PBRUSH.map((s, i) => `<button type="button" class="ps" data-s="${i}" aria-label="size ${i + 1}"><i style="width:${8 + i * 7}px;height:${8 + i * 7}px"></i></button>`).join('') +
    PSTAMPS.map((e) => `<button type="button" class="pst" data-st="${e}">${e}</button>`).join('');
})();
function paintSync() {
  $('p-erase').setAttribute('aria-pressed', String(PAINT.tool === 'eraser'));
  document.querySelectorAll('#p-colors .pc').forEach((b) => b.setAttribute('aria-pressed', String(PAINT.tool === 'brush' ? b.dataset.c === PAINT.color : PAINT.tool === b.dataset.t)));
  document.querySelectorAll('#p-tools .ps').forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.s === PAINT.size)));
  document.querySelectorAll('#p-tools .pst').forEach((b) => b.setAttribute('aria-pressed', String(PAINT.tool === 'stamp' && b.dataset.st === PAINT.stamp)));
}
function sizePaint() {
  const w = $('paint-wrap'), r = w.getBoundingClientRect(); if (r.width < 10) return;
  const d = Math.min(window.devicePixelRatio || 1, 2), cw = Math.round(r.width * d), ch = Math.round(r.height * d);
  if (cw === pcv.width && ch === pcv.height) return;
  const tmp = document.createElement('canvas'); tmp.width = pcv.width; tmp.height = pcv.height; if (pcv.width) tmp.getContext('2d').drawImage(pcv, 0, 0);
  pcv.width = cw; pcv.height = ch; pctx.setTransform(d, 0, 0, d, 0, 0); pctx.fillStyle = '#fff'; pctx.fillRect(0, 0, r.width, r.height);
  if (tmp.width) pctx.drawImage(tmp, 0, 0, tmp.width / d, tmp.height / d);
  PAINT.hist = [];
}
function openPaint() {
  show('paint'); PAINT.strokes = 0; PAINT.hist = []; paintSync();
  requestAnimationFrame(() => { sizePaint(); if (!PAINT.cleared) { pctx.fillStyle = '#fff'; pctx.fillRect(0, 0, pcv.width, pcv.height); PAINT.cleared = true; } });
  Voice.say(L === 'fr' ? `Dessine !` : `Draw!`);
}
function pushHist() { try { PAINT.hist.push(pctx.getImageData(0, 0, pcv.width, pcv.height)); if (PAINT.hist.length > 10) PAINT.hist.shift(); } catch (e) { /* ignore */ } }
function pPos(e) { const r = pcv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
function stampAt(x, y) { pctx.font = PSTAMPSZ[PAINT.size] + 'px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; pctx.textAlign = 'center'; pctx.textBaseline = 'middle'; pctx.fillStyle = '#000'; pctx.fillText(PAINT.stamp, x, y); Snd.pop(); }
function brushStyle() { pctx.lineCap = 'round'; pctx.lineJoin = 'round'; pctx.lineWidth = PBRUSH[PAINT.size] * (PAINT.tool === 'eraser' ? 1.8 : 1); pctx.strokeStyle = pctx.fillStyle = PAINT.tool === 'eraser' ? '#fff' : PAINT.tool === 'rainbow' ? `hsl(${PAINT.hue % 360},90%,58%)` : PAINT.color; }
pcv.addEventListener('pointerdown', (e) => {
  Snd.unlock(); e.preventDefault(); try { pcv.setPointerCapture(e.pointerId); } catch (er) { /* ignore */ }
  pushHist(); PAINT.down = true; PAINT.strokes++; PAINT.dist = 0; [PAINT.lx, PAINT.ly] = pPos(e);
  if (PAINT.tool === 'stamp') stampAt(PAINT.lx, PAINT.ly); else { brushStyle(); pctx.beginPath(); pctx.arc(PAINT.lx, PAINT.ly, pctx.lineWidth / 2, 0, 7); pctx.fill(); }
});
pcv.addEventListener('pointermove', (e) => {
  if (!PAINT.down) return; e.preventDefault();
  const [x, y] = pPos(e), d = Math.hypot(x - PAINT.lx, y - PAINT.ly);
  if (PAINT.tool === 'stamp') { PAINT.dist += d; if (PAINT.dist > PSTAMPSZ[PAINT.size] * 0.9) { PAINT.dist = 0; stampAt(x, y); } PAINT.lx = x; PAINT.ly = y; return; }
  PAINT.hue += d * 0.8; brushStyle(); pctx.beginPath(); pctx.moveTo(PAINT.lx, PAINT.ly); pctx.lineTo(x, y); pctx.stroke(); PAINT.lx = x; PAINT.ly = y;
});
['pointerup', 'pointercancel'].forEach((ev) => pcv.addEventListener(ev, () => { PAINT.down = false; }));
$('p-colors').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return; Snd.click();
  if (b.dataset.c) { PAINT.color = b.dataset.c; PAINT.tool = 'brush'; } else PAINT.tool = b.dataset.t; paintSync();
});
$('p-tools').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return; Snd.click();
  if (b.dataset.s != null) PAINT.size = +b.dataset.s; else { PAINT.stamp = b.dataset.st; PAINT.tool = 'stamp'; } paintSync();
});
$('p-erase').addEventListener('click', () => { Snd.click(); PAINT.tool = PAINT.tool === 'eraser' ? 'brush' : 'eraser'; paintSync(); });
$('p-undo').addEventListener('click', () => { Snd.click(); const h = PAINT.hist.pop(); if (h) pctx.putImageData(h, 0, 0); });
$('p-clear').addEventListener('click', () => { Snd.click(); pushHist(); pctx.save(); pctx.setTransform(1, 0, 0, 1, 0, 0); pctx.fillStyle = '#fff'; pctx.fillRect(0, 0, pcv.width, pcv.height); pctx.restore(); });
$('p-save').addEventListener('click', () => {
  Snd.click();
  pcv.toBlob(async (blob) => {
    if (!blob) return;
    try {
      const file = new File([blob], 'zip-dessin.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file] }); return; }
    } catch (er) { if (er && er.name === 'AbortError') return; }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'zip-dessin.png'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }, 'image/png');
});
function leavePaint() {
  if (PAINT.strokes >= 8) { save.st.art++; addStars(2); Prog.toast('🎨', L === 'fr' ? `Beau dessin !` : `Nice drawing!`, '+2 ⭐'); persist(); setTimeout(() => Prog.check(), 600); }
  PAINT.strokes = 0; goMenu();
}
$('p-back').addEventListener('click', () => { Snd.click(); leavePaint(); });
$('paintbtn').addEventListener('click', () => { Snd.unlock(); Snd.click(); openPaint(); });

/* ---------------------------------------------------------------- stories */
const STORY = { idx: 0, page: 0, tk: 0, qi: 0, tries: 0, order: [], got: 0 };
const noEmoji = (s) => s.replace(/[\p{Extended_Pictographic}️‍]/gu, '').replace(/\s+/g, ' ').trim();
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
function storyView(v) { STORY.view = v; $('story-list').hidden = v !== 'list'; $('story-read').hidden = v !== 'read'; $('story-quiz').hidden = v !== 'quiz'; $('story-end').hidden = v !== 'end'; }
function openStories() { show('story'); storyList(); Voice.say(L === 'fr' ? 'Quelle histoire veux-tu lire ?' : 'Which story do you want to read?'); }
function storyList() {
  STORY.tk++; storyView('list');
  $('story-cards').innerHTML = STORIES.map((s, i) => `<button type="button" class="scard" data-i="${i}"><span class="se">${s.e}</span><b>${s.title[L]}</b>${save.st.mode['s_' + s.id] ? '<i class="ok">✓</i>' : ''}</button>`).join('');
}
function storyStart(i) { STORY.idx = i; STORY.page = 0; STORY.got = 0; storyView('read'); storyPage(); }
function storyPage() {
  const s = STORIES[STORY.idx], pg = s.pages[STORY.page], last = STORY.page === s.pages.length - 1;
  const sc = $('story-scene'); sc.className = 'sc-' + s.bg;
  sc.innerHTML = pg.it.map(([e, x, y, sz, an], i) => `<span class="sw" style="left:${x}%;top:${y}%"><span class="si" style="font-size:${sz}px;--an:${an || 'none'};--d:${(i * 0.14).toFixed(2)}s">${e}</span></span>`).join('');
  $('story-text').innerHTML = pg[L].split(' ').map((w) => `<span class="w">${esc(w)}</span>`).join(' ');
  $('story-dots').innerHTML = s.pages.map((_, i) => `<i class="${i === STORY.page ? 'on' : i < STORY.page ? 'seen' : ''}"></i>`).join('');
  $('sp-prev').style.visibility = STORY.page ? 'visible' : 'hidden';
  $('sp-next').textContent = last ? '❓' : '▶'; $('sp-next').classList.toggle('pulse', last);
  Snd.whoosh(); setTimeout(narrate, 450);
}
function narrate() {
  if (S.screen !== 'story' || STORY.view !== 'read') return;
  const tk = ++STORY.tk, ws = [...document.querySelectorAll('#story-text .w')]; if (!ws.length) return;
  const text = STORIES[STORY.idx].pages[STORY.page][L], words = text.split(' ');
  const starts = []; { let p = 0; for (const w of words) { starts.push(p); p += w.length + 1; } }
  const light = (i) => ws.forEach((w, j) => w.classList.toggle('on', j === i));
  let gotB = false, timerOn = false, i = 0;
  const live = () => tk === STORY.tk;
  const step = (fast) => {
    if (!live() || gotB) return;
    light(i); if (i >= ws.length) return;
    const len = ws[i].textContent.length; i++; setTimeout(() => step(fast), fast ? 100 + 46 * len : 230 + 62 * len);
  };
  const startTimer = (fast) => { if (timerOn) return; timerOn = true; step(fast); };
  if (!Voice.ok || !Snd.voiceOn) { startTimer(false); return; }
  Voice.say(text, () => { if (live()) light(-1); }, {
    onstart: () => startTimer(true),
    onboundary: (ci) => { if (!live()) return; gotB = true; let k = 0; while (k + 1 < starts.length && starts[k + 1] <= ci) k++; light(k); }
  });
  setTimeout(() => startTimer(true), 1500);
}
function storyQuiz(qi) {
  STORY.tk++; STORY.qi = qi; STORY.tries = 0; storyView('quiz');
  const q = STORIES[STORY.idx].q[qi][L];
  STORY.order = shuffle(q.o.map((_, i) => i));
  $('sq-text').textContent = q.q; $('sq-n').textContent = (qi + 1) + ' / ' + STORIES[STORY.idx].q.length;
  $('sq-opts').innerHTML = STORY.order.map((i) => `<button type="button" class="sq" data-i="${i}">${q.o[i]}</button>`).join('');
  setTimeout(() => Voice.say(q.q + ' ' + q.o.map(noEmoji).join(L === 'fr' ? ', ou ' : ', or ')), 300);
}
function storyAnswer(b) {
  const s = STORIES[STORY.idx], q = s.q[STORY.qi][L], i = +b.dataset.i;
  if (i === q.a) {
    const first = STORY.tries === 0; STORY.got += first ? 1 : 0;
    document.querySelectorAll('#sq-opts .sq').forEach((x) => { x.disabled = true; if (x !== b) x.classList.add('dim'); }); b.classList.add('yes');
    Snd.good(); const r = b.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, 16); floatText(r.left + r.width / 2, r.top - 20, '+' + (first ? 2 : 1) + ' ⭐');
    addStars(first ? 2 : 1); Prog.answer(first); persist(); setTimeout(() => Prog.check(), 900);
    Voice.say(nameLine(pick(TX[L].praise)));
    const tk = STORY.idx + ':' + STORY.qi; STORY.cur = tk;
    setTimeout(() => { if (S.screen !== 'story' || STORY.cur !== tk) return; if (STORY.qi + 1 < s.q.length) storyQuiz(STORY.qi + 1); else storyFinish(); }, 2000);
  } else {
    STORY.tries++; Snd.bad(); Prog.miss(); b.disabled = true; b.classList.add('no'); Voice.say(pick(TX[L].again));
    if (STORY.tries >= 2) document.querySelectorAll('#sq-opts .sq').forEach((x) => { if (+x.dataset.i === q.a) x.classList.add('hint'); });
  }
}
function storyFinish() {
  const s = STORIES[STORY.idx]; save.st.stories++; save.st.mode['s_' + s.id] = (save.st.mode['s_' + s.id] | 0) + 1; Prog.round('story', STORY.got === s.q.length); updAcc('story', STORY.got / s.q.length); persist();
  if (S.path) { pathStepDone(true); return; }
  const after = () => {
    show('story'); storyView('end');
    $('se-title').textContent = L === 'fr' ? `Bravo !` : `Well done!`; $('se-emoji').textContent = s.e;
    Snd.sticker(); burst(W / 2, H * 0.35, 24); setTimeout(() => Voice.say(L === 'fr' ? `Bravo ! Tu as lu toute l'histoire !` : `Well done! You finished the whole story!`), 400);
    setTimeout(() => Prog.check(), 900);
  };
  if (S.pendingSticker) { S.pendingSticker = false; showSticker(after); } else after();
}
$('story-cards').addEventListener('click', (e) => { const b = e.target.closest('.scard'); if (b) { Snd.unlock(); Snd.click(); storyStart(+b.dataset.i); } });
$('sp-next').addEventListener('click', () => { Snd.click(); const s = STORIES[STORY.idx]; if (STORY.page < s.pages.length - 1) { STORY.page++; storyPage(); } else { Voice.stop(); storyQuiz(0); } });
$('sp-prev').addEventListener('click', () => { Snd.click(); if (STORY.page) { STORY.page--; storyPage(); } });
$('sp-listen').addEventListener('click', () => { Snd.unlock(); Snd.click(); narrate(); });
$('story-text').addEventListener('click', (e) => { const w = e.target.closest('.w'); if (!w) return; STORY.tk++; document.querySelectorAll('#story-text .w.on').forEach((x) => x.classList.remove('on')); w.classList.add('on'); Voice.say(w.textContent); setTimeout(() => w.classList.remove('on'), 900); });
$('sq-opts').addEventListener('click', (e) => { const b = e.target.closest('.sq'); if (b && !b.disabled) storyAnswer(b); });
$('sq-listen').addEventListener('click', () => { Snd.click(); const q = STORIES[STORY.idx].q[STORY.qi][L]; Voice.say(q.q + ' ' + q.o.map(noEmoji).join(L === 'fr' ? ', ou ' : ', or ')); });
$('sr-back').addEventListener('click', () => { Snd.click(); storyList(); });
$('sl-back').addEventListener('click', () => { Snd.click(); STORY.tk++; goMenu(); });
$('se-again').addEventListener('click', () => { Snd.click(); storyStart(STORY.idx); });
$('se-more').addEventListener('click', () => { Snd.click(); storyList(); });
$('storiesbtn').addEventListener('click', () => { Snd.unlock(); Snd.click(); openStories(); });

/* ---------------------------------------------------------------- categories + play path */
const PATH_Q = 4;
function tileHtml(m, i) {
  const md = MODE_META[m];
  return `<button class="mode ${md.cls || ''}" data-mode="${m}" style="--i:${i};${md.bg ? 'background:' + md.bg + ';' : ''}" type="button"><span class="ico"${md.ico.length > 2 && !/\p{Extended_Pictographic}/u.test(md.ico) ? ' style="font-size:19px"' : ''}>${md.ico}</span><span class="nm" data-i18n="m_${m}">${UI[L]['m_' + m]}</span><span class="pips"></span></button>`;
}
function openCat(cat) {
  S.cat = cat; show('cat');
  const t = $('cat-title'); t.dataset.i18n = 'cat_' + cat; t.textContent = UI[L]['cat_' + cat];
  $('catgrid').innerHTML = CAT_ORDER[cat].map(tileHtml).join(''); renderPips();
}
$('catgrid').addEventListener('click', (e) => { const b = e.target.closest('.mode'); if (!b) return; Snd.unlock(); Snd.click(); S.fromCat = S.cat; startMode(b.dataset.mode); });
document.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => { Snd.unlock(); Snd.click(); openCat(b.dataset.cat); }));
$('cat-back').addEventListener('click', () => { Snd.click(); S.fromCat = null; goMenu(); });

const dayKeyNow = () => { const d = new Date(), t = (n) => String(n).padStart(2, '0'); return d.getFullYear() + '-' + t(d.getMonth() + 1) + '-' + t(d.getDate()); };
function updAcc(m, x) { const o = save.acc[m]; save.acc[m] = o == null ? x : o * 0.6 + x * 0.4; }
function unreadStory() { return STORIES.some((s) => !save.st.mode['s_' + s.id]); }
function wPick(cands, used) {
  const pool = cands.filter((m) => !used.has(m));
  const ws = pool.map((m) => { if (m === 'story') return unreadStory() ? 1.6 : 0.3; const a = save.acc[m]; return 0.5 + (a == null ? 1.2 : (1 - a) * 3) + ((save.st.mode[m] | 0) === 0 ? 1.5 : 0); });
  let r = Math.random() * ws.reduce((x, y) => x + y, 0);
  for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
}
function genPath() {
  const used = new Set(), steps = [];
  for (const k of ['math', 'read', 'math', 'read', 'fun']) { const m = wPick(k === 'fun' ? ['drive', 'race', 'colors', 'geo', 'hunt', 'planets', 'story'] : CAT_ORDER[k], used); used.add(m); steps.push(m); }
  return steps;
}
function ensurePath(force) {
  const d = dayKeyNow();
  if (force || !save.path || save.path.d !== d || !save.path.steps.every((m) => MODE_META[m])) save.path = { d, steps: genPath(), idx: 0 };
  return save.path;
}
function updatePlayBtn() {
  const el = $('play-sub'); if (!el) return;
  const P = save.path && save.path.d === dayKeyNow() ? save.path : null;
  el.textContent = P ? PX[L].sub(P.idx, P.steps.length) : UI[L].play_sub;
}
function renderPath(view, fresh) {
  S.pathView = view; const P = save.path, m = P.steps[P.idx], done = view === 'done';
  $('path-title').textContent = done ? PX[L].doneT : UI[L].path_title;
  $('path-steps').innerHTML = P.steps.map((x, i) => `<span class="pstep ${i < P.idx ? 'done' : i === P.idx && !done ? 'cur' : ''}">${i < P.idx ? '✓' : `<span style="font-size:${MODE_META[x].ico.length > 2 && !/\p{Extended_Pictographic}/u.test(MODE_META[x].ico) ? 12 : 22}px">${MODE_META[x].ico}</span>`}</span>`).join('');
  let say;
  if (done) { $('path-ico').textContent = '🎉'; $('path-name').textContent = UI[L].path_title; $('path-desc').textContent = ''; say = PX[L].done; $('path-say').textContent = say; $('path-go').textContent = UI[L].path_more; }
  else {
    const md = MODE_META[m]; $('path-ico').textContent = md.ico; $('path-name').textContent = UI[L]['m_' + m]; $('path-desc').textContent = md.d[L];
    say = PX[L].step(P.idx + 1, P.steps.length, UI[L]['m_' + m], md.d[L]); $('path-say').textContent = (fresh ? pick(PX[L].nice) + ' ! ' : '') + `${P.idx + 1} / ${P.steps.length}`; $('path-go').textContent = UI[L].go;
  }
  return (fresh && !done ? pick(PX[L].nice) + ' ! ' : '') + say;
}
function openPath() {
  const P = ensurePath(); S.fromCat = null; S.path = null; show('path');
  const say = renderPath(P.idx >= P.steps.length ? 'done' : 'step', false); Voice.say(say);
}
function startPathStep() {
  const P = save.path, m = P.steps[P.idx]; S.adv = null; Voice.stop();
  S.path = { idx: P.idx, n: PATH_Q, q: 0 };
  if (m === 'story') { openStories(); return; }
  if (m === 'race') { startRace(); return; }
  S.mode = m; S.round = { n: 0, first: 0, stars: 0 }; zip.aimTo = -Math.PI / 2; show('play'); newQuestion();
}
function pathStepDone(skip) {
  const P = save.path; if (!S.path || !P) return;
  const m = P.steps[P.idx], r = S.round || { first: 0 };
  if (!skip) {
    const lv = save.lv[m];
    if (r.first >= S.path.n && lv < 3) save.lv[m] = lv + 1; else if (r.first <= 1 && lv > 1) save.lv[m] = lv - 1;
    updAcc(m, r.first / S.path.n); Prog.round(m, r.first >= S.path.n);
  }
  P.idx++; S.path = null; addStars(2);
  const complete = P.idx >= P.steps.length; if (complete) { save.st.paths++; addStars(6); }
  persist(); renderPips(); Prog.check();
  gate(() => {
    show('path'); const say = renderPath(complete ? 'done' : 'step', true);
    Snd.sticker(); burst(W / 2, H * 0.3, complete ? 34 : 18); setTimeout(() => Voice.say(say), 400);
  });
}
$('playbtn').addEventListener('click', () => { Snd.unlock(); Snd.click(); openPath(); });
$('path-go').addEventListener('click', () => { Snd.click(); gate(() => { if (S.pathView === 'done') { ensurePath(true); const say = renderPath('step', false); Voice.say(say); } else startPathStep(); }); });
$('path-back').addEventListener('click', () => { Snd.click(); goMenu(); });

/* ---------------------------------------------------------------- settings */
function profLabel(p, i) { return p.name || UI[L].pl_player + ' ' + (i + 1); }
function renderProfs(el) {
  el.innerHTML = '';
  prof.list.forEach((p, i) => {
    const b = document.createElement('button'); b.type = 'button'; b.className = 'pchip'; b.textContent = profLabel(p, i); b.setAttribute('aria-pressed', String(p.id === prof.act));
    b.addEventListener('click', () => { Snd.unlock(); Snd.click(); if (p.id !== prof.act) switchProfile(p.id); });
    el.appendChild(b);
  });
}
function renderWho() { renderProfs($('who-profs')); $('who-name').hidden = !!meProf().name; $('who-name').value = ''; $('who-add').hidden = prof.list.length >= 6; }
function switchProfile(id) { persist(); noPersist = true; prof.act = id; saveIdx(); location.reload(); }
function addProfile() {
  if (prof.list.length >= 6) return;
  persist(); noPersist = true;
  const id = 'p' + Date.now().toString(36); prof.list.push({ id, name: '' }); prof.act = id; saveIdx();
  location.reload();
}
function resetProgress() {
  noPersist = true;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ lang: save.lang, name: save.name, music: save.music, voice: save.voice })); } catch (e) { /* ignore */ }
  location.reload();
}
function deleteProfile() {
  noPersist = true;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) { /* ignore */ }
  prof.list.splice(prof.list.findIndex((p) => p.id === prof.act), 1); prof.act = prof.list[0].id; saveIdx();
  location.reload();
}
function disarm(btn) { btn.dataset.arm = ''; btn.classList.remove('armed'); const lab = btn.querySelector('span:nth-child(2)'); lab.setAttribute('data-i18n', btn.dataset.key); lab.textContent = UI[L][btn.dataset.key]; }
function armed(btn, action) {
  btn.addEventListener('click', () => {
    Snd.unlock(); Snd.click();
    if (btn.dataset.arm === '1') { action(); return; }
    const lab = btn.querySelector('span:nth-child(2)'); btn.dataset.key = lab.dataset.i18n; btn.dataset.arm = '1'; btn.classList.add('armed');
    lab.removeAttribute('data-i18n'); lab.textContent = UI[L].sure;
    clearTimeout(btn._t); btn._t = setTimeout(() => disarm(btn), 4000);
  });
}
function renderSettings() {
  if (document.activeElement !== $('st-name')) $('st-name').value = save.name;
  renderProfs($('st-profs')); $('st-del').hidden = prof.list.length < 2; $('st-add').hidden = prof.list.length >= 6;
  $('st-warn').textContent = storageOK ? '' : UI[L].nostore;
  $('st-music').setAttribute('aria-pressed', String(Snd.on)); $('st-voice').setAttribute('aria-pressed', String(Snd.voiceOn));
  $('st-ver').textContent = UI[L].ver + ' ' + APP_VERSION;
}
function openSettings() { show('settings'); $('st-status').textContent = ''; renderSettings(); }
async function checkUpdate() {
  const el = $('st-status'), btn = $('st-update'); el.textContent = UI[L].upd_checking; btn.disabled = true;
  try {
    if (!/^https?:/.test(location.protocol)) { el.textContent = UI[L].upd_na; return; }
    const r = await fetch('index.html?nocache=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('http ' + r.status);
    const m = (await r.text()).match(/APP_VERSION = '([^']+)'/);
    if (!m) throw new Error('no version');
    if (m[1] !== APP_VERSION) {
      el.textContent = UI[L].upd_new;
      try { if ('serviceWorker' in navigator) { const reg = await navigator.serviceWorker.getRegistration(); if (reg) await reg.update(); } if (window.caches) { const ks = await caches.keys(); await Promise.all(ks.map((k) => caches.delete(k))); } } catch (e) { /* ignore */ }
      setTimeout(() => location.reload(), 900);
    } else el.textContent = UI[L].upd_ok;
  } catch (e) { el.textContent = UI[L].upd_fail; } finally { btn.disabled = false; }
}
$('gear').addEventListener('click', () => { Snd.unlock(); Snd.click(); openSettings(); });
$('st-music').addEventListener('click', () => { Snd.unlock(); Snd.setMusic(!Snd.on); Snd.click(); renderSettings(); sndSync(); });
$('st-voice').addEventListener('click', () => { Snd.unlock(); const on = !Snd.voiceOn; Snd.setVoice(on); if (!on) Voice.stop(); Snd.click(); renderSettings(); sndSync(); if (on) Voice.say(L === 'fr' ? 'Salut !' : 'Hi!'); });
$('st-update').addEventListener('click', () => { Snd.click(); checkUpdate(); });
$('st-claude').addEventListener('click', () => { Snd.unlock(); Snd.click(); if (!Snd.voiceOn) { Snd.setVoice(true); renderSettings(); sndSync(); } Voice.say(UI[L].claude_say); });
$('st-name').addEventListener('input', (e) => { setName(e.target.value.replace(/[<>&"]/g, '').trim().slice(0, 12)); renderProfs($('st-profs')); renderWho(); });
$('st-name').addEventListener('blur', () => { setName(save.name); });
$('st-name').addEventListener('keydown', (e) => { if (e.key === 'Enter') e.target.blur(); });
$('st-name').addEventListener('change', () => { if (save.name) Voice.say(UI[L].hi_name(save.name)); });
$('st-add').addEventListener('click', () => { Snd.unlock(); Snd.click(); addProfile(); });
$('who-add').addEventListener('click', () => { Snd.unlock(); Snd.click(); addProfile(); });
$('who-name').addEventListener('input', (e) => { setName(e.target.value.replace(/[<>&"]/g, '').trim().slice(0, 12)); renderProfs($('who-profs')); });
armed($('st-reset'), resetProgress); armed($('st-del'), deleteProfile);
$('st-back').addEventListener('click', () => { Snd.click(); goMenu(); });

function tickFrame(now) {
  const dt = Math.min(0.05, (now - last) / 1000); last = now; T += dt;
  drawBackground(dt);
  // Zip animation
  zip.recoil *= Math.pow(0.0005, dt); zip.sq *= Math.pow(0.002, dt);
  if (S.screen === 'splash' || S.screen === 'menu') zip.aimTo = -Math.PI / 2 + Math.sin(T * 0.8) * 0.5;
  zip.aim += (zip.aimTo - zip.aim) * Math.min(1, dt * 16);
  if (zip.moodT > 0) { zip.moodT -= dt; if (zip.moodT <= 0) zip.mood = 'idle'; }
  if (zip.hop > 0) { zip.hop += dt * 1.6; if (zip.hop >= 2) zip.hop = 0; }
  zip.nextBlink -= dt; if (zip.nextBlink <= 0) { zip.blink = 0.12; zip.nextBlink = 2 + Math.random() * 3; } if (zip.blink > 0) zip.blink -= dt;
  const kind = kindNow();
  if (kind === 'race') { raceStep(dt); drawRace(); drawParts(dt); return; }
  if (S.screen === 'play') {
    if (kind === 'drive') drawRoads();
    for (const b of blobs) drawBlob(b);
    if (kind === 'drive') carStep();
    if (kind === 'shoot' && bubble) {
      bubble.p += dt / 0.42;
      if (bubble.p >= 1) { const b = bubble.blob; bubble = null; bubbleHit(b); }
    }
    S.idle += S.canTap ? dt : 0;
    if (S.canTap && S.idle > 12 && !S.nudged) { S.nudged = true; Voice.say(S.q.say); blobs.forEach((b) => { if (b.state === 'idle') { b.state = 'shake'; b.t0 = T + 0; } }); }
  }
  if (kind === 'drive') drawCar(); else drawZip();
  drawBubble(); drawFriend(); drawParts(dt);
}

document.addEventListener('keydown', (e) => { if (S.screen === 'play' && S.mode === 'race') { if (e.key === 'ArrowLeft') raceLane(race.lane - 1); else if (e.key === 'ArrowRight') raceLane(race.lane + 1); else if (e.key === ' ' || e.key === 'Enter') raceLane(race.lane); } });
/* ---------------------------------------------------------------- input */
cv.addEventListener('pointerdown', (e) => {
  Snd.unlock();
  if (S.screen === 'play' && S.mode === 'race') { raceTap(e.clientX); return; }
  if (S.screen !== 'play' || !S.canTap) return;
  S.idle = 0;
  let best = null, bd = 1e9;
  for (const b of blobs) {
    if (b.state === 'in' || b.state === 'gone' || b.state === 'out') continue;
    const x = b.cx != null ? b.cx : b.bx, y = b.cy != null ? b.cy : b.by, d = Math.hypot(e.clientX - x, e.clientY - y);
    if (d < b.r * 1.25 && d < bd) { best = b; bd = d; }
  }
  if (best) fire(best);
});
$('start').addEventListener('click', () => {
  Snd.unlock(); Snd.click(); show('menu'); renderPips();
  if (!S.greeted) { S.greeted = true; Voice.say(TX[L].hello); if (!Voice.ok) setTimeout(() => Voice.warn(), 800); }
});
document.querySelectorAll('.mode').forEach((m) => m.addEventListener('click', () => { Snd.unlock(); Snd.click(); startMode(m.dataset.mode); }));
$('home').addEventListener('click', () => { Snd.click(); goMenu(); });
$('speak').addEventListener('click', () => { Snd.unlock(); if (S.q) Voice.say(S.q.say); });
const sndSync = () => {
  $('music').classList.toggle('off', !Snd.on && !Snd.voiceOn); $('music').setAttribute('aria-expanded', String(!$('soundpop').hidden));
  $('sp-music').setAttribute('aria-pressed', String(Snd.on)); $('sp-voice').setAttribute('aria-pressed', String(Snd.voiceOn));
};
let sndTimer = 0;
const sndPop = (open) => { $('soundpop').hidden = !open; sndSync(); clearTimeout(sndTimer); if (open) sndTimer = setTimeout(() => sndPop(false), 6000); };
$('music').addEventListener('click', () => { Snd.unlock(); sndPop($('soundpop').hidden); });
$('sp-music').addEventListener('click', () => { Snd.unlock(); Snd.setMusic(!Snd.on); sndPop(true); Snd.click(); });
$('sp-voice').addEventListener('click', () => { Snd.unlock(); const on = !Snd.voiceOn; Snd.setVoice(on); if (!on) Voice.stop(); sndPop(true); Snd.click(); if (on) Voice.say(L === 'fr' ? 'Salut !' : 'Hi!'); });
document.addEventListener('pointerdown', (e) => { if (!$('soundpop').hidden && !e.target.closest('#soundpop') && !e.target.closest('#music')) sndPop(false); }, true);
document.querySelectorAll('.lang button').forEach((b) => b.addEventListener('click', () => {
  Snd.unlock(); if (L === b.dataset.l) return;
  L = b.dataset.l; save.lang = L; persist(); applyLang(); Snd.click();
  if (S.screen === 'play') newQuestion(true);
  else if (S.screen === 'menu' || S.screen === 'splash') Voice.say(TX[L].hello);
}));
$('re-again').addEventListener('click', () => { Snd.click(); gate(() => startMode(S.mode)); });
$('re-menu').addEventListener('click', () => { Snd.click(); gate(goMenu); });
$('st-ok').addEventListener('click', () => { Snd.click(); Voice.stop(); const f = S.stNext || proceed; S.stNext = null; f(); });
$('advbtn').addEventListener('click', () => { Snd.unlock(); Snd.click(); openAdv(); });
$('adv-go').addEventListener('click', () => { Snd.click(); gate(advNext); });
$('adv-back').addEventListener('click', () => { Snd.click(); goMenu(); });
$('trbtn').addEventListener('click', () => { Snd.click(); show('trophy'); Prog.render(); });
$('tr-back').addEventListener('click', () => { Snd.click(); goMenu(); });
$('albumbtn').addEventListener('click', () => { Snd.click(); show('album'); renderAlbum(); });
$('al-back').addEventListener('click', () => { Snd.click(); goMenu(); });
['pointerdown', 'touchend'].forEach((ev) => document.addEventListener(ev, () => Snd.unlock(), { passive: true }));
document.addEventListener('visibilitychange', () => { Snd.suspend(document.hidden); if (document.hidden) Voice.stop(); });
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 200));

sndSync();
applyLang(); show('splash'); resize(); Prog.updateBtn(); renderWho();
if (!meProf().name) setTimeout(() => { try { $('who-name').focus(); } catch (e) { /* ignore */ } }, 400);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { /* canvas text uses Fredoka once loaded */ });
requestAnimationFrame(frame);
window.__GLOOPS = { S, save, blobs: () => blobs, fire, GEN, newQuestion, startMode, T: () => T, P, car, SHOP, openShop, Prog, openAdv, advNext, startStop, finishStop, race, startRace, openPath, ensurePath, startPathStep, pathStepDone, openCat, MODE_META, CAT_ORDER, STORY, PAINT, openStories, openPaint, STORIES };
})();
</script>
