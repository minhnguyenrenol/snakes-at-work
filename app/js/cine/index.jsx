// Mount a Remotion Player for one cinematic moment. Returns a controller; the page works without it.
import { createRoot } from 'react-dom/client';
import { useEffect, useRef } from 'react';
import { Player, Thumbnail } from '@remotion/player';
import { Html5Audio } from 'remotion';
import { SnakeStrike, Becoming, Shed, Charm, STRIKE_FRAMES, BECOME_FRAMES, SHED_FRAMES, CHARM_FRAMES } from './snakes.jsx';
import { Opening, OPENING_FRAMES, DayCard, DAYCARD_FRAMES, Promotion, PROMOTION_FRAMES, Recap, recapFrames, Spoken, spokenFrames, W, H, FPS } from './compositions.jsx';

const KINDS = {
  opening: { component: Opening, frames: () => OPENING_FRAMES },
  day: { component: DayCard, frames: () => DAYCARD_FRAMES },
  promotion: { component: Promotion, frames: () => PROMOTION_FRAMES },
  recap: { component: Recap, frames: p => recapFrames((p.items || []).length) },
  strike: { component: SnakeStrike, frames: () => STRIKE_FRAMES, size: p => (p.tall ? [720, 1080] : [W, H]) },
  become: { component: Becoming, frames: () => BECOME_FRAMES, size: p => (p.tall ? [720, 1080] : [W, H]) },
  shed: { component: Shed, frames: () => SHED_FRAMES, size: p => (p.tall ? [720, 1080] : [W, H]) },
  charm: { component: Charm, frames: () => CHARM_FRAMES, size: p => (p.tall ? [720, 1080] : [W, H]) },
  spoken: { component: Spoken, frames: p => spokenFrames(p.dur), controls: true, extra: { AudioEl: Html5Audio }, size: p => (p.tall ? [720, 1080] : [W, H]) },
};

function Cine({ kind, props, still, onEnded, onFrame, host }) {
  const ref = useRef(null);
  const K = KINDS[kind];
  const frames = K.frames(props);
  useEffect(() => {
    const p = ref.current;
    if (!p || still) return undefined;
    // Hold on the last frame when the clip ends; the Player would otherwise snap back to frame 0.
    const end = () => { host.dataset.state = 'ended'; try { p.pause(); p.seekTo(frames - 1); } catch { /* best effort */ } onEnded?.(); };
    const tick = e => { host.dataset.frame = String(e.detail.frame); onFrame?.(e.detail.frame); };
    p.addEventListener('ended', end);
    p.addEventListener('frameupdate', tick);
    return () => { p.removeEventListener('ended', end); p.removeEventListener('frameupdate', tick); };
  }, [still, onEnded, frames]);
  const style = { width: '100%', height: '100%' };
  const input = K.extra ? { ...props, ...K.extra } : props;
  const [cw, ch] = K.size ? K.size(props) : [W, H];
  if (still) return <Thumbnail component={K.component} inputProps={input} durationInFrames={frames} compositionWidth={cw} compositionHeight={ch} fps={FPS} frameToDisplay={frames - 1} style={style} />;
  return (
    <Player ref={ref} component={K.component} inputProps={input} durationInFrames={frames} compositionWidth={cw} compositionHeight={ch} fps={FPS}
      autoPlay controls={!!K.controls} clickToPlay={!!K.controls} style={style} acknowledgeRemotionLicense />
  );
}

/**
 * playCine(host, kind, props, { still, onEnded }) mounts into host (a .cine element).
 * still: render the final frame only (reduced motion). Returns { unmount }.
 */
export function playCine(host, kind, props, { still = false, onEnded, onFrame } = {}) {
  try {
    const root = createRoot(host);
    root.render(<Cine kind={kind} props={props} still={still} onEnded={onEnded} onFrame={onFrame} host={host} />);
    return { unmount: () => { try { root.unmount(); } catch { /* already gone */ } } };
  } catch {
    onEnded?.();
    return { unmount() {} };
  }
}
