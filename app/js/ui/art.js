// Generated illustration: the Tower, the skyline, scene backdrops, NPC portraits and small icons.
// Everything is built as SVG from parameters (no hand-drawn path data, no external images).
import { s } from '../dom.js';
import { PLACES } from '../content/index.js';

let uid = 0;
const id = p => `${p}${++uid}`;

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export function phaseNow(d = new Date()) {
  const h = d.getHours() + d.getMinutes() / 60;
  if (h >= 5 && h < 8) return 'dawn';
  if (h >= 8 && h < 17) return 'day';
  if (h >= 17 && h < 19.5) return 'dusk';
  return 'night';
}

const SKY = {
  dawn: ['#F2C7A1', '#C9C3CF', '#8FAAC6'],
  day: ['#EEF3F2', '#CFE1EA', '#A9C8DC'],
  dusk: ['#F0A877', '#B77B86', '#55577F'],
  night: ['#2B3653', '#1F2740', '#141A2B'],
};

/** The Tower: 27 floors over the Saigon river. floor = your floor; lit = floors reached. */
export function tower({ floor = 6, phase = phaseNow(), rain = false, bossFloors = [7, 9, 11, 12, 15, 18, 21, 24, 27], animate = true, label } = {}) {
  const W = 400, H = 640, FLOORS = 27, FH = 16, X0 = 128, TW = 144, GROUND = 548;
  const sky = SKY[phase];
  const gSky = id('sky'), gRiver = id('river'), gGlass = id('glass');
  const night = phase === 'night' || phase === 'dusk';
  const svg = s('svg', { viewBox: `0 0 ${W} ${H}`, class: 'tower', role: 'img', 'aria-label': label || `The tower. You are on floor ${floor} of ${FLOORS}.` },
    s('defs', null,
      s('linearGradient', { id: gSky, x1: 0, y1: 1, x2: 0, y2: 0 },
        s('stop', { offset: '0%', 'stop-color': sky[0] }), s('stop', { offset: '55%', 'stop-color': sky[1] }), s('stop', { offset: '100%', 'stop-color': sky[2] })),
      s('linearGradient', { id: gRiver, x1: 0, y1: 0, x2: 0, y2: 1 },
        s('stop', { offset: '0%', 'stop-color': night ? '#27324A' : '#7E9FB0' }), s('stop', { offset: '100%', 'stop-color': night ? '#121827' : '#3F6272' })),
      s('linearGradient', { id: gGlass, x1: 0, y1: 0, x2: 1, y2: 1 },
        s('stop', { offset: '0%', 'stop-color': night ? '#2A3448' : '#9DB4C4' }), s('stop', { offset: '100%', 'stop-color': night ? '#1A2132' : '#6F8798' })),
    ),
    s('rect', { x: 0, y: 0, width: W, height: H, fill: `url(#${gSky})` }),
  );
  // Sun or moon
  const orb = { dawn: [320, 470, '#FBE3B8'], day: [320, 110, '#FFF8E6'], dusk: [70, 420, '#F7C58E'], night: [318, 96, '#E9E4D6'] }[phase];
  svg.append(s('circle', { cx: orb[0], cy: orb[1], r: phase === 'night' ? 14 : 22, fill: orb[2], opacity: phase === 'day' ? .9 : .95 }));
  if (phase === 'night') {
    const r = rng(7);
    for (let i = 0; i < 40; i++) svg.append(s('circle', { cx: r() * W, cy: r() * 300, r: r() * 1.1 + .3, fill: '#F4EEDD', opacity: .3 + r() * .5 }));
  }
  // Far skyline (Thủ Thiêm), generated
  const far = s('g', { opacity: night ? .85 : .55 });
  const r2 = rng(42);
  let x = -10;
  const farCol = night ? '#222B3F' : '#8EA3B3';
  while (x < W) {
    const w = 14 + r2() * 26, h = 30 + r2() * 90;
    if (x > X0 - 30 && x < X0 + TW + 10) { x += w; continue; }
    far.append(s('rect', { x, y: GROUND - h - 4, width: w, height: h + 10, fill: farCol }));
    if (night) for (let k = 0; k < 6; k++) if (r2() > .55) far.append(s('rect', { x: x + 3 + r2() * (w - 6), y: GROUND - h + r2() * h, width: 2, height: 2, fill: '#E9C98A', opacity: .7 }));
    x += w + 2;
  }
  // A tall tapered landmark on the far bank
  far.append(s('polygon', { points: `330,${GROUND} 352,${GROUND} 347,250 341,212 335,250`, fill: night ? '#2A344A' : '#7C93A5' }));
  svg.append(far);
  // River
  svg.append(s('rect', { x: 0, y: GROUND, width: W, height: H - GROUND, fill: `url(#${gRiver})` }));
  const sh = s('g', { class: 'shimmer', stroke: night ? '#C9B27A' : '#E5EEF2', 'stroke-width': 1.2, opacity: .5 });
  const r3 = rng(9);
  for (let i = 0; i < 14; i++) { const yy = GROUND + 12 + r3() * 70, xx = r3() * W; sh.append(s('line', { x1: xx, y1: yy, x2: xx + 10 + r3() * 26, y2: yy })); }
  svg.append(sh);
  svg.append(s('g', { class: animate ? 'boat' : null }, s('path', { d: `M0 ${GROUND + 44} h34 l-6 7 h-24 z`, fill: night ? '#0F1420' : '#2F3E48' }), s('rect', { x: 10, y: GROUND + 36, width: 12, height: 8, fill: night ? '#F2C66D' : '#E8E2D6' })));
  // Reflection of the tower
  svg.append(s('rect', { x: X0 + 8, y: GROUND, width: TW - 16, height: 70, fill: night ? '#F2C66D' : '#FFFFFF', opacity: night ? .08 : .12 }));

  // The tower itself
  const T = s('g', null);
  T.append(s('rect', { x: X0 - 6, y: GROUND - FLOORS * FH - 6, width: TW + 12, height: FLOORS * FH + 6, fill: night ? '#0F131C' : '#3B4652' }));
  const COLS = 8;
  const cw = (TW - 8) / COLS;
  for (let f = 1; f <= FLOORS; f++) {
    const y = GROUND - f * FH;
    const reached = f <= floor;
    const you = f === floor;
    const fg = s('g', { 'data-floor': f });
    fg.append(s('rect', { x: X0, y: y + 1, width: TW, height: FH - 2, fill: `url(#${gGlass})` }));
    for (let c = 0; c < COLS; c++) {
      const lit = reached && (you || ((f * 7 + c * 3) % 5 !== 0));
      const win = s('rect', {
        x: X0 + 4 + c * cw + 1, y: y + 3, width: cw - 2, height: FH - 6, rx: 1,
        class: 'win' + (lit && animate ? ' lightup' : ''),
        fill: lit ? (you ? '#FFD98C' : night ? '#E9B866' : '#F5DDA6') : (night ? '#1E2636' : '#A8BCC9'),
        opacity: lit ? 1 : (night ? .9 : .55),
      });
      if (lit && animate) win.style.animationDelay = `${(f - 1) * 55 + c * 12}ms`;
      fg.append(win);
    }
    if (bossFloors.includes(f)) fg.append(s('rect', { x: X0 - 6, y: y + 5, width: 4, height: FH - 10, fill: '#6FA8C8' }));
    if (you) {
      fg.append(s('rect', { x: X0 - 2, y: y, width: TW + 4, height: FH, fill: 'none', stroke: '#F2A93B', 'stroke-width': 2.5, class: 'floor-you' }));
      fg.append(s('line', { x1: X0 + TW + 6, y1: y + FH / 2, x2: X0 + TW + 26, y2: y + FH / 2, stroke: night ? '#EDE7DF' : '#1E1B18', 'stroke-width': 1 }));
      fg.append(s('text', { x: X0 + TW + 30, y: y + FH / 2 + 4, 'font-size': 12, 'font-family': 'Be Vietnam Pro, system-ui, sans-serif', 'font-weight': 600, fill: night ? '#EDE7DF' : '#1E1B18', text: `You · Floor ${f}` }));
    }
    T.append(fg);
  }
  // Crown and mast
  const top = GROUND - FLOORS * FH - 6;
  T.append(s('polygon', { points: `${X0 - 6},${top} ${X0 + TW + 6},${top} ${X0 + TW - 14},${top - 18} ${X0 + 14},${top - 18}`, fill: night ? '#0F131C' : '#3B4652' }));
  T.append(s('line', { x1: X0 + TW / 2, y1: top - 18, x2: X0 + TW / 2, y2: top - 52, stroke: night ? '#0F131C' : '#3B4652', 'stroke-width': 3 }));
  T.append(s('circle', { cx: X0 + TW / 2, cy: top - 54, r: 3, fill: '#F2A93B', class: 'floor-you' }));
  // Lobby
  T.append(s('rect', { x: X0 - 12, y: GROUND - 2, width: TW + 24, height: 6, fill: night ? '#0B0E15' : '#2B333C' }));
  svg.append(T);
  // Trees on the embankment
  const r4 = rng(3);
  for (let i = 0; i < 9; i++) { const tx = 6 + i * 44 + r4() * 10; if (tx > X0 - 20 && tx < X0 + TW + 10) continue; svg.append(s('circle', { cx: tx, cy: GROUND - 6, r: 7 + r4() * 4, fill: night ? '#18241F' : '#4E7360' })); }
  if (rain) {
    const rg = s('g', { class: 'rain', stroke: night ? '#9FB0C8' : '#5E7286', 'stroke-width': 1, opacity: .5 });
    const r5 = rng(11);
    for (let i = 0; i < 70; i++) { const rx = r5() * W, ry = r5() * H; const l = s('line', { x1: rx, y1: ry, x2: rx - 4, y2: ry + 14 }); l.style.animationDelay = `${-r5()}s`; rg.append(l); }
    svg.append(rg);
  }
  return svg;
}

