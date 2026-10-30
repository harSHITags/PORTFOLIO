import { aboutFacts, aboutRows } from '../data/site.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

export default function About() {
  return (
    <section id="about">
      <div className="wrap about">
        <Reveal className="stick">
          <span className="kicker">About</span>
          <h2>Backend first.<br /><em>AI on top.</em></h2>
          <p className="lede">
            I'm a 2026 Computer Science Engineering graduate from Medi-Caps University, Indore, focused on Python backend development. I have hands-on experience building API-driven applications using FastAPI, SQL, and PostgreSQL. Through internships and projects, I've also worked with LLM integrations, RAG pipelines, vector search, and multi-agent workflows. I enjoy understanding how backend systems work and building practical applications that combine reliable APIs with useful AI capabilities.
          </p>
          <div className="facts">
            {aboutFacts.map((f) => (
              <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>
            ))}
          </div>
        </Reveal>

        <div>
          {aboutRows.map((r, i) => (
            <Reveal className="row" delay={i % 3} key={r.title}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <div><h3>{r.title}</h3><p>{r.text}</p></div>
              <div className="logos">{r.icons.map((k) => <Icon key={k} name={k} />)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
