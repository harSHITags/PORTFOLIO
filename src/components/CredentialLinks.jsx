import { getCredential, isAvailable } from '../data/certifications.js';
import { useCredentialViewer } from '../context/CredentialViewer.jsx';
import Icon from './Icon.jsx';

// Compact row of credential links. Only credentials that actually have a file or issuer link are
// shown, so nothing here ever opens an empty viewer. Renders nothing until at least one is ready.
export default function CredentialLinks({ ids = [], label = 'Credentials' }) {
  const { open } = useCredentialViewer();
  const ready = ids.map(getCredential).filter(isAvailable);
  if (!ready.length) return null;

  return (
    <div className="cred-links">
      <span>{label}</span>
      {ready.map((c) => (
        <button key={c.id} type="button" className="cred-link" onClick={() => open(c.id)} aria-haspopup="dialog">
          <Icon name={c.icon || 'award'} />
          {c.title}
        </button>
      ))}
    </div>
  );
}