// ---------------- portraits ----------------

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(v => Math.max(0, Math.min(255, Math.round(v + amt))));
  return '#' + c.map(v => v.toString(16).padStart(2, '0')).join('');
}

const MOUTH = {
  neutral: 'M88 124 Q100 127 112 124',
  warm: 'M86 122 Q100 133 114 122',
  smile: 'M85 121 Q100 136 115 121 Q100 129 85 121',
  lean: 'M88 123 Q100 130 112 123',
  skeptic: 'M88 126 Q98 124 113 120',
  cool: 'M89 125 L111 125',
  sad: 'M88 128 Q100 120 112 128',
};
const BROWS = {
  neutral: [[78, 80, 92, 79], [108, 79, 122, 80]],
  warm: [[78, 79, 92, 77], [108, 77, 122, 79]],
  smile: [[78, 78, 92, 76], [108, 76, 122, 78]],
  lean: [[78, 78, 92, 77], [108, 77, 122, 78]],
  skeptic: [[78, 81, 92, 80], [108, 74, 122, 77]],
  cool: [[78, 79, 92, 82], [108, 82, 122, 79]],
  sad: [[78, 79, 92, 82], [108, 82, 122, 79]],
};

function hair(style, col, age) {
  const g = s('g', { fill: col });
  switch (style) {
    case 'side': g.append(s('path', { d: 'M64 92 Q62 50 100 46 Q140 46 137 88 Q132 66 112 62 Q92 70 70 66 Q66 76 64 92 Z' })); break;
    case 'short': g.append(s('path', { d: 'M66 86 Q64 52 100 50 Q136 52 134 86 Q130 66 100 62 Q72 64 66 86 Z' })); break;
    case 'spiky': g.append(s('path', { d: 'M66 84 L70 56 L80 64 L86 46 L96 60 L104 44 L112 60 L122 48 L126 64 L134 58 L134 86 Q126 66 100 64 Q74 66 66 84 Z' })); break;
    case 'bob': g.append(s('path', { d: 'M62 118 Q56 56 100 48 Q144 56 138 118 L128 118 Q132 80 118 66 Q100 76 74 70 Q68 84 72 118 Z' })); break;
    case 'long': g.append(s('path', { d: 'M60 150 Q52 56 100 48 Q148 56 140 150 L128 150 Q134 86 120 68 Q100 78 76 70 Q66 90 72 150 Z' })); break;
    case 'wavy': g.append(s('path', { d: 'M60 132 Q50 100 60 70 Q76 44 104 48 Q146 54 140 96 Q146 118 138 134 L128 130 Q134 90 118 68 Q96 76 76 70 Q66 96 72 132 Z' })); break;
    case 'curly': for (const [cx, cy, r] of [[72, 70, 12], [86, 58, 13], [102, 54, 14], [118, 58, 13], [130, 70, 12], [66, 84, 9], [134, 84, 9]]) g.append(s('circle', { cx, cy, r })); break;
    case 'bun': g.append(s('path', { d: 'M66 88 Q64 52 100 50 Q136 52 134 88 Q130 66 100 62 Q72 64 66 88 Z' })); g.append(s('circle', { cx: 100, cy: 42, r: 13 })); break;
    default: g.append(s('path', { d: 'M66 86 Q64 52 100 50 Q136 52 134 86 Q130 66 100 62 Q72 64 66 86 Z' }));
  }
  if (age >= 3) g.append(s('path', { d: 'M74 70 Q90 60 104 60', stroke: '#E6E1D8', 'stroke-width': 3, fill: 'none', opacity: .7 }));
  return g;
}

