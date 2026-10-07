// Rắn công sở cinematics: a stakeholder turns into a snake and strikes, you become a snake, you shed your skin,
// a snake is charmed back. Frame-driven (Remotion), with squash and stretch, anticipation, hit-stop and shake.
import { createElement } from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Easing } from 'remotion';
import { snakeTree, renderTree, PLAYER_LOOK } from './snake-art.js';

const C = { river: '#0A141A', river2: '#10202A', river3: '#183040', line: '#2A4654', ink: '#E6EEF0', mist: '#9FB5BD', marigold: '#F2A93B', venom: '#7BD66B', coral: '#F08A72' };
const DISPLAY = '"Bricolage Grotesque", "Be Vietnam Pro", system-ui, sans-serif';
const UI = '"Be Vietnam Pro", system-ui, sans-serif';
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const outExpo = Easing.bezier(0.16, 1, 0.3, 1);
const inBack = Easing.bezier(0.36, 0, 0.66, -0.56);

export const STRIKE_FRAMES = 132, BECOME_FRAMES = 168, SHED_FRAMES = 138, CHARM_FRAMES = 96;

/** Frames at which each film plays a sound effect (cinema.js fires them as the Player passes). */
export const SFX = {
  strike: [[8, 'hiss'], [30, 'poof'], [40, 'rattle'], [66, 'strike'], [78, 'venom']],
  become: [[14, 'slither'], [56, 'transform'], [104, 'stamp'], [112, 'hiss']],
  shed: [[12, 'shed'], [52, 'poof'], [64, 'good']],
  charm: [[6, 'rattle'], [26, 'poof'], [40, 'good']],
};

function Snake({ look, mouth = 0, tongue = 0, blink = 0, sway = 0, id = 'c', badge = true, size = 360 }) {
  const tree = snakeTree(look, { mouth, tongue, blink, sway, id, badge });
  tree[1] = { ...tree[1], width: size, height: size * 1.05, style: { display: 'block', overflow: 'visible' } };
  return renderTree(tree, (tag, a, ...k) => {
    const props = {};
    for (const [key, v] of Object.entries(a)) {
      if (v == null) continue;
      const rk = key === 'class' ? 'className' : key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      props[rk] = v;
    }
    if (props.ariaLabel) { props['aria-label'] = props.ariaLabel; delete props.ariaLabel; }
    return createElement(tag, props, ...k);
  });
}

function Face({ html, size = 360 }) {
  return <div style={{ width: size, height: size * 1.05, lineHeight: 0 }} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** The room behind the action: the place's wall colour, a floor line, soft vignette. */
function Room({ pal = ['#1C3440', '#14262E', '#F2A93B', '#E6EEF0'], tint = 0, flash = 0 }) {
  const { width: W, height: H } = useVideoConfig();
  return (
    <AbsoluteFill>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <radialGradient id="rmV" cx="50%" cy="46%" r="70%"><stop offset="40%" stopColor="#000" stopOpacity="0" /><stop offset="100%" stopColor="#000" stopOpacity="0.55" /></radialGradient>
          <pattern id="rmScales" width="44" height="30" patternUnits="userSpaceOnUse"><path d="M0 30 Q22 2 44 30" fill="none" stroke={C.venom} strokeOpacity="0.5" strokeWidth="2" /></pattern>
        </defs>
        <rect width={W} height={H} fill={C.river} />
        <rect width={W} height={H * 0.72} fill={pal[0]} opacity={0.22} />
        <rect y={H * 0.72} width={W} height={H * 0.28} fill={pal[1]} opacity={0.3} />
        <rect width={W} height={H} fill="url(#rmScales)" opacity={tint * 0.6} />
        <rect width={W} height={H} fill={C.venom} opacity={tint * 0.12} />
        <rect width={W} height={H} fill="url(#rmV)" />
        <rect width={W} height={H} fill="#FFFFFF" opacity={flash} />
      </svg>
    </AbsoluteFill>
  );
}

function Drops({ filled, max = 4, fresh = -1, frame, at, x, y, size = 30 }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, display: 'flex', gap: size * 0.4, alignItems: 'flex-end' }}>
      {Array.from({ length: max }, (_, i) => {
        const on = i < filled;
        const pop = i === fresh ? spring({ frame: frame - at, fps: 30, config: { damping: 9, stiffness: 180 } }) : 1;
        return (
          <svg key={i} width={size} height={size * 1.3} viewBox="0 0 20 26" style={{ transform: `scale(${i === fresh ? 0.4 + 0.6 * pop : 1})`, transformOrigin: '50% 100%' }}>
            <path d="M10 1 C 10 1, 1 12, 1 17 a 9 9 0 0 0 18 0 C 19 12, 10 1, 10 1 Z" fill={on ? C.venom : 'none'} stroke={on ? '#2E6B2A' : C.mist} strokeWidth="1.6" />
            {on ? <circle cx="6.5" cy="15" r="2" fill="#FFFFFF" opacity="0.6" /> : null}
          </svg>
        );
      })}
    </div>
  );
}

