import { experience } from '../data/experience.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import CredentialLinks from './CredentialLinks.jsx';
import Reveal from './Reveal.jsx';
import { TechChips } from './TechChips.jsx';

// Each bullet is [before, emphasised, after] or a single plain string.
function Point({ parts }) {
  return (
    <li>
      {parts.map((p, i) => (parts.length === 3 && i === 1 ? <b key={i}>{p}</b> : <span key={i}>{p}</span>))}
    </li>
  );
}

export default function Experience() {
  const jobsRef = useScrollProgress();
  return (
    <section id="experience">
      <div className="wrap xp">
        <Reveal className="stick">
          <span className="kicker">Experience</span>
          <h2>Where I've built things</h2>
          <p className="lede">Two internship experiences — one in applied GenAI and RAG systems, one introductory exposure to machine learning.</p>
          <div className="count" aria-hidden="true">{String(experience.length).padStart(2, '0')}</div>
        </Reveal>

        <div className="jobs" ref={jobsRef}>
          {experience.map((job) => (
            <Reveal as="article" className="job" key={job.title}>
              <span className="when">{job.when}</span>
              <h3>{job.title}</h3>
              <p className="org">{job.org}</p>
              <ul className="pts">
                {job.points.map((p, i) => <Point parts={p} key={i} />)}
              </ul>
              <TechChips items={job.tech} />
              <CredentialLinks ids={job.credentials} label="Certificates" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
