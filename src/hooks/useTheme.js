import { useCallback, useEffect, useState } from 'react';

const read = () => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

// Theme lives on <html data-theme> (set before paint in index.html) and persists in localStorage.
export function useTheme() {
  const [theme, setTheme] = useState(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) { /* storage unavailable */ }
  }, [theme]);

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), []);
  return [theme, toggle];
}