function Title({ text, sub, frame, at, y = 70, size = 64, color = C.ink, align = 'center' }) {
  const t = spring({ frame: frame - at, fps: 30, config: { damping: 12, stiffness: 160 } });
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: y, textAlign: align, opacity: interpolate(frame, [at, at + 6], [0, 1], clamp), transform: `scale(${0.6 + 0.4 * t}) rotate(${(1 - t) * -4}deg)` }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: size, color, letterSpacing: '-0.03em', lineHeight: 1.02, fontVariationSettings: '"wdth" 80', textShadow: '0 4px 0 rgba(0,0,0,.25)' }}>{text}</div>
      {sub ? <div style={{ fontFamily: UI, fontSize: size * 0.4, color: C.mist, marginTop: 10 }}>{sub}</div> : null}
    </div>
  );
}

function Puff({ frame, at, x, y, color = '#E8F2EA' }) {
  const p = interpolate(frame, [at, at + 16], [0, 1], { ...clamp, easing: outExpo });
  if (frame < at || frame > at + 22) return null;
  return (
    <svg style={{ position: 'absolute', left: x - 220, top: y - 220 }} width={440} height={440} viewBox="-220 -220 440 440">
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const r = 40 + p * 140;
        return <circle key={i} cx={Math.cos(a) * r} cy={Math.sin(a) * r * 0.8} r={46 * (1 - p) + 10} fill={color} opacity={1 - p} />;
      })}
      <circle r={90 * (1 - p)} fill={color} opacity={0.9 * (1 - p)} />
    </svg>
  );
}

const shakeAt = (frame, from, dur, amp) => {
  if (frame < from || frame > from + dur) return [0, 0];
  const k = 1 - (frame - from) / dur;
  return [Math.sin(frame * 2.7) * amp * k, Math.cos(frame * 3.3) * amp * k];
};

// ---------------- a stakeholder turns and strikes ----------------

