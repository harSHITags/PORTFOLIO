// ──────────────────────────────────────────────────────────────────────────────
// CREDENTIALS — single source of truth for technical and extracurricular credentials.
//
//   id             unique, kebab-case
//   title, issuer  shown on the card and in the viewer
//   category       'technical' → appears in the Credentials marquee
//                  'extracurricular' → appears only in the Extracurricular section
//   icon           key from src/data/icons.js (falls back to a generic award icon)
//   fileType       'image'   → `file` is an image in public/assets/certificates/
//                  'pdf'     → `file` is a PDF in public/assets/certificates/
//                  'online'  → only `credentialUrl` (Credly, HackerRank …); opens the issuer page
//                  'pending' → no file or link yet; the card says so plainly
//   file           path relative to public/, e.g. 'assets/certificates/foo.pdf'
//   thumbnail      optional smaller image for the card (defaults to `file` for images)
//   driveUrl       direct Google Drive link to view/verify the certificate
//   credentialUrl  link to the credential on the issuing platform (optional, shown as a button)
//   platform       label for that button, e.g. 'Credly', 'HackerRank'
// ──────────────────────────────────────────────────────────────────────────────

export const certifications = [
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    category: 'technical',
    icon: 'aws',
    fileType: 'pdf',
    file: 'assets/certificates/aws-cloud-practitioner-essentials.pdf',
    thumbnail: null,
    driveUrl: 'https://drive.google.com/file/d/1jJBwvzGkU6OxnaQChwf6F-Nr4DBd1LNu/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'aws-generative-ai',
    title: 'AWS Generative AI',
    issuer: 'Amazon Web Services',
    category: 'technical',
    icon: 'aws',
    fileType: 'pdf',
    file: 'assets/certificates/aws-generative-ai-for-executives.pdf',
    thumbnail: null,
    driveUrl: 'https://drive.google.com/file/d/1pVQxxdBx9uMUSA-UaUURsUoruDZCpY-L/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'cisco-intro-ai',
    title: 'Introduction to AI',
    issuer: 'Cisco Networking Academy',
    category: 'technical',
    icon: 'cisco',
    fileType: 'online',
    file: null,
    thumbnail: null,
    driveUrl: null,
    credentialUrl: 'https://www.credly.com/badges/3d7c1e16-b05f-4b81-a73f-30c689f5468b',
    platform: 'Credly',
  },
  {
    id: 'cisco-python-essentials-1',
    title: 'Python Essentials 1',
    issuer: 'Cisco Networking Academy',
    category: 'technical',
    icon: 'cisco',
    fileType: 'image',
    file: 'assets/certificates/cisco-python-essentials-1.jpg',
    thumbnail: 'assets/certificates/cisco-python-essentials-1.jpg',
    driveUrl: 'https://drive.google.com/file/d/15SpFhlpyj2Xj9UPldgCfAn5sk2G4Pd2d/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'hackerrank-certificate',
    title: 'HackerRank Certificate',
    issuer: 'HackerRank',
    category: 'technical',
    icon: 'hackerrank',
    fileType: 'pdf',
    file: 'assets/certificates/hackerrank-sql-certificate.pdf',
    thumbnail: null,
    driveUrl: 'https://drive.google.com/file/d/1B5s0FPpC_leUnO_OSdZR8qu4B75zbviV/view?usp=drive_link',
    credentialUrl: 'https://www.hackerrank.com/certificates/a690f45a7de8',
    platform: 'HackerRank',
  },
  {
    id: 'forage-aws-solutions-architecture',
    title: 'AWS Solutions Architecture Job Simulation',
    issuer: 'Forage',
    category: 'technical',
    icon: 'cloud',
    fileType: 'pdf',
    file: 'assets/certificates/forage-solutions-architecture.pdf',
    thumbnail: null,
    driveUrl: 'https://drive.google.com/file/d/1VCJeFAwE1PA9Q5aMphxDdwUoxSICmMno/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'datagami-generative-ai',
    title: 'Generative AI',
    issuer: 'Datagami × IBM × NASSCOM',
    category: 'technical',
    icon: 'genai',
    fileType: 'image',
    file: 'assets/certificates/datagami-generative-ai.jpg',
    thumbnail: 'assets/certificates/datagami-generative-ai.jpg',
    driveUrl: 'https://drive.google.com/file/d/1eUhUrYVS1I3IpeLbTJn3w-Z232xiYJur/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'datagami-agentic-ai',
    title: 'Agentic AI',
    issuer: 'Datagami × IBM × NASSCOM',
    category: 'technical',
    icon: 'crewai',
    fileType: 'image',
    file: 'assets/certificates/datagami-agentic-ai.jpg',
    thumbnail: 'assets/certificates/datagami-agentic-ai.jpg',
    driveUrl: 'https://drive.google.com/file/d/1flyorKs2-9x4kJL82Q1sKL94akHc9Lal/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'datagami-devops',
    title: 'DevOps',
    issuer: 'Datagami × IBM × NASSCOM',
    category: 'technical',
    icon: 'docker',
    fileType: 'image',
    file: 'assets/certificates/datagami-devops.jpg',
    thumbnail: 'assets/certificates/datagami-devops.jpg',
    driveUrl: null,
    credentialUrl: null,
  },
  {
    id: 'medicaps-summer-internship',
    title: 'Summer Internship',
    issuer: 'Medi-Caps University',
    category: 'technical',
    icon: 'school',
    fileType: 'image',
    file: 'assets/certificates/medicaps-summer-internship.jpg',
    thumbnail: 'assets/certificates/medicaps-summer-internship.jpg',
    driveUrl: 'https://drive.google.com/file/d/1Z3ImlROW11mihhNFGlVH24-GMzoCaAi4/view?usp=drive_link',
    credentialUrl: null,
  },
  {
    id: 'iitb-bash',
    title: 'Bash',
    issuer: 'IIT Bombay · Spoken Tutorial',
    category: 'technical',
    icon: 'bash',
    fileType: 'image',
    file: 'assets/certificates/bash-iit-bombay.jpg',
    thumbnail: 'assets/certificates/bash-iit-bombay.jpg',
    driveUrl: 'https://drive.google.com/file/d/10hYVrJ2xOU4MYW3zdZCVqC0gGbvMq8Y5/view?usp=drive_link',
    credentialUrl: null,
  },

  // ── Extracurricular & Leadership (attached to the combined Sahityik entry) ────
  {
    id: 'sahityik-pr-certificate',
    title: 'PR & Outreach Executive — Appointment Certificate',
    issuer: 'Sahityik Literary Club · Medi-Caps University',
    category: 'extracurricular',
    icon: 'book',
    fileType: 'image',
    file: 'assets/certificates/sahityik-pr-executive.png',
    thumbnail: 'assets/certificates/sahityik-pr-executive.png',
    driveUrl: null,
    credentialUrl: null,
  },
  {
    id: 'sahityik-appreciation',
    title: 'Certificate of Appreciation — Executive Member',
    issuer: 'Sahityik Literary Club · Medi-Caps University',
    category: 'extracurricular',
    icon: 'book',
    fileType: 'image',
    file: 'assets/certificates/sahityik-event-appreciation.png',
    thumbnail: 'assets/certificates/sahityik-event-appreciation.png',
    driveUrl: null,
    credentialUrl: null,
  },
  {
    id: 'litopia-appreciation',
    title: 'Certificate of Appreciation — Litopia',
    issuer: 'Sahityik Literary Club',
    category: 'extracurricular',
    icon: 'book',
    fileType: 'image',
    file: 'assets/certificates/litopia-sahityik.jpg',
    thumbnail: 'assets/certificates/litopia-sahityik.jpg',
    driveUrl: null,
    credentialUrl: null,
  },
];

const byId = new Map(certifications.map((c) => [c.id, c]));
export const getCredential = (id) => byId.get(id);

// A credential is "available" once it has a real file, a drive link, or an issuer link.
export const isAvailable = (c) => Boolean(c && (c.file || c.credentialUrl || c.driveUrl) && c.fileType !== 'pending');

export const technicalCredentials = certifications.filter((c) => c.category === 'technical');
