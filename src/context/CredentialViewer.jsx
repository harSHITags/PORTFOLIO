import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { getCredential } from '../data/certifications.js';

const Ctx = createContext({ open: () => {}, activeId: null });
export const useCredentialViewer = () => useContext(Ctx);

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

// One shared viewer for the whole page: the gallery, the experience entries and the
// extracurricular section all call open(id), so a click can never open the wrong credential.
export function CredentialViewerProvider({ children }) {
  const [activeId, setActiveId] = useState(null);
  const open = useCallback((id) => { if (getCredential(id)) setActiveId(id); }, []);
  const close = useCallback(() => setActiveId(null), []);
  const value = useMemo(() => ({ open, activeId }), [open, activeId]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <CredentialDialog id={activeId} onClose={close} />
    </Ctx.Provider>
  );
}

function CredentialBody({ cert }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [cert.id]);

  const url = cert.file ? assetUrl(cert.file) : null;

  if (cert.fileType === 'image' && url && !failed) {
    return <img className="cert-img" src={url} alt={`${cert.title} certificate`} onError={() => setFailed(true)} />;
  }
  if (cert.fileType === 'pdf' && url && !failed) {
    return (
      <object className="cert-pdf" data={url} type="application/pdf" aria-label={`${cert.title} certificate (PDF)`}>
        <p className="cert-msg">
          Your browser can’t show this PDF inline.{' '}
          {cert.driveUrl ? (
            <a href={cert.driveUrl} target="_blank" rel="noopener noreferrer">View Certificate on Google Drive</a>
          ) : (
            <a href={url} target="_blank" rel="noopener noreferrer">Open the PDF</a>
          )}
        </p>
      </object>
    );
  }

  const unavailable = failed || cert.fileType === 'pending' || (!cert.credentialUrl && !cert.driveUrl && !url);
  return (
    <div className="cert-state">
      <div className="seal"><Icon name={cert.icon || 'award'} /></div>
      <p className="cert-msg">
        {failed
          ? 'The certificate preview couldn’t be loaded right now.'
          : unavailable
            ? 'The certificate preview isn’t available online yet.'
            : cert.driveUrl
              ? 'This certificate is available to view on Google Drive.'
              : `This credential is hosted on ${cert.platform || 'the issuer’s site'}. Open it there to see the original.`}
      </p>
    </div>
  );
}

function CredentialDialog({ id, onClose }) {
  const ref = useRef(null);
  const cert = id ? getCredential(id) : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return undefined;
    if (cert && !d.open) {
      d.showModal();
      document.documentElement.classList.add('modal-open');
    }
    if (!cert && d.open) d.close();
    return undefined;
  }, [cert]);

  useEffect(() => () => document.documentElement.classList.remove('modal-open'), []);

  const handleClose = () => {
    document.documentElement.classList.remove('modal-open');
    onClose();
  };

  return (
    <dialog
      ref={ref}
      className="cert-dialog"
      aria-labelledby="cert-dialog-title"
      onClose={handleClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
    >
      {cert && (
        <div className="mod">
          <button className="btn ico-btn x" type="button" aria-label="Close" onClick={() => ref.current.close()} autoFocus>
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
          <CredentialBody cert={cert} />
          <small className="mono-note">{cert.issuer}</small>
          <h3 id="cert-dialog-title">{cert.title}</h3>
          <div className="mod-actions">
            {cert.driveUrl && (
              <a className="btn pri" href={cert.driveUrl} target="_blank" rel="noopener noreferrer">
                View Certificate
                <Icon name="external" />
              </a>
            )}
            {cert.credentialUrl && (
              <a className={cert.driveUrl ? "btn" : "btn pri"} href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                View on {cert.platform || 'issuer site'}
                <Icon name="external" />
              </a>
            )}
            <button className="btn" type="button" onClick={() => ref.current.close()}>Close</button>
          </div>
        </div>
      )}
    </dialog>
  );
}
