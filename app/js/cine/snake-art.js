// Office snakes, drawn as plain data so the same art renders in the DOM (toDom) and in Remotion (toReact).
// Each stakeholder becomes a cobra wearing their own clothes: the hood is their jacket, the hood's V is their collar,
// the crest is their hair, glasses stay on. viewBox 0 0 200 210, the same box as a portrait, so they swap in place.

const hex = c => { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
const toHex = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => { const x = hex(a), y = hex(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };
const shade = (c, amt) => toHex(hex(c).map(v => v + amt));

export const PLAYER_LOOK = { skin: '#D8A880', hair: '#1F1A17', style: 'short', top: '#2E5E6E', collar: '#EDE6D8' };
export const OFFICE_LOOK = { skin: '#C9B8A0', hair: '#3A3F44', style: 'short', top: '#4B5560', collar: '#D9DEE2', glasses: true };

const VENOM = '#5FAE5A';

function crest(style, color) {
  switch (style) {
    case 'long': case 'wavy': return [['path', { d: 'M74 66 Q80 44 100 46 Q122 44 128 66 Q120 54 112 58 Q104 50 98 58 Q88 52 80 60 Z', fill: color }]];
    case 'bun': return [['path', { d: 'M76 64 Q82 48 100 48 Q118 48 124 64 Q112 56 100 58 Q88 56 76 64 Z', fill: color }], ['circle', { cx: 100, cy: 44, r: 9, fill: color }]];
    case 'bald': return [];
    default: return [['path', { d: 'M78 64 Q84 46 100 48 Q116 46 122 64 Q114 56 106 58 L100 52 L95 58 Q86 56 78 64 Z', fill: color }]];
  }
}

/**
 * snakeTree(look, opts) -> ['svg', attrs, children]
 * opts: mouth 0..1 (strike gape), tongue 0..1 (flick length), blink 0..1, id (unique pattern ids), title, sway (deg)
 */
export function snakeTree(look, { mouth = 0, tongue = 0, blink = 0, id = 's', title = 'An office snake', sway = 0, badge = true } = {}) {
  const L = look || OFFICE_LOOK;
  const body = mix(L.top || '#39404A', VENOM, 0.5);
  const bodyD = shade(body, -34);
  const head = mix(L.skin || '#D6A97F', VENOM, 0.55);
  const headD = shade(head, -30);
  const belly = mix(L.collar || '#E9E4DA', '#F4EBB8', 0.45);
  const hood = shade(L.top || '#39404A', -6);
  const pat = `scl-${id}`;
  const eyeRy = Math.max(0.6, 10 * (1 - blink));
  const gape = Math.max(0, Math.min(1, mouth));
  const tg = Math.max(0, Math.min(1, tongue));
  const kids = [
    ['title', {}, title],
    ['defs', {}, [
      ['pattern', { id: pat, width: 10, height: 8, patternUnits: 'userSpaceOnUse' }, [
        ['path', { d: 'M0 8 Q5 1 10 8', fill: 'none', stroke: bodyD, 'stroke-width': 1.4, opacity: 0.55 }],
      ]],
    ]],
    // coils
    ['ellipse', { cx: 100, cy: 190, rx: 74, ry: 17, fill: bodyD }],
    ['ellipse', { cx: 100, cy: 186, rx: 72, ry: 16, fill: body }],
    ['ellipse', { cx: 100, cy: 186, rx: 72, ry: 16, fill: `url(#${pat})` }],
    ['ellipse', { cx: 100, cy: 168, rx: 58, ry: 15, fill: bodyD }],
    ['ellipse', { cx: 100, cy: 164, rx: 56, ry: 14, fill: body }],
    ['ellipse', { cx: 100, cy: 164, rx: 56, ry: 14, fill: `url(#${pat})` }],
    // tail tip curling out of the coil
    ['path', { d: 'M168 184 Q190 176 184 160 Q180 152 172 156', fill: 'none', stroke: body, 'stroke-width': 9, 'stroke-linecap': 'round' }],
    ['g', { transform: `rotate(${sway} 100 160)` }, [
      // neck rising in an S
      ['path', { d: 'M100 162 C 72 146, 128 128, 100 100', fill: 'none', stroke: bodyD, 'stroke-width': 34, 'stroke-linecap': 'round' }],
      ['path', { d: 'M100 162 C 72 146, 128 128, 100 100', fill: 'none', stroke: body, 'stroke-width': 30, 'stroke-linecap': 'round' }],
      ['path', { d: 'M100 162 C 72 146, 128 128, 100 100', fill: 'none', stroke: `url(#${pat})`, 'stroke-width': 30, 'stroke-linecap': 'round' }],
      ['path', { d: 'M100 160 C 80 146, 120 128, 100 104', fill: 'none', stroke: belly, 'stroke-width': 11, 'stroke-linecap': 'round', opacity: 0.9 }],
      // the hood is their jacket; its V is their collar
      ['path', { d: 'M100 34 C 44 40, 40 120, 100 132 C 160 120, 156 40, 100 34 Z', fill: hood }],
      ['path', { d: 'M100 34 C 44 40, 40 120, 100 132 C 160 120, 156 40, 100 34 Z', fill: `url(#${pat})`, opacity: 0.5 }],
      ['path', { d: 'M78 104 L100 132 L122 104 Q100 116 78 104 Z', fill: L.collar || '#E9E4DA' }],
      badge ? ['g', { transform: 'rotate(-8 128 120)' }, [
        ['path', { d: 'M112 100 L126 114', stroke: '#2B4552', 'stroke-width': 2 }],
        ['rect', { x: 120, y: 112, width: 18, height: 24, rx: 3, fill: '#F7FAFA', stroke: '#2B4552', 'stroke-width': 1.5 }],
        ['rect', { x: 120, y: 112, width: 18, height: 7, rx: 2, fill: '#F2A93B' }],
        ['circle', { cx: 129, cy: 126, r: 3.4, fill: headD }],
      ]] : null,
      // head
      ['path', { d: 'M68 80 C 68 52, 132 52, 132 80 C 132 102, 116 116, 100 116 C 84 116, 68 102, 68 80 Z', fill: head }],
      ['path', { d: 'M74 92 C 80 106, 92 112, 100 112 C 108 112, 120 106, 126 92', fill: 'none', stroke: headD, 'stroke-width': 1.6, opacity: 0.6 }],
      ...crest(L.style, L.hair || '#2B2421'),
      // eyes: marigold, slit pupils, a sly brow
      ['ellipse', { cx: 86, cy: 80, rx: 9.5, ry: eyeRy, fill: '#F5C542', stroke: headD, 'stroke-width': 1.5 }],
      ['ellipse', { cx: 114, cy: 80, rx: 9.5, ry: eyeRy, fill: '#F5C542', stroke: headD, 'stroke-width': 1.5 }],
      blink < 0.7 ? ['ellipse', { cx: 86, cy: 80, rx: 1.9, ry: eyeRy * 0.75, fill: '#141414' }] : null,
      blink < 0.7 ? ['ellipse', { cx: 114, cy: 80, rx: 1.9, ry: eyeRy * 0.75, fill: '#141414' }] : null,
      blink < 0.7 ? ['circle', { cx: 89, cy: 76, r: 1.8, fill: '#FFFFFF' }] : null,
      blink < 0.7 ? ['circle', { cx: 117, cy: 76, r: 1.8, fill: '#FFFFFF' }] : null,
      ['path', { d: 'M76 68 L94 72', stroke: shade(L.hair || '#2B2421', 10), 'stroke-width': 3, 'stroke-linecap': 'round' }],
      ['path', { d: 'M124 66 L106 72', stroke: shade(L.hair || '#2B2421', 10), 'stroke-width': 3, 'stroke-linecap': 'round' }],
      L.glasses ? ['g', { fill: 'none', stroke: '#2A2626', 'stroke-width': 2 }, [
        ['rect', { x: 74, y: 70, width: 24, height: 19, rx: 7 }], ['rect', { x: 102, y: 70, width: 24, height: 19, rx: 7 }], ['path', { d: 'M98 78 L102 78' }],
      ]] : null,
      ['circle', { cx: 96, cy: 97, r: 1.4, fill: headD }],
      ['circle', { cx: 104, cy: 97, r: 1.4, fill: headD }],
      L.beard ? ['path', { d: 'M80 104 Q100 122 120 104 Q112 116 100 117 Q88 116 80 104 Z', fill: L.hair, opacity: 0.6 }] : null,
      // mouth: a smirk that gapes into fangs
      gape > 0.05
        ? ['g', {}, [
          ['path', { d: `M86 103 Q100 ${103 + 22 * gape} 114 103 Z`, fill: '#4A1F22' }],
          ['path', { d: `M90 103 L92.5 ${109 + 6 * gape} L95 103 Z M105 103 L107.5 ${109 + 6 * gape} L110 103 Z`, fill: '#FFFDF5' }],
        ]]
        : ['path', { d: 'M88 104 Q100 110 113 102', fill: 'none', stroke: '#4A1F22', 'stroke-width': 2.4, 'stroke-linecap': 'round' }],
      tg > 0.02 ? ['path', { d: `M100 ${106 + 6 * gape} L100 ${112 + 12 * tg + 6 * gape} L${95 - 2 * tg} ${118 + 16 * tg + 6 * gape} M100 ${112 + 12 * tg + 6 * gape} L${105 + 2 * tg} ${118 + 16 * tg + 6 * gape}`, fill: 'none', stroke: '#E5484D', 'stroke-width': 2.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }] : null,
    ]],
  ];
  return ['svg', { viewBox: '0 0 200 210', role: 'img', 'aria-label': title }, kids.filter(Boolean)];
}

/** Render a tree with any element factory: f(tag, attrs, ...children). */
export function renderTree(tree, f) {
  if (tree == null) return null;
  if (typeof tree === 'string') return tree;
  const [tag, attrs, kids] = tree;
  const ch = Array.isArray(kids) ? kids.filter(Boolean).map(k => renderTree(k, f)) : kids != null ? [kids] : [];
  return f(tag, attrs || {}, ...ch);
}
