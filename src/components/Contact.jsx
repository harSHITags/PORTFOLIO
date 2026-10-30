import { site } from '../data/site.js';
import Icon from './Icon.jsx';
import Pines from './Pines.jsx';
import Reveal from './Reveal.jsx';

export default function Contact() {
  return (
    <section className="final" id="contact">
      <div className="wrap">
        <Reveal className="cbox">
          <span className="kicker">Contact</span>
          <h2>Let's build something together.</h2>
          <p className="lede">I'm looking for Python backend + AI development and backend engineering roles. Email is the quickest way to reach me.</p>

          <div className="contact-details">
            <a className="mail" href={`mailto:${site.email}`} aria-label="Send email">
              {site.email}
            </a>
      
          </div>

          <div className="cta">
            <a className="btn pri" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <Icon name="linkedin" />LinkedIn
            </a>
            <a className="btn" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <Icon name="github" />GitHub
            </a>
            <a className="btn" href={`mailto:${site.email}`} aria-label="Send email">
              Email me
            </a>
          </div>
          <div className="lights" aria-hidden="true" />
          <Pines variant="footer" />
        </Reveal>
      </div>
    </section>
  );
}
