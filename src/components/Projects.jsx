import { useEffect, useState } from 'react';
import { projects, ragDemo } from '../data/projects.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { useInView } from '../hooks/useInView.js';
import { useReducedMotion } from '../hooks/useMedia.js';
import { useTilt } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { TechFlow } from './TechChips.jsx';

function Metric({ to, decimals, prefix, suffix, label, text: fixed }) {
  const [ref, text] = useCountUp(to ?? 0, { decimals, prefix, suffix });
  return (
    <div>
      <div className="big">{fixed ? <span>{fixed}</span> : <span ref={ref}>{text}</span>}</div>
      <span>{label}</span>
    </div>
  );
}

function Frame({ title, delay = 0, children }) {
  const tilt = useTilt(5);
  return (
    <Reveal className="frame-wrap" delay={delay}>
      <div className="frame" ref={tilt}>
        <div className="bar">
          <i /><i /><i />
          <span>{title}</span>
          <em>illustrative preview</em>
        </div>
        <div className="fbody">{children}</div>
      </div>
    </Reveal>
  );
}

function RagPreview() {
  const [mode, setMode] = useState('rag');
  const [typed, setTyped] = useState(ragDemo.answer);
  const [typing, setTyping] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [ref, inView] = useInView({ threshold: 0.4 });
  const reduce = useReducedMotion();
  const agents = ragDemo.agents;

  // Typewriter for the RAG answer, started when the preview scrolls into view.
  useEffect(() => {
    if (mode !== 'rag' || !inView) return undefined;
    if (reduce) { setTyped(ragDemo.answer); setTyping(false); return undefined; }
    let i = 0;
    setTyped('');
    setTyping(true);
    const t = setInterval(() => {
      i += 1;
      setTyped(ragDemo.answer.slice(0, i));
      if (i >= ragDemo.answer.length) { clearInterval(t); setTyping(false); }
    }, 22);
    return () => clearInterval(t);
  }, [mode, inView, reduce]);

  // Steps through the four agents while Agent Mode is shown.
  useEffect(() => {
    if (mode !== 'agent') return undefined;
    if (reduce) { setIdx(agents.length); return undefined; }
    setIdx(0);
    const t = setInterval(() => setIdx((i) => (i + 1 > agents.length + 1 ? -1 : i + 1)), 1150);
    return () => clearInterval(t);
  }, [mode, reduce, agents.length]);

  const progress = Math.max(0, Math.min(idx, agents.length - 1)) / (agents.length - 1);

  return (
    <Frame title="retail-rag / chat">
      <div className="tabs" role="group" aria-label="Choose a mode">
        {[['rag', 'RAG mode'], ['agent', 'Agent Mode']].map(([m, label]) => (
          <button key={m} type="button" aria-pressed={mode === m} onClick={() => setMode(m)}>{label}</button>
        ))}
      </div>

      {mode === 'rag' ? (
        <div className="pane" ref={ref}>
          <div className="chat">
            <div className="msg u">{ragDemo.question}</div>
            <div className="msg a">
              <span className={typing ? 'cursor' : undefined}>{typed}</span>
              <div className="src">{ragDemo.sources.map((s) => <span key={s}>{s}</span>)}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="pane">
          <ol className="steps" style={{ '--p': progress }}>
            {agents.map(([name, note], i) => (
              <li key={name} className={`step${i < idx ? ' done' : ''}${i === idx ? ' now' : ''}`}>
                <span className="dot" />
                <div><strong>{name}</strong><small>{note}</small></div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Frame>
  );
}

// Illustrative sample rows: placeholder names, not real data.
const STOCK = [['Sample item A', 82, 'ok', 'In stock'], ['Sample item B', 46, 'ok', 'In stock'], ['Sample item C', 18, 'low', 'Low stock'], ['Sample item D', 0, 'out', 'Out of stock']];

function StockPreview() {
  return (
    <Frame title="stocksphere / inventory" delay={1}>
      <div className="dash">
        <div className="box">
          <h4>Your inventory · stock classification</h4>
          {STOCK.map(([name, w, state, label], k) => (
            <div key={name} className={`stk ${state}`} style={{ '--k': k, '--w': `${Math.max(w, 3)}%` }}>
              <span>{name}</span>
              <i />
              <em>{label}</em>
            </div>
          ))}
        </div>
        <div className="box">
          <h4>AI description</h4>
          <p className="aidesc">Short product copy drafted by Gemini from the item name.</p>
          <p className="note">+ inventory advice</p>
        </div>
      </div>
    </Frame>
  );
}

const PREVIEWS = { rag: RagPreview, stocksphere: StockPreview };

export default function Projects() {
  return (
    <section id="projects">
      <div className="wrap">
        <Reveal className="ph">
          <div><span className="kicker">Projects</span><h2>Software I've built</h2></div>
          <p className="lede" style={{ margin: 0 }}>Interface previews below are illustrations of each project, not screenshots or live data.</p>
        </Reveal>

        {projects.map((p) => {
          const Preview = PREVIEWS[p.kind];
          return (
            <article key={p.id} className={`proj${p.reverse ? ' rev' : ''}`}>
              <Preview />
              <Reveal className="info" delay={1}>
                <span className="pnum">{p.number}</span>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                {p.highlights && (
                  <ul className="proj-highlights">
                    {p.highlights.map((h) => <li key={h}>{h}</li>)}
                  </ul>
                )}
                <div className="metrics">{p.metrics.map((m) => <Metric key={m.label} {...m} />)}</div>
                <TechFlow items={p.flow} className="proj-flow" />
                {p.link && (
                  <a className="btn" href={p.link.href} target="_blank" rel="noopener noreferrer">
                    <Icon name="github" />
                    {p.link.label}
                  </a>
                )}
              </Reveal>
            </article>
          );
        })}
      </div>
    </section>
  );
}