export function SnakeStrike({ portrait = '', look, name = 'Someone', pal, venomBefore = 0, venomAfter = 1, max = 4, practice = false, trap = '' }) {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const tall = H > W, cx = W / 2, base = H * (tall ? 0.77 : 0.97);
  // human: jitter and green creep, then gone in the puff
  const creep = interpolate(frame, [10, 30], [0, 1], clamp);
  const [jx, jy] = shakeAt(frame, 12, 18, 6 * creep + 1);
  const humanOut = interpolate(frame, [28, 34], [1, 0], clamp);
  // snake: pops up with squash and stretch, sways, pulls back, lunges, recoils
  const pop = spring({ frame: frame - 30, fps: 30, config: { damping: 7, stiffness: 140 } });
  const squash = frame < 30 ? 0 : 1 + Math.sin(Math.min(1, (frame - 30) / 14) * Math.PI) * 0.18 * (1 - Math.min(1, (frame - 30) / 20));
  const pull = interpolate(frame, [54, 64], [0, 1], { ...clamp, easing: inBack });
  const lunge = interpolate(frame, [64, 69], [0, 1], { ...clamp, easing: outExpo });
  const hold = frame >= 69 && frame <= 73; // hit-stop
  const recoil = interpolate(frame, [74, 92], [0, 1], { ...clamp, easing: outExpo });
  const strikeAmt = Math.max(0, lunge - recoil);
  const scale = (0.2 + 0.8 * pop) * (1 - 0.08 * pull * (1 - lunge)) * (1 + 1.6 * strikeAmt);
  const ty = 18 * pull * (1 - lunge) - 120 * strikeAmt;
  const sway = Math.sin(frame / 7) * 5 * (1 - strikeAmt);
  const tongue = (frame >= 38 && frame <= 50) || frame >= 96 ? (Math.sin(frame * 1.4) + 1) / 2 : 0;
  const mouth = Math.max(strikeAmt * 1.1, interpolate(frame, [58, 64], [0, 0.3], clamp) * (1 - recoil));
  const flash = hold ? 0.85 - (frame - 69) * 0.2 : 0;
  const [sx, sy] = shakeAt(frame, 69, 16, 26);
  const stamp = spring({ frame: frame - 72, fps: 30, config: { damping: 8, stiffness: 220 } });
  const size = 500;
  return (
    <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px)`, fontFamily: UI }}>
      <Room pal={pal} tint={creep * (1 - recoil * 0.5)} flash={Math.max(0, flash)} />
      {humanOut > 0 ? (
        <div style={{ position: 'absolute', left: cx - size / 2 + jx, top: base - size * 1.05 + jy, opacity: humanOut, filter: `hue-rotate(${creep * 70}deg) saturate(${1 + creep})`, transform: `scaleY(${1 - creep * 0.06})`, transformOrigin: '50% 100%' }}>
          <Face html={portrait} size={size} />
        </div>
      ) : null}
      <Puff frame={frame} at={28} x={cx} y={base - size * 0.5} />
      {frame >= 30 ? (
        <div style={{ position: 'absolute', left: cx - size / 2, top: base - size * 1.05, transform: `translateY(${ty}px) scale(${scale * (2 - squash)}, ${scale * squash})`, transformOrigin: '50% 100%' }}>
          <Snake look={look} mouth={mouth} tongue={tongue} sway={sway} blink={frame % 46 > 43 ? 1 : 0} id="strk" size={size} />
        </div>
      ) : null}
      {frame >= 70 && frame <= 100 ? (
        <svg style={{ position: 'absolute', inset: 0 }} width={W} height={H}>
          {[[-1, -0.3], [1, -0.5], [-0.7, 0.6], [0.8, 0.5], [0, -1]].map(([dx, dy], i) => (
            <path key={i} d={`M${cx} ${H * 0.42} l${dx * 120} ${dy * 90} l${dx * 30 - 14} ${dy * 40 + 10} l${dx * 60} ${dy * 50}`} stroke="#FFFFFF" strokeWidth={5} fill="none" opacity={interpolate(frame, [70, 100], [0.9, 0], clamp)} />
          ))}
        </svg>
      ) : null}
      <Title frame={frame} at={36} y={36} size={56} text={`${name} turned into a snake`} sub={trap ? `Snake trap: ${trap}` : 'Rắn công sở!'} />
      {frame >= 72 ? (
        <div style={{ position: 'absolute', right: tall ? 40 : 90, top: H * (tall ? 0.3 : 0.36), transform: `scale(${2.2 - 1.2 * stamp}) rotate(-9deg)`, opacity: interpolate(frame, [72, 75], [0, 1], clamp), fontFamily: DISPLAY, fontWeight: 800, fontSize: 92, color: C.venom, letterSpacing: '-0.03em', WebkitTextStroke: '3px #12301A', fontVariationSettings: '"wdth" 75' }}>
          {practice ? 'HISS!' : <span style={{ display: 'grid', justifyItems: 'center', lineHeight: 0.9 }}><span>+1</span><span style={{ fontSize: 64 }}>NỌC</span></span>}
        </div>
      ) : null}
      <Drops frame={frame} at={78} filled={practice ? venomBefore : venomAfter} max={max} fresh={practice ? -1 : venomAfter - 1} x={tall ? 60 : 90} y={tall ? H * 0.785 : H - 110} size={34} />
      <div style={{ position: 'absolute', left: tall ? 60 : 90, right: tall ? 60 : undefined, bottom: 34, fontSize: tall ? 30 : 24, color: C.mist, opacity: interpolate(frame, [84, 96], [0, 1], clamp) }}>
        {practice ? 'Practice run: no venom this time.' : `Venom ${venomAfter} of ${max}. Replay this scene at B or better to charm ${name} back.`}
      </div>
    </AbsoluteFill>
  );
}

// ---------------- you become an office snake ----------------

export function Becoming({ portrait = '', name = 'You', max = 4 }) {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const tall = H > W, cx = W / 2, base = H * (tall ? 0.77 : 0.97), size = 500;
  const zoom = interpolate(frame, [0, 50], [1, 1.12], { ...clamp, easing: outExpo });
  const wipe = interpolate(frame, [16, 56], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const [jx, jy] = shakeAt(frame, 30, 30, 8);
  const humanOut = interpolate(frame, [56, 62], [1, 0], clamp);
  const rise = spring({ frame: frame - 60, fps: 30, config: { damping: 6, stiffness: 110 } });
  const sq = frame < 60 ? 1 : 1 + 0.22 * Math.sin(Math.min(1, (frame - 60) / 16) * Math.PI) * (1 - Math.min(1, (frame - 60) / 26));
  const tongue = frame > 80 ? (Math.sin(frame * 1.2) + 1) / 2 * (frame % 60 < 18 ? 1 : 0) : 0;
  const [sx, sy] = shakeAt(frame, 104, 12, 14);
  return (
    <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px)`, fontFamily: UI }}>
      <Room tint={wipe} flash={frame >= 58 && frame <= 61 ? 0.7 : 0} />
      <Drops frame={frame} at={0} filled={max} max={max} x={tall ? 60 : 90} y={tall ? H * 0.785 : H - 150} size={34} />
      {humanOut > 0 ? (
        <div style={{ position: 'absolute', left: cx - size / 2 + jx, top: base - size * 1.05 + jy, opacity: humanOut, transform: `scale(${zoom})`, transformOrigin: '50% 100%' }}>
          <Face html={portrait} size={size} />
          {/* scales climb from the shoes up */}
          <svg style={{ position: 'absolute', inset: 0 }} width={size} height={size * 1.05} viewBox="0 0 200 210">
            <defs>
              <pattern id="bcS" width="10" height="8" patternUnits="userSpaceOnUse"><rect width="10" height="8" fill="#5FAE5A" /><path d="M0 8 Q5 1 10 8" fill="none" stroke="#2E6B2A" strokeWidth="1.4" /></pattern>
              <clipPath id="bcC"><rect x="0" y={210 - 210 * wipe} width="200" height={210 * wipe} /></clipPath>
            </defs>
            <g clipPath="url(#bcC)" opacity="0.88"><path d="M18 210 C18 164 58 144 100 144 C142 144 182 164 182 210 Z M65 92 a35 42 0 1 0 70 0 a35 42 0 1 0 -70 0" fill="url(#bcS)" /></g>
          </svg>
        </div>
      ) : null}
      <Puff frame={frame} at={56} x={cx} y={base - size * 0.5} color="#CFF1C8" />
      {frame >= 60 ? (
        <div style={{ position: 'absolute', left: cx - size / 2, top: base - size * 1.05, transform: `scale(${(0.3 + 0.7 * rise) * (2 - sq)}, ${(0.3 + 0.7 * rise) * sq})`, transformOrigin: '50% 100%' }}>
          <Snake look={PLAYER_LOOK} tongue={tongue} sway={Math.sin(frame / 8) * 4} blink={frame % 52 > 49 ? 1 : 0} id="bcm" size={size} />
        </div>
      ) : null}
      <Title frame={frame} at={104} y={60} size={76} color={C.venom} text="Bạn đã thành Rắn Công Sở!" sub={`${name}, you became an office snake.`} />
      <div style={{ position: 'absolute', left: tall ? 60 : 90, right: tall ? 60 : 90, bottom: 30, textAlign: 'left', fontSize: tall ? 30 : 24, color: C.ink, opacity: interpolate(frame, [124, 140], [0, 1], clamp) }}>
        To shed your skin, charm stakeholders back until one drop of venom or fewer is left.
      </div>
    </AbsoluteFill>
  );
}

