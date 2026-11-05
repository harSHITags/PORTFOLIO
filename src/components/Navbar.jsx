import { useEffect, useState } from 'react';
import { navLinks, site } from '../data/site.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import Logo from './Logo.jsx';
import ThemeToggle from './ThemeToggle.jsx';

// 'top' (the hero) is observed too, so scrolling back up clears the highlighted link
const SECTION_IDS = ['top', ...navLinks.map((l) => l.id)];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  
  useEffect(() => {
    const on = () => setScrolled(scrollY > 10);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' on' : ''}${open ? ' open' : ''}`}>
      <nav className="wrap nav" aria-label="Main">
        <a className="logo" href="#top" aria-label={`${site.name}, home`} onClick={close}>
          <Logo />
          {/* The wordmark already spells the name; the text stays for screen readers only. */}
          <span className="sr-only">{site.name}</span>
        </a>

        <div className="links" id="nav-links">
          {navLinks.map((l) => (
            <a key={l.id} className={`l${active === l.id ? ' active' : ''}`} href={`#${l.id}`} onClick={close} aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="tools">
          <a className="btn pri sm" href="#contact">Get in touch</a>
          <ThemeToggle />
          <button className="btn ico-btn burger" type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
