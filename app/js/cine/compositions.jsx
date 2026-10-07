// Remotion compositions for the game's cinematic moments. Every motion is driven by the frame
// (useCurrentFrame + interpolate), never by CSS transitions, so the Player can scrub, pause and show stills.
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing, Sequence } from 'remotion';

export const W = 1280, H = 720, FPS = 30;
const C = { river: '#0A141A', river2: '#10202A', river3: '#183040', line: '#2A4654', ink: '#E6EEF0', mist: '#9FB5BD', marigold: '#F2A93B', jade: '#5CC2A2' };
const DISPLAY = '"Bricolage Grotesque", "Be Vietnam Pro", system-ui, sans-serif';
const UI = '"Be Vietnam Pro", system-ui, sans-serif';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
const push = Easing.spring({ damping: 200 });

function rng(seed) {
  let a = seed >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

// ---------------- shared scenery ----------------

function Sky({ fadeIn = 0 }) {
  const frame = useCurrentFrame();
  const r = rng(7);
  const stars = Array.from({ length: 70 }, () => [r() * W, r() * H * 0.55, r() * 1.4 + 0.4, r() * 6]);
  return (
    <AbsoluteFill style={{ opacity: interpolate(frame, [0, fadeIn || 1], [fadeIn ? 0 : 1, 1], clamp) }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <linearGradient id="cineSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1620" />
            <stop offset="60%" stopColor="#14283A" />
            <stop offset="100%" stopColor="#1E3A4C" />
          </linearGradient>
        </defs>
        <rect width={W} height={H} fill="url(#cineSky)" />
        {stars.map(([x, y, rad, ph], i) => (
          <circle key={i} cx={x} cy={y} r={rad} fill="#F4F1E6" opacity={0.25 + 0.35 * (0.5 + 0.5 * Math.sin(frame / 18 + ph))} />
        ))}
      </svg>
    </AbsoluteFill>
  );
}

function Skyline({ rise = [0, 1], seed = 3 }) {
  const frame = useCurrentFrame();
  const r = rng(seed);
  const blocks = [];
  let x = -20;
  while (x < W) { const w = 40 + r() * 90, h = 80 + r() * 230; blocks.push([x, w, h, r()]); x += w + 6; }
  const y = interpolate(frame, rise, [120, 0], { ...clamp, easing: outExpo });
  return (
    <AbsoluteFill style={{ translate: `0px ${y}px` }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {blocks.map(([bx, bw, bh, k], i) => (
          <g key={i}>
            <rect x={bx} y={600 - bh} width={bw} height={bh} fill={k > 0.5 ? '#13222D' : '#182B38'} />
            {Array.from({ length: Math.floor(bh / 26) }, (_, j) => (k * 10 + j) % 3 === 0 ? (
              <rect key={j} x={bx + 8 + ((j * 13) % Math.max(8, bw - 20))} y={600 - bh + 12 + j * 26} width={6} height={8} fill="#E9B866" opacity={0.55} />
            ) : null)}
          </g>
        ))}
      </svg>
    </AbsoluteFill>
  );
}

function River() {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={0} y={600} width={W} height={120} fill="#0C1A22" />
        {Array.from({ length: 14 }, (_, i) => {
          const y = 616 + (i % 7) * 14;
          const x = ((i * 173 + frame * (1.2 + (i % 3) * 0.4)) % (W + 200)) - 100;
          return <line key={i} x1={x} y1={y} x2={x + 60 + (i % 4) * 20} y2={y} stroke="#E9C27A" strokeOpacity={0.28} strokeWidth={1.5} />;
        })}
      </svg>
    </AbsoluteFill>
  );
}

/** The tower with windows lighting floor by floor up to `floor`. */
function Tower({ floor, riseFrom = 0, lightFrom = 40, x = 560 }) {
  const frame = useCurrentFrame();
  const FL = 27, FH = 17, TW = 160, base = 600;
  const top = base - FL * FH;
  const y = interpolate(frame, [riseFrom, riseFrom + 50], [520, 0], { ...clamp, easing: push });
  const litUpTo = interpolate(frame, [lightFrom, lightFrom + 60], [0, floor], clamp);
  return (
    <AbsoluteFill style={{ translate: `0px ${y}px` }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <rect x={x - 6} y={top - 30} width={TW + 12} height={FL * FH + 30} fill="#1A3140" />
        <rect x={x + TW / 2 - 2} y={top - 80} width={4} height={50} fill="#2A4654" />
        <circle cx={x + TW / 2} cy={top - 82} r={4} fill={C.marigold} opacity={0.6 + 0.4 * Math.sin(frame / 8)} />
        {Array.from({ length: FL }, (_, k) => {
          const f = k + 1;
          const fy = base - f * FH;
          const you = f === floor;
          const lit = f <= litUpTo;
          return (
            <g key={f}>
              {Array.from({ length: 8 }, (_, c) => {
                const on = lit && (you || (f * 7 + c * 3) % 5 !== 0);
                return <rect key={c} x={x + 6 + c * 19} y={fy + 3} width={15} height={FH - 6} rx={1} fill={on ? (you ? '#FFD27A' : '#E9B866') : '#22374A'} opacity={on ? 1 : 0.8} />;
              })}
              {you && lit ? <rect x={x - 4} y={fy} width={TW + 8} height={FH} fill="none" stroke={C.marigold} strokeWidth={2.5} opacity={0.7 + 0.3 * Math.sin(frame / 6)} /> : null}
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
}

function Words({ text, from, size = 96, weight = 800, color = C.ink, x = 96, y = 200, stagger = 4, font = DISPLAY, width = 85 }) {
  const frame = useCurrentFrame();
  const words = String(text).split(' ');
  return (
    <div style={{ position: 'absolute', left: x, top: y, right: 96, fontFamily: font, fontSize: size, fontWeight: weight, color, lineHeight: 1.05, letterSpacing: '-0.02em', fontVariationSettings: `"wdth" ${width}`, display: 'flex', flexWrap: 'wrap', gap: `0 ${size * 0.25}px` }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: 'inline-block',
          opacity: interpolate(frame, [from + i * stagger, from + i * stagger + 14], [0, 1], clamp),
          translate: `0px ${interpolate(frame, [from + i * stagger, from + i * stagger + 22], [size * 0.45, 0], { ...clamp, easing: outExpo })}px`,
          filter: `blur(${interpolate(frame, [from + i * stagger, from + i * stagger + 16], [8, 0], clamp)}px)`,
        }}>{w}</span>
      ))}
    </div>
  );
}

function Line({ text, from, x = 96, y = 420, size = 30, color = C.mist, weight = 500 }) {
  const frame = useCurrentFrame();
  return (
    <div style={{
      position: 'absolute', left: x, top: y, right: 96, fontFamily: UI, fontSize: size, fontWeight: weight, color,
      opacity: interpolate(frame, [from, from + 18], [0, 1], clamp),
      translate: `0px ${interpolate(frame, [from, from + 24], [18, 0], { ...clamp, easing: outExpo })}px`,
    }}>{text}</div>
  );
}

// ---------------- 1. Opening ----------------

export function Opening({ name = 'you', floor = 6 }) {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: C.river, overflow: 'hidden' }}>
      <Sky fadeIn={30} />
      <Skyline rise={[10, 70]} />
      <Tower floor={floor} riseFrom={30} lightFrom={80} x={860} />
      <River />
      <Sequence from={0} premountFor={fps}>
        <Words text="Snakes at Work" from={110} size={112} y={150} />
        <Line text="Twenty-one days. Twenty-seven floors. One climb." from={170} y={300} size={34} color={C.ink} />
        <Line text="Promotions are earned with evidence and relationships, never points." from={205} y={352} size={24} />
        <Line text={`${name}, you start on Floor ${floor}.`} from={250} y={460} size={30} color={C.marigold} weight={700} />
      </Sequence>
    </AbsoluteFill>
  );
}
export const OPENING_FRAMES = 330;

// ---------------- 2. Day card ----------------

export function DayCard({ n = 1, title = '', sub = '', floor = 6, total = 21 }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tickW = 34;
  return (
    <AbsoluteFill style={{ background: C.river, overflow: 'hidden' }}>
      <Sky />
      <Skyline rise={[0, 1]} seed={11} />
      <River />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(10,20,26,.92) 0%, rgba(10,20,26,.7) 55%, rgba(10,20,26,.1) 100%)' }} />
      <Sequence from={0} premountFor={fps}>
        <div style={{
          position: 'absolute', left: 96, top: 92, fontFamily: DISPLAY, fontWeight: 800, fontSize: 200, lineHeight: 1, color: C.marigold, letterSpacing: '-0.04em', fontVariationSettings: '"wdth" 75',
          opacity: interpolate(frame, [0, 12], [0, 1], clamp),
          translate: `${interpolate(frame, [0, 30], [-80, 0], { ...clamp, easing: outExpo })}px 0px`,
        }}>Day {n}</div>
        <Words text={title} from={14} size={84} y={318} />
        <Line text={sub} from={34} y={430} size={30} />
        <div style={{ position: 'absolute', left: 96, top: 560, display: 'flex', gap: 6 }}>
          {Array.from({ length: total }, (_, i) => (
            <div key={i} style={{
              width: tickW, height: 6, borderRadius: 3,
              background: i + 1 < n ? 'rgba(242,169,59,.55)' : i + 1 === n ? C.marigold : '#2A4654',
              scale: `${interpolate(frame, [40 + i * 2, 52 + i * 2], [0, 1], clamp)} 1`, transformOrigin: 'left',
            }} />
          ))}
        </div>
        <Line text={`Floor ${floor}`} from={60} y={590} size={22} color={C.mist} />
      </Sequence>
    </AbsoluteFill>
  );
}
export const DAYCARD_FRAMES = 150;

