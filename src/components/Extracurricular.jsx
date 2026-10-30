import { extracurricular } from '../data/site.js';
import CredentialLinks from './CredentialLinks.jsx';
import Reveal from './Reveal.jsx';

export default function Extracurricular() {
  return (
    <section className="extra" id="extracurricular">
      <div className="wrap">
        <Reveal className="extra-card">
          <div>
            <span className="kicker">Leadership &amp; Extracurricular</span>
            <h2>{extracurricular.organisation}</h2>
          </div>
          <div className="extra-body">
            <span className="when" style={{ display: 'block', marginBottom: '6px' }}>{extracurricular.period}</span>
            <p className="extra-role">{extracurricular.role}</p>
            <p>{extracurricular.summary}</p>
            <CredentialLinks ids={extracurricular.credentials} label="Certificates" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
