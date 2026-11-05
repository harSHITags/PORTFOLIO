# Harshita Rathore — Portfolio (React + Vite)

```bash
npm install
npm run dev       # local dev server
npm run build     # production bundle in dist/
npm run preview   # serve the production build
```


## Where to edit things

| What | File |
| --- | --- |
| Links, email, about facts, education, Sahityik role | `src/data/site.js` |
| Skills groups | `src/data/skills.js` |
| Experience | `src/data/experience.js` |
| Projects (and the Retail RAG demo text) | `src/data/projects.js` |
| Certifications / credentials (all of them, incl. Sahityik) | `src/data/certifications.js` |
| Sahityik role text, education figures | `src/data/site.js` |
| Colours / light + dark themes | `src/styles/variables.css` |
| Portrait | `public/assets/images/portrait.webp` |
| Résumé PDF | `public/assets/Harshita_Rathore_Resume.pdf` |

### Adding or finishing a certificate
Everything lives in `src/data/certifications.js`, with the field guide at the top of that file.

1. Put the file in `public/assets/certificates/` (PNG, JPG, WebP or PDF).
2. On the entry set `fileType: 'image'` (or `'pdf'`) and `file: 'assets/certificates/<name>'`.
   For Credly/HackerRank-style credentials use `fileType: 'online'` plus `credentialUrl`.
3. That's it. The card, the viewer, and the compact links in Experience / Extracurricular update by themselves.

The compact links under each experience entry and under Sahityik only appear once that credential has a real file or link.
New certificates: add one object to the array. `category: 'technical'` puts it in the marquee; `'extracurricular'` keeps it out.

## Structure

```
src/
  context/      CredentialViewer (one shared certificate viewer for the whole page)
  components/   Navbar, Hero, About, Skills, Experience, Projects, Education,
                Certifications, Extracurricular, ResumeSection, Contact, Footer,
                ThemeToggle + small shared pieces (Icon, TechChips, Reveal, Pines)
  data/         content as plain JS modules (+ icons.js, the bundled logo SVGs)
  hooks/        useTheme, useTilt, useInView, useCountUp, useActiveSection,
                useScrollProgress, useMedia (reduced-motion / pointer detection)
  styles/       variables, global, animations + one stylesheet per area
```