// ---------------- 3. Promotion ----------------

export function Promotion({ fromFloor = 6, toFloor = 7, title = '' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.round(interpolate(frame, [12, 100], [fromFloor, toFloor], { ...clamp, easing: Easing.bezier(0.45, 0, 0.2, 1) }));
  const doors = interpolate(frame, [110, 150], [0, 1], { ...clamp, easing: outExpo });
  const shaft = (frame * interpolate(frame, [12, 60, 100, 110], [2, 18, 18, 0], clamp)) % 80;
  return (
    <AbsoluteFill style={{ background: C.river, overflow: 'hidden' }}>
      <Sky />
      <Skyline rise={[0, 1]} seed={19} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 45%, rgba(242,169,59,.18), rgba(10,20,26,0) 60%)', opacity: doors }} />
      <Sequence from={0} premountFor={fps}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 240, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, color: C.ink, opacity: doors, translate: `0px ${interpolate(frame, [115, 150], [30, 0], { ...clamp, easing: outExpo })}px` }}>{title}</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', fontFamily: UI, fontSize: 24, color: C.mist, opacity: interpolate(frame, [135, 160], [0, 1], clamp) }}>Promoted on evidence, not on points.</div>
      </Sequence>
      {/* Lift doors with the floor display */}
      <AbsoluteFill style={{ translate: `${-doors * 52}% 0px`, width: '50%' }}>
        <svg width={W / 2} height={H} viewBox={`0 0 ${W / 2} ${H}`}>
          <rect width={W / 2} height={H} fill="#24394A" />
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={((i * 80 + shaft) % (H + 80)) - 40} x2={W / 2} y2={((i * 80 + shaft) % (H + 80)) - 40} stroke="#2E485A" strokeWidth={2} />)}
          <rect x={W / 2 - 3} y={0} width={3} height={H} fill="#0E1B24" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{ left: '50%', width: '50%', translate: `${doors * 52}% 0px` }}>
        <svg width={W / 2} height={H} viewBox={`0 0 ${W / 2} ${H}`}>
          <rect width={W / 2} height={H} fill="#24394A" />
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1={0} y1={((i * 80 + shaft) % (H + 80)) - 40} x2={W / 2} y2={((i * 80 + shaft) % (H + 80)) - 40} stroke="#2E485A" strokeWidth={2} />)}
        </svg>
      </AbsoluteFill>
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 140, textAlign: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 220, lineHeight: 1, color: C.marigold, fontVariationSettings: '"wdth" 75', fontVariantNumeric: 'tabular-nums',
        opacity: interpolate(frame, [110, 140], [1, 0], clamp), scale: `${interpolate(frame, [100, 110], [1, 1.08], clamp)}`,
      }}>{f}</div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, opacity: interpolate(frame, [100, 120], [1, 0], clamp) }}>
        <path d={`M${W / 2 - 18} 118 l18 -26 l18 26 z`} fill={C.marigold} opacity={0.5 + 0.5 * Math.sin(frame / 4)} />
      </svg>
    </AbsoluteFill>
  );
}
export const PROMOTION_FRAMES = 180;