/** An NPC portrait. look from NPCS[id].look; expr one of MOUTH keys. */
export function portrait(look, expr = 'neutral', { breathe = true, title } = {}) {
  const L = look || { skin: '#D6A97F', hair: '#2B2421', style: 'short', top: '#39404A', collar: '#E9E4DA' };
  const e = MOUTH[expr] ? expr : 'neutral';
  const tilt = e === 'lean' ? 'rotate(-4 100 120)' : e === 'skeptic' ? 'rotate(3 100 120)' : null;
  const skinD = shade(L.skin, -28);
  const svg = s('svg', { viewBox: '0 0 200 210', role: 'img', 'aria-label': title || 'Portrait' });
  const body = s('g', { class: breathe ? 'breathe' : null });
  // Long hair sits behind the shoulders
  if (L.style === 'long' || L.style === 'wavy') body.append(s('path', { d: 'M62 100 Q56 150 70 176 L130 176 Q144 150 138 100 Z', fill: L.hair }));
  body.append(s('path', { d: 'M18 210 C18 164 58 144 100 144 C142 144 182 164 182 210 Z', fill: L.top }));
  body.append(s('path', { d: 'M84 144 L100 172 L116 144 Z', fill: L.collar }));
  body.append(s('path', { d: 'M76 146 L100 176 L90 146 Z M124 146 L100 176 L110 146 Z', fill: shade(L.top, -18), opacity: .55 }));
  body.append(s('rect', { x: 90, y: 118, width: 20, height: 30, rx: 8, fill: skinD }));
  const head = s('g', { transform: tilt });
  head.append(s('ellipse', { cx: 65, cy: 96, rx: 6, ry: 9, fill: skinD }));
  head.append(s('ellipse', { cx: 135, cy: 96, rx: 6, ry: 9, fill: skinD }));
  head.append(s('ellipse', { cx: 100, cy: 92, rx: 35, ry: 42, fill: L.skin }));
  if (e === 'warm' || e === 'smile') {
    head.append(s('ellipse', { cx: 80, cy: 110, rx: 7, ry: 4, fill: '#E58C78', opacity: .28 }));
    head.append(s('ellipse', { cx: 120, cy: 110, rx: 7, ry: 4, fill: '#E58C78', opacity: .28 }));
  }
  head.append(hair(L.style, L.hair, L.age || 0));
  const eyes = s('g', { class: 'blink' });
  const eyeY = e === 'smile' ? 95 : 94;
  if (e === 'smile') {
    eyes.append(s('path', { d: 'M80 95 Q86 90 92 95', stroke: '#1C1A1A', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }));
    eyes.append(s('path', { d: 'M108 95 Q114 90 120 95', stroke: '#1C1A1A', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }));
  } else {
    eyes.append(s('ellipse', { cx: 86, cy: eyeY, rx: 3.4, ry: e === 'cool' ? 2.2 : 3.6, fill: '#1C1A1A' }));
    eyes.append(s('ellipse', { cx: 114, cy: eyeY, rx: 3.4, ry: e === 'cool' ? 2.2 : 3.6, fill: '#1C1A1A' }));
  }
  head.append(eyes);
  for (const b of BROWS[e]) head.append(s('line', { x1: b[0], y1: b[1], x2: b[2], y2: b[3], stroke: shade(L.hair, 10), 'stroke-width': 3, 'stroke-linecap': 'round' }));
  head.append(s('path', { d: 'M99 100 Q96 110 100 112', stroke: skinD, 'stroke-width': 2, fill: 'none', 'stroke-linecap': 'round' }));
  if (L.beard) head.append(s('path', { d: 'M70 104 Q72 134 100 136 Q128 134 130 104 Q124 124 100 126 Q76 124 70 104 Z', fill: L.hair, opacity: .8 }));
  head.append(s('path', { d: MOUTH[e], stroke: '#6E3B32', 'stroke-width': 2.6, fill: e === 'smile' ? '#FFF6EF' : 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
  if (L.glasses) {
    head.append(s('rect', { x: 75, y: 86, width: 22, height: 16, rx: 6, fill: 'none', stroke: '#2A2626', 'stroke-width': 2 }));
    head.append(s('rect', { x: 103, y: 86, width: 22, height: 16, rx: 6, fill: 'none', stroke: '#2A2626', 'stroke-width': 2 }));
    head.append(s('line', { x1: 97, y1: 93, x2: 103, y2: 93, stroke: '#2A2626', 'stroke-width': 2 }));
  }
  if ((L.age || 0) >= 2) head.append(s('path', { d: 'M82 74 Q100 70 118 74', stroke: skinD, 'stroke-width': 1.2, fill: 'none', opacity: .6 }));
  body.append(head);
  svg.append(body);
  return svg;
}

// ---------------- scene backdrops ----------------

export function backdrop(place, { phase = phaseNow() } = {}) {
  const P = PLACES[place] || PLACES.desk;
  const [wall, floorC, accent, light] = P.pal;
  const night = phase === 'night';
  const sky = SKY[phase];
  const svg = s('svg', { class: 'bg', viewBox: '0 0 800 350', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' });
  const dim = night ? -38 : 0;
  svg.append(s('rect', { x: 0, y: 0, width: 800, height: 350, fill: shade(wall, dim) }));
  // Window with skyline (most places)
  const win = (x, y, w, h) => {
    const g = s('g');
    g.append(s('rect', { x, y, width: w, height: h, fill: sky[1] }));
    g.append(s('rect', { x, y: y + h * .55, width: w, height: h * .45, fill: sky[0], opacity: .6 }));
    const r = rng(x + y);
    let xx = x;
    while (xx < x + w) { const bw = 10 + r() * 22, bh = h * (.18 + r() * .4); g.append(s('rect', { x: xx, y: y + h - bh, width: Math.min(bw, x + w - xx), height: bh, fill: night ? '#222B3F' : '#93A7B6', opacity: .9 })); xx += bw + 3; }
    g.append(s('rect', { x, y, width: w, height: h, fill: 'none', stroke: shade(wall, -60 + dim), 'stroke-width': 6 }));
    for (let i = 1; i < 3; i++) g.append(s('line', { x1: x + (w * i) / 3, y1: y, x2: x + (w * i) / 3, y2: y + h, stroke: shade(wall, -60 + dim), 'stroke-width': 3 }));
    return g;
  };
  const floorY = 270;
  switch (place) {
    case 'teams': {
      svg.append(s('rect', { x: 0, y: 0, width: 800, height: 350, fill: shade('#ECEAF3', dim) }));
      svg.append(s('rect', { x: 0, y: 0, width: 60, height: 350, fill: shade('#5B5FC7', dim / 2) }));
      for (let i = 0; i < 5; i++) svg.append(s('rect', { x: 18, y: 30 + i * 46, width: 24, height: 24, rx: 6, fill: '#FFFFFF', opacity: .35 }));
      svg.append(s('rect', { x: 60, y: 0, width: 740, height: 46, fill: shade('#FFFFFF', dim), opacity: .9 }));
      for (let i = 0; i < 4; i++) svg.append(s('rect', { x: 560 + (i % 2) * 40, y: 80 + i * 52, width: 200 - (i % 2) * 40, height: 34, rx: 10, fill: i % 2 ? shade('#DCDBF5', dim) : shade('#FFFFFF', dim), opacity: .8 }));
      break;
    }
    case 'lift': {
      svg.append(s('rect', { x: 0, y: 0, width: 800, height: 350, fill: shade('#BFC3C9', dim) }));
      for (let i = 0; i < 8; i++) svg.append(s('rect', { x: i * 100, y: 0, width: 98, height: 350, fill: shade('#C9CDD3', dim + (i % 2) * 6) }));
      svg.append(s('rect', { x: 360, y: 24, width: 80, height: 26, rx: 4, fill: '#1B1E26' }));
      svg.append(s('path', { d: 'M380 42 l6 -10 l6 10 z', fill: '#F2A93B' }));
      svg.append(s('text', { x: 410, y: 43, 'text-anchor': 'middle', fill: '#F2A93B', 'font-size': 16, 'font-family': 'Bricolage Grotesque, sans-serif', 'font-weight': 700, text: '21' }));
      break;
    }
    case 'townhall': {
      svg.append(s('rect', { x: 120, y: 30, width: 560, height: 170, rx: 6, fill: shade(accent, dim - 30), opacity: .9 }));
      svg.append(s('rect', { x: 140, y: 48, width: 520, height: 134, rx: 4, fill: shade(light, dim) }));
      for (let r = 0; r < 3; r++) for (let i = 0; i < 14; i++) svg.append(s('circle', { cx: 40 + i * 56 + (r % 2) * 20, cy: 300 + r * 22, r: 14, fill: shade(floorC, dim - 40 - r * 10) }));
      break;
    }
    case 'melbourne': {
      svg.append(s('rect', { x: 0, y: 0, width: 800, height: 350, fill: sky[1] }));
      for (let i = 0; i < 8; i++) svg.append(s('rect', { x: i * 110 - 20, y: 60 + (i % 3) * 30, width: 100, height: 290, fill: shade('#B9A58E', dim - (i % 2) * 20) }));
      svg.append(s('rect', { x: 120, y: 220, width: 380, height: 70, rx: 12, fill: '#2F6B5E' }));
      for (let i = 0; i < 7; i++) svg.append(s('rect', { x: 136 + i * 50, y: 232, width: 36, height: 24, rx: 3, fill: '#F2EEE6', opacity: .85 }));
      svg.append(s('line', { x1: 0, y1: 200, x2: 800, y2: 200, stroke: '#3B4652', 'stroke-width': 2 }));
      break;
    }
    default: {
      if (!['warroom'].includes(place)) svg.append(win(place === 'office' || place === 'boardroom' ? 80 : 470, 36, place === 'office' || place === 'boardroom' ? 640 : 280, 170));
      if (place === 'warroom') for (let i = 0; i < 4; i++) {
        svg.append(s('rect', { x: 60 + i * 180, y: 40, width: 160, height: 100, rx: 4, fill: '#1B1E26' }));
        svg.append(s('rect', { x: 72 + i * 180, y: 52, width: 136 * (0.4 + (i % 3) * .2), height: 10, fill: i === 1 ? '#F08A72' : '#5CC2A2' }));
        svg.append(s('rect', { x: 72 + i * 180, y: 72, width: 100, height: 6, fill: '#8A8F98' }));
      }
      if (place === 'restaurant') for (let i = 0; i < 5; i++) {
        svg.append(s('line', { x1: 80 + i * 150, y1: 0, x2: 80 + i * 150, y2: 40, stroke: '#3B2A20', 'stroke-width': 2 }));
        svg.append(s('ellipse', { cx: 80 + i * 150, cy: 56, rx: 18, ry: 22, fill: accent }));
      }
      if (place === 'cafe') for (let i = 0; i < 3; i++) {
        svg.append(s('line', { x1: 120 + i * 130, y1: 0, x2: 120 + i * 130, y2: 60, stroke: '#3B2A20', 'stroke-width': 2 }));
        svg.append(s('path', { d: `M${100 + i * 130} 76 h40 l-8 -16 h-24 z`, fill: accent }));
        svg.append(s('circle', { cx: 120 + i * 130, cy: 80, r: 5, fill: '#FBE3B8', opacity: night ? 1 : .6 }));
      }
      if (place === 'meeting' || place === 'boardroom') svg.append(s('rect', { x: 40, y: 50, width: 160, height: 110, rx: 4, fill: shade('#FFFFFF', dim), stroke: shade(wall, -50), 'stroke-width': 3 }));
      if (place === 'meeting') for (let i = 0; i < 4; i++) svg.append(s('rect', { x: 56, y: 70 + i * 20, width: 60 + (i * 31) % 70, height: 6, rx: 3, fill: i === 0 ? accent : '#8A8F98', opacity: .7 }));
      if (place === 'pantry') {
        svg.append(s('rect', { x: 40, y: 80, width: 90, height: 190, rx: 6, fill: shade('#FFFFFF', dim - 10) }));
        svg.append(s('rect', { x: 160, y: 180, width: 260, height: 14, fill: shade(floorC, dim - 30) }));
        svg.append(s('rect', { x: 200, y: 150, width: 26, height: 30, rx: 6, fill: accent }));
      }
      if (place === 'desk' || place === 'office') {
        svg.append(s('rect', { x: 60, y: 120, width: 120, height: 80, rx: 6, fill: '#1B1E26' }));
        svg.append(s('rect', { x: 68, y: 128, width: 104, height: 64, rx: 3, fill: night ? '#2F4858' : '#DCE6EE' }));
        svg.append(s('rect', { x: 112, y: 200, width: 16, height: 20, fill: '#1B1E26' }));
        svg.append(s('ellipse', { cx: 210, cy: 196, rx: 18, ry: 28, fill: '#4E7360' }));
        svg.append(s('rect', { x: 198, y: 214, width: 24, height: 24, rx: 3, fill: accent }));
      }
      svg.append(s('rect', { x: 0, y: floorY, width: 800, height: 80, fill: shade(floorC, dim) }));
      if (place === 'boardroom' || place === 'meeting' || place === 'restaurant' || place === 'cafe') svg.append(s('rect', { x: 120, y: floorY - 16, width: 560, height: 22, rx: 8, fill: shade(floorC, dim - 45) }));
      if (place === 'desk' || place === 'office') svg.append(s('rect', { x: 20, y: floorY - 50, width: 280, height: 14, rx: 3, fill: shade(floorC, dim - 45) }));
    }
  }
  // Light pool
  svg.append(s('ellipse', { cx: 400, cy: 360, rx: 340, ry: 90, fill: light, opacity: night ? .08 : .25 }));
  return svg;
}

// ---------------- grade seal ----------------

export function seal(grade, { provisional = false, label } = {}) {
  const svg = s('svg', { viewBox: '0 0 120 120', class: 'seal' + (provisional ? ' prov' : ''), role: 'img', 'aria-label': label || `Grade ${grade}` });
  const g = s('g', { class: 'stamp', style: 'transform-origin:60px 60px' });
  g.append(s('circle', { cx: 60, cy: 60, r: 54, class: 'ring2', 'stroke-width': 3 }));
  g.append(s('circle', { cx: 60, cy: 60, r: 46, class: 'disc' }));
  const pts = [];
  for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2, r = i % 2 ? 49 : 52; pts.push(`${60 + Math.cos(a) * r},${60 + Math.sin(a) * r}`); }
  g.append(s('polygon', { points: pts.join(' '), class: 'ring2', 'stroke-width': 1.2, opacity: .7 }));
  g.append(s('text', { x: 60, y: 76, 'text-anchor': 'middle', 'font-size': 50, text: grade }));
  svg.append(g);
  return svg;
}

// ---------------- icons ----------------

const ICONS = {
  today: 'M6 21V4h12v17M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2M3 21h18',
  people: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 14c3 0 6 2.7 6 6',
  cards: 'M4 6h12v14H4zM8 3h12v14',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  more: 'M12 6a1 1 0 1 0 0-.01M12 12a1 1 0 1 0 0-.01M12 18a1 1 0 1 0 0-.01',
  check: 'M5 12l5 5 9-10',
  cross: 'M6 6l12 12M18 6L6 18',
  note: 'M5 4h14v16H5zM8 8h8M8 12h8M8 16h5',
  moon: 'M20 14A8 8 0 1 1 10 4a6 6 0 0 0 10 10z',
  shield: 'M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z',
  cup: 'M4 8h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM17 10h2a2 2 0 0 1 0 4h-2',
  chat: 'M4 5h16v11H9l-5 4z',
  hands: 'M4 13l4-4 4 4 4-4 4 4M4 13v5h16v-5',
  sprout: 'M12 21v-8M12 13c0-4-3-6-7-6 0 4 3 6 7 6zM12 11c0-4 3-6 7-6 0 4-3 6-7 6z',
  play: 'M7 5l12 7-12 7z',
  speaker: 'M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6',
  up: 'M12 19V5M5 12l7-7 7 7',
  down: 'M12 5v14M5 12l7 7 7-7',
  ring: 'M12 4a8 8 0 1 0 0.01 0',
  star: 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  door: 'M6 21V4h10l2 1v16M6 21h14M13 12h.01',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
  brain: 'M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 0V4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 0',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z',
  coach: 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5',
  library: 'M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15.5-3.5 1z',
  snake: 'M3 19c2.5 0 3-3 5.5-3s3 3 5.5 3 4-2 3-5-5-2.5-5-5.5S15 4 17.5 4c1.4 0 2.5.8 2.5 2M19.5 6.5l1.5 1M17.6 5.2h.01',
  map: 'M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5',
  stop: 'M7 7h10v10H7z',
  film: 'M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4',
  mute: 'M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6',
  script: 'M7 3h8l4 4v14H7zM15 3v4h4M10 11h6M10 15h6',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01',
  queue: 'M4 6h12M4 12h12M4 18h8M17 15l4 3-4 3z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.6-7 8-7s8 3 8 7',
};
export function icon(name, size = 20) {
  return s('svg', { viewBox: '0 0 24 24', width: size, height: size, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'aria-hidden': 'true' },
    s('path', { d: ICONS[name] || ICONS.more }));
}
