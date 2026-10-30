// Single source of truth for links and contact details.
const base = import.meta.env.BASE_URL;

export const site = {
  name: 'Harshita Rathore',
  phone: '+916268882956',
  email: 'harshitarathore106@gmail.com',
  github: 'https://github.com/harSHITags',
  linkedin: 'https://www.linkedin.com/in/harshita-rathore-699a712a7/',
  resume: `${base}assets/Harshita_Rathore_Resume.pdf`,
  portrait: `${base}assets/images/portrait.webp`,
  location: 'Indore, India',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

export const aboutFacts = [
  { value: '8.26', label: 'CGPA' },
  { value: '2', label: 'Internship Experiences' },
  { value: '2', label: 'Major End-to-End Projects' },
  { value: '2026', label: 'CS Graduate' },
];

export const aboutRows = [
  { title: 'Python & FastAPI backends', text: 'Building API-driven backend applications with FastAPI, REST APIs, JWT authentication, and Swagger documentation.', icons: ['python', 'fastapi'] },
  { title: 'Databases & data handling', text: 'Working with SQL, PostgreSQL, and MySQL using SQLAlchemy ORM. Vector indexing with FAISS for semantic retrieval.', icons: ['sql', 'faiss'] },
  { title: 'Retrieval-Augmented Generation', text: 'FAISS vector search paired with Google Gemini API for context-aware responses grounded in document content.', icons: ['faiss', 'googlegemini'] },
  { title: 'Agentic workflows', text: 'CrewAI pipelines coordinating multiple agents with Groq and DuckDuckGo for decomposed task execution.', icons: ['crewai', 'groq'] },
  { title: 'Docker & CI/CD', text: 'Containerised applications, GitHub Actions builds, and lean Docker images deployed on AWS EC2.', icons: ['docker', 'githubactions'] },
  { title: 'Basic ML & applied AI', text: 'Introductory machine learning workflows: supervised learning, model training, evaluation, and image classification.', icons: ['ml', 'googlegemini'] },
];

export const education = [
  {
    id: 'btech',
    years: '2022 – 2026',
    title: 'Bachelor of Technology — Computer Science Engineering',
    place: 'Medi-Caps University, Indore',
    stats: [{ value: '8.26', label: 'CGPA' }],
  },
  {
    id: 'school',
    years: '2020 – 2022',
    title: 'Class XII — CBSE',
    place: 'Bal Niketan Higher Secondary School, Indore',
    stats: [
      { value: '94.67%', label: 'Class X', highlight: true },
      { value: '73.6%', label: 'Class XII' },
    ],
  },
];

// Single combined entry for Sahityik Literary Club (incorporating Litopia)
export const extracurricular = {
  organisation: 'Sahityik Literary Club · Medi-Caps University',
  role: 'PR & Outreach Executive',
  period: 'Academic Year 2024–2025',
  summary: "Contributed to public relations, outreach, communication, and event promotion as part of the literary club's organizing team. Also contributed to organizing Litopia, a literary event hosted by Sahityik at Medi-Caps University on 11–12 March 2025.",
  credentials: [
    'sahityik-pr-certificate',
    'sahityik-appreciation',
    'litopia-appreciation',
  ],
};