// ---------------- 4. Evening recap ----------------

export function Recap({ n = 1, items = [], evidence = [], floor = 6, title = '' }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shown = items.slice(0, 8);
  return (
    <AbsoluteFill style={{ background: C.river, overflow: 'hidden' }}>
      <Sky />
      <Tower floor={floor} riseFrom={-100} lightFrom={-100} x={1000} />
      <River />
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(10,20,26,.95) 0%, rgba(10,20,26,.8) 60%, rgba(10,20,26,0) 100%)' }} />
      <Sequence from={0} premountFor={fps}>
        <Words text={`Day ${n}, settled.`} from={0} size={72} y={64} />
        <div style={{ position: 'absolute', left: 96, top: 170, display: 'grid', gap: 12, width: 720 }}>
          {shown.map((it, i) => {
            const at = 20 + i * 12;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, opacity: interpolate(frame, [at, at + 10], [0, 1], clamp), translate: `${interpolate(frame, [at, at + 20], [-30, 0], { ...clamp, easing: outExpo })}px 0px` }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 26, background: C.marigold, color: '#1C1204', display: 'grid', placeItems: 'center', fontFamily: DISPLAY, fontWeight: 800, fontSize: 28,
                  scale: `${interpolate(frame, [at + 6, at + 16], [1.8, 1], { ...clamp, easing: push })}`, rotate: `${interpolate(frame, [at + 6, at + 16], [-14, -6], clamp)}deg`,
                }}>{it.g}</div>
                <div style={{ fontFamily: UI, fontSize: 26, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.t}</div>
              </div>
            );
          })}
        </div>
        {evidence.length ? <Line text={`Evidence earned: ${evidence.join(', ')}`} from={30 + shown.length * 12} y={190 + shown.length * 64} size={24} color={C.marigold} weight={600} /> : null}
        <Line text={title ? `${title}, Floor ${floor}` : `Floor ${floor}`} from={50 + shown.length * 12} y={640} size={22} />
      </Sequence>
    </AbsoluteFill>
  );
}
export const recapFrames = (k) => 90 + Math.min(8, k) * 12;

