import { site } from '../data/site.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

export default function ResumeSection() {
  return (
    <section className="resume">
      <div className="wrap">
        <Reveal className="rband">
          <div>
            <h2>Want the full picture?</h2>
            <p>My résumé covers experience, projects, skills and certifications on one page.</p>
          </div>
          <a className="btn pri" href={site.resume} download="Harshita_Rathore_Resume.pdf">
            <Icon name="download" />
            Download résumé (PDF)
          </a>
        </Reveal>
      </div>
    </section>
  );
}