// ---------------- you shed your skin ----------------

export function Shed({ portrait = '', name = 'You' }) {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const tall = H > W, cx = W / 2, base = H * (tall ? 0.77 : 0.97), size = 480;
  const crack = interpolate(frame, [8, 44], [0, 1], clamp);
  const [jx, jy] = shakeAt(frame, 10, 34, 5 * crack + 1);
  const slide = interpolate(frame, [48, 84], [0, 1], { ...clamp, easing: outExpo });
  const pop = spring({ frame: frame - 52, fps: 30, config: { damping: 8, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ fontFamily: UI }}>
      <Room tint={1 - slide} flash={frame >= 50 && frame <= 52 ? 0.6 : 0} />
      {/* the old skin slides away, a ghost of the snake */}
      <div style={{ position: 'absolute', left: cx - size / 2 + jx - slide * 420, top: base - size * 1.05 + jy + slide * 30, opacity: 1 - slide * 0.85, transform: `rotate(${-slide * 14}deg)`, transformOrigin: '50% 100%', filter: frame > 48 ? 'saturate(0.2) brightness(1.4)' : 'none' }}>
        <Snake look={PLAYER_LOOK} sway={Math.sin(frame / 6) * 3} id="shd" size={size} />
        <svg style={{ position: 'absolute', inset: 0 }} width={size} height={size * 1.05} viewBox="0 0 200 210">
          {['M100 40 L92 64 L104 78 L96 100', 'M70 160 L84 170 L78 184 L92 194', 'M130 150 L118 166 L128 178', 'M60 90 L74 96 L70 110', 'M140 86 L126 98 L134 112'].map((d, i) => (
            <path key={i} d={d} stroke="#FFFFFF" strokeWidth="2.6" fill="none" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - Math.min(1, crack * 1.6 - i * 0.12)} />
          ))}
        </svg>
      </div>
      {frame >= 52 ? (
        <div style={{ position: 'absolute', left: cx - size / 2 + 60, top: base - size * 1.05, transform: `scale(${0.2 + 0.8 * pop})`, transformOrigin: '50% 100%' }}>
          <Face html={portrait} size={size} />
        </div>
      ) : null}
      {frame >= 56 ? Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2, t = interpolate(frame, [56, 90], [0, 1], { ...clamp, easing: outExpo });
        return <div key={i} style={{ position: 'absolute', left: cx + 60 + Math.cos(a) * 230 * t, top: base - size * 0.6 + Math.sin(a) * 180 * t, width: 14, height: 14, background: C.marigold, transform: `rotate(45deg) scale(${1 - t})`, borderRadius: 3 }} />;
      }) : null}
      <Title frame={frame} at={62} y={60} size={84} color={C.marigold} text="Lột xác!" sub={`${name}, you shed your skin. Human again.`} />
    </AbsoluteFill>
  );
}

