import { site } from '../data/site.js';
import { useTilt } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';
import Pines from './Pines.jsx';
import PortraitBlob from './PortraitBlob.jsx';

// Calm hero: typography + one layered, organic portrait. The only motion is a staggered entrance,
// a soft background drift, and a small pointer-driven tilt (fine pointers only).
export default function Hero() {
  const stageRef = useTilt(5);

  return (
    <section className="hero" id="top">
      <div className="aurora" aria-hidden="true"><i /><i /></div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="status fade" style={{ '--d': 0 }}>
            <b aria-hidden="true" />
            Open to Python Backend + AI Developer &amp; Backend Engineering + AI Roles
          </p>
          <h1 className="fade" style={{ '--d': 1 }}>
            <span>Harshita</span>
            <span className="grad">Rathore</span>
          </h1>
          <p className="headline fade" style={{ '--d': 2 }}>Behind every click, there's a system. I like building that system.</p>
          <p className="tech-line fade" style={{ '--d': 3 }}>
            FastAPI · PostgreSQL · Generative AI · RAG
          </p>
          <p className="sub fade" style={{ '--d': 4 }}>
            I work with Python and FastAPI to develop backend applications, integrating databases, APIs, and AI capabilities through RAG pipelines, LLM integrations, and agentic workflows.
         </p>
          <div className="cta fade" style={{ '--d': 5 }}>
            <a className="btn pri" href="#projects">Explore My Work</a>
            <a className="btn" href={site.resume} download="Harshita_Rathore_Resume.pdf">
              <Icon name="download" />
              Download Resume
            </a>
            <a className="btn ico-btn social" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Icon name="github" />
            </a>
            <a className="btn ico-btn social" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Icon name="linkedin" />
            </a>
          </div>
        </div>

        <div className="stage" ref={stageRef}>
          <div className="stage-tilt">
            <PortraitBlob src={site.portrait} alt={`Portrait of ${site.name}`} />
          </div>
          <p className="plate-tag">
            <strong>{site.name}</strong>
            <span>Python Backend Developer · {site.location}</span>
          </p>
        </div>
      </div>

      <Pines variant="hero" />
    </section>
  );
}
