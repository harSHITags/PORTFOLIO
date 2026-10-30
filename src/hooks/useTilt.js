import { useEffect, useRef } from 'react';
import { useFinePointer, useReducedMotion } from './useMedia.js';

// Pointer-responsive tilt written straight to CSS variables (--rx / --ry) so pointer
// movement never triggers React re-renders. Does nothing on touch devices or when
// the user prefers reduced motion.
export function useTilt(max = 6) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduce) return undefined;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
        el.style.setProperty('--tx', x.toFixed(3));
        el.style.setProperty('--ty', y.toFixed(3));
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      ['--rx', '--ry'].forEach((p) => el.style.setProperty(p, '0deg'));
      ['--tx', '--ty'].forEach((p) => el.style.setProperty(p, '0'));
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [fine, reduce, max]);

  return ref;
}