// ---------------- a snake is charmed back ----------------

export function Charm({ portrait = '', look, name = 'Someone' }) {
  const frame = useCurrentFrame();
  const { width: W, height: H } = useVideoConfig();
  const tall = H > W, cx = W / 2, base = H * (tall ? 0.77 : 0.97), size = 460;
  const spin = interpolate(frame, [0, 26], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const pop = spring({ frame: frame - 28, fps: 30, config: { damping: 8, stiffness: 170 } });
  return (
    <AbsoluteFill style={{ fontFamily: UI }}>
      <Room tint={1 - spin} />
      {frame < 28 ? (
        <div style={{ position: 'absolute', left: cx - size / 2, top: base - size * 1.05, transform: `rotate(${spin * 540}deg) scale(${1 - spin * 0.9})`, transformOrigin: '50% 60%' }}>
          <Snake look={look} sway={Math.sin(frame / 3) * 8} id="chm" size={size} />
        </div>
      ) : null}
      <Puff frame={frame} at={24} x={cx} y={base - size * 0.5} color="#FFE7B8" />
      {frame >= 28 ? (
        <div style={{ position: 'absolute', left: cx - size / 2, top: base - size * 1.05, transform: `scale(${0.3 + 0.7 * pop})`, transformOrigin: '50% 100%' }}>
          <Face html={portrait} size={size} />
        </div>
      ) : null}
      <Title frame={frame} at={36} y={50} size={60} color={C.marigold} text={`${name} is human again`} sub="Charmed back. Venom down one drop." />
    </AbsoluteFill>
  );
}