// ---------------- spoken line: a recorded voice with a live portrait and word-by-word captions ----------------
// Props: { portrait: svg markup or '', name, role, accent, pal: [wall, floor, accent, light], env: '0-9 digits at 15/s',
//          sents: [[startSec, text]], dur, src: blob URL or '', kind: 'ask' | 'answer' | 'line', volume }

export const spokenFrames = (dur) => Math.max(60, Math.ceil((dur || 2) * FPS) + 24);

function envAt(env, sec) {
  if (!env) return 0;
  const i = Math.max(0, Math.min(env.length - 1, Math.floor(sec * 15)));
  const j = Math.min(env.length - 1, i + 1);
  const f = sec * 15 - Math.floor(sec * 15);
  return ((+env[i] || 0) * (1 - f) + (+env[j] || 0) * f) / 9;
}

/** Split sentences into words with estimated start times (by character share inside each sentence). */
function timedWords(sents, dur) {
  const out = [];
  sents.forEach(([t0, text], si) => {
    const t1 = si + 1 < sents.length ? sents[si + 1][0] - 0.18 : dur;
    const words = String(text).split(/\s+/).filter(Boolean);
    const total = words.reduce((n, w) => n + w.length + 1, 0) || 1;
    let acc = 0;
    for (const w of words) { out.push({ w, t: t0 + (acc / total) * (t1 - t0), s: si }); acc += w.length + 1; }
  });
  return out;
}

