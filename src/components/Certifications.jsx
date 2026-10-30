import { technicalCredentials, isAvailable } from '../data/certifications.js';
import { useCredentialViewer } from '../context/CredentialViewer.jsx';
import { useTilt } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

function cue(cert) {
  if (cert.fileType === 'online' && !cert.driveUrl) return `View on ${cert.platform || 'issuer site'}`;
  if (isAvailable(cert)) return 'View certificate';
  return 'Preview coming soon';
}

function CertCard({ cert, duplicate }) {
  const { open } = useCredentialViewer();
  const tilt = useTilt(5);
  const thumb = cert.thumbnail || (cert.fileType === 'image' ? cert.file : null);
  const available = isAvailable(cert);

  return (
    <button
      ref={tilt}
      className={`cc${available ? '' : ' soon'}`}
      type="button"
      onClick={() => open(cert.id)}
      // Duplicated cards exist only to make the loop seamless: hide them from screen readers and Tab.
      tabIndex={duplicate ? -1 : undefined}
      aria-hidden={duplicate ? true : undefined}
      aria-haspopup="dialog"
    >
      <span className="in2">
        <span className="thumb">
          {thumb ? <img src={assetUrl(thumb)} alt="" loading="lazy" /> : <span className="seal"><Icon name={cert.icon || 'award'} /></span>}
        </span>
        <small>{cert.issuer}</small>
        <h3>{cert.title}</h3>
        <span className="cue">{cue(cert)}<i aria-hidden="true">→</i></span>
      </span>
    </button>
  );
}

export default function Certifications() {
  const { activeId } = useCredentialViewer();
  const count = technicalCredentials.length;

  return (
    <>
      <Reveal className="cert-h">
        <div><span className="kicker">Certifications</span><h2 className="cert-title">Credentials</h2></div>
        <p className="lede" style={{ margin: 0 }}>Select a card to open it. Hover to pause.</p>
      </Reveal>

      <Reveal className={`mq${activeId ? ' held' : ''}`} style={{ '--n': count }} role="region" aria-label="Certifications">
        <div className="tr">
          {[0, 1].flatMap((copy) =>
            technicalCredentials.map((c) => <CertCard key={`${copy}-${c.id}`} cert={c} duplicate={copy === 1} />)
          )}
        </div>
      </Reveal>
    </>
  );
}
