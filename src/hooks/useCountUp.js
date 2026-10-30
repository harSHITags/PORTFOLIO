import { useEffect, useState } from 'react';
import { useInView } from './useInView.js';
import { useReducedMotion } from './useMedia.js';

// Counts from 0 to `to` once the element scrolls into view. Final value is the initial render,
// so text is correct for reduced-motion users and before hydration of the animation.
export function useCountUp(to, { decimals = 0, prefix = '', suffix = '', duration = 1400 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const reduce = useReducedMotion();
  const final = `${prefix}${to.toFixed(decimals)}${suffix}`;
  const [text, setText] = useState(final);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / duration);
      const v = to * (1 - Math.pow(1 - k, 3));
      setText(`${prefix}${v.toFixed(decimals)}${suffix}`);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to, decimals, prefix, suffix, duration]);

  return [ref, text];
}