export function Spoken({ portrait = '', name = '', role = '', pal = ['#1C3440', '#14262E', '#F2A93B', '#E6EEF0'], env = '', sents = [], dur = 2, src = '', kind = 'line', volume = 0.9, mono = 'T+10', AudioEl = null }) {
  const frame = useCurrentFrame();
  const { width: VW, height: VH } = useVideoConfig();
  const tall = VH > VW;
  const sec = frame / FPS;
  const level = envAt(env, sec);
  const smooth = (envAt(env, sec - 0.05) + level + envAt(env, sec + 0.05)) / 3;
  const words = timedWords(sents, dur);
  const curS = Math.max(0, sents.reduce((k, s, i) => (sec >= s[0] - 0.05 ? i : k), 0));
  const inS = words.filter(w => w.s === curS);
  const enter = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: outExpo });
  const accent = kind === 'answer' ? C.marigold : (pal[2] || C.marigold);
  const R = tall ? 170 : 190;
  const cx = tall ? VW / 2 : 360, cy = tall ? 270 : 360;
  const bars = 56;
  const isCoach = !portrait;
  return (
    <AbsoluteFill style={{ background: C.river, fontFamily: UI }}>
      <svg width={VW} height={VH} viewBox={`0 0 ${VW} ${VH}`} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="spGlow" cx={tall ? '50%' : '28%'} cy={tall ? '22%' : '50%'} r="60%">
            <stop offset="0%" stopColor={accent} stopOpacity={0.16 + smooth * 0.12} />
            <stop offset="70%" stopColor={C.river} stopOpacity="0" />
          </radialGradient>
          <clipPath id="spClip"><circle cx={cx} cy={cy} r={R} /></clipPath>
        </defs>
        <rect width={VW} height={VH} fill={C.river} />
        <rect width={VW} height={VH} fill="url(#spGlow)" />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={0} x2={VW} y1={(tall ? 1040 : 560) + i * 18 + Math.sin(frame / 20 + i) * 3} y2={(tall ? 1040 : 560) + i * 18 + Math.cos(frame / 24 + i) * 3} stroke={C.line} strokeOpacity={0.35 - i * 0.03} strokeWidth={1} />
        ))}
        {/* voice ring: bars around the portrait follow the recording's loudness */}
        <g transform={`translate(${cx} ${cy})`} opacity={enter}>
          {Array.from({ length: bars }, (_, i) => {
            const a = (i / bars) * Math.PI * 2;
            const local = envAt(env, sec - (i % 7) * 0.02);
            const len = 8 + local * 46 * (0.6 + 0.4 * Math.sin(i * 1.7 + frame / 6) ** 2);
            return <line key={i} x1={Math.cos(a) * (R + 14)} y1={Math.sin(a) * (R + 14)} x2={Math.cos(a) * (R + 14 + len)} y2={Math.sin(a) * (R + 14 + len)} stroke={accent} strokeOpacity={0.35 + local * 0.6} strokeWidth={4} strokeLinecap="round" />;
          })}
          <circle r={R + 4} fill="none" stroke={accent} strokeOpacity={0.5} strokeWidth={2} />
        </g>
        <g clipPath="url(#spClip)" opacity={enter}>
          <rect x={cx - R} y={cy - R} width={R * 2} height={R * 2} fill={pal[0]} />
          <rect x={cx - R} y={cy + R * 0.35} width={R * 2} height={R} fill={pal[1]} opacity={0.6} />
        </g>
      </svg>
      {isCoach ? (
        <div style={{ position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, display: 'grid', placeItems: 'center', opacity: enter }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: mono.length > 4 ? 96 : 120, color: C.river, letterSpacing: '-0.04em', fontVariationSettings: '"wdth" 75', transform: `scale(${1 + smooth * 0.06})` }}>{mono}</div>
        </div>
      ) : (
        <div style={{ position: 'absolute', left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: '50%', overflow: 'hidden', opacity: enter }}>
          <div style={{ position: 'absolute', left: '50%', bottom: -4, width: R * 1.9, transform: `translateX(-50%) translateY(${(1 - enter) * 30}px) rotate(${Math.sin(frame / 50) * 1.2}deg)` }}>
            <div style={{ position: 'relative' }}>
              <div dangerouslySetInnerHTML={{ __html: portrait }} style={{ width: '100%', lineHeight: 0 }} />
              {/* the mouth opens with the voice (portrait mouth sits at 100,118 in its 200x210 box) */}
              <svg viewBox="0 0 200 210" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <ellipse cx={100} cy={118.5} rx={6 + smooth * 3} ry={Math.max(0, smooth * 6.5 - 0.6)} fill="#4A2420" opacity={smooth > 0.08 ? 0.92 : 0} />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div style={tall ? { position: 'absolute', left: 56, right: 56, top: 500, bottom: 40, display: 'flex', flexDirection: 'column', gap: 24 } : { position: 'absolute', left: 640, right: 80, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 28 }}>
        <div style={{ opacity: enter, transform: `translateY(${(1 - enter) * 16}px)` }}>
          <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 40, color: C.ink, letterSpacing: '-0.02em', fontVariationSettings: '"wdth" 85' }}>{name}</div>
          <div style={{ fontSize: 24, color: C.mist, marginTop: 4 }}>{role}</div>
        </div>
        <div style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: tall ? 50 : 44, lineHeight: 1.18, letterSpacing: '-0.015em', fontVariationSettings: '"wdth" 92', minHeight: 260 }}>
          {inS.map((w, i) => {
            const on = interpolate(sec, [w.t - 0.04, w.t + 0.14], [0, 1], clamp);
            return <span key={curS + '-' + i} style={{ color: on > 0.5 ? C.ink : C.mist, opacity: 0.38 + on * 0.62, display: 'inline-block', marginRight: '0.26em', transform: `translateY(${(1 - on) * 6}px)` }}>{w.w}</span>;
          })}
        </div>
        <div style={{ display: 'flex', gap: 8, opacity: 0.85 }}>
          {sents.map((_, i) => <div key={i} style={{ height: 4, flex: 1, maxWidth: 60, borderRadius: 4, background: i < curS ? accent : i === curS ? C.ink : C.line }} />)}
        </div>
      </div>
      {src && AudioEl ? <AudioEl src={src} volume={volume} /> : null}
    </AbsoluteFill>
  );
}
