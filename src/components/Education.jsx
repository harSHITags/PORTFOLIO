import { education } from '../data/site.js';
import Certifications from './Certifications.jsx';
import Reveal from './Reveal.jsx';

export default function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <Reveal style={{ maxWidth: 720 }}>
          <span className="kicker">Education</span>
          <h2>Education &amp; credentials</h2>
        </Reveal>
        

        <div className="led">
          {education.map((e, i) => (
            <Reveal className="r" delay={i} key={e.id}>
              <span className="y">{e.years}</span>
              <div><h3>{e.title}</h3><p>{e.place}</p></div>
              <div className="stats">
                {e.stats.map((s) => (
                  <div key={s.label} className={`stat${s.highlight ? ' stat-highlight' : ''}`}>
                    <strong>{s.value}</strong>
                    <small>{s.label}</small>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Certifications />
      </div>
    </section>
  );
}
