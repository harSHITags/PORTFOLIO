import { useInView } from '../hooks/useInView.js';

// Fade-and-rise on first scroll into view. `delay` is a stagger index (90ms steps).
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, style, children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag ref={ref} className={`rv${inView ? ' in' : ''} ${className}`.trim()} style={{ '--i': delay, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
