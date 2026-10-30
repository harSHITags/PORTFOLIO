export const projects = [
  {
    id: 'rag',
    kind: 'rag',
    number: '01 · Datagami Internship',
    title: 'Retail RAG Chatbot + Agent Mode',
    description:
      'A retail-focused RAG chatbot that processes documents, creates searchable embeddings, and retrieves relevant context to generate responses using LLM APIs. Extended with an agentic workflow using CrewAI and external tools to coordinate multiple tasks.',
    highlights: [
      'Document processing and chunking',
      'Embedding generation and vector search via FAISS',
      'Context retrieval and LLM integration',
      'Multi-agent workflow with CrewAI',
      'Containerisation and CI/CD via Docker & GitHub Actions',
    ],
    // Only factual highlight, no invented benchmarks
    metrics: [
      { text: '~60%', label: 'smaller Docker image' },
      { text: 'RAG + Agent', label: 'dual-mode architecture' },
    ],
    flow: [['faiss', 'FAISS'], ['googlegemini', 'Gemini API'], ['fastapi', 'FastAPI'], ['crewai', 'CrewAI'], ['docker', 'Docker'], ['githubactions', 'Actions'], ['aws', 'EC2']],
    link: { href: 'https://github.com/harSHITags/Retail-RAG-Chatbot', label: 'View on GitHub' },
  },
  {
    id: 'stocksphere',
    kind: 'stocksphere',
    reverse: true,
    number: '02 · Full-Stack Project',
    title: 'StockSphere',
    description:
      'An inventory management application that combines backend APIs, database operations, authentication, and AI-powered assistance to simplify inventory management.',
    highlights: [
      'Product CRUD operations',
      'User-specific inventory management',
      'JWT-based authentication',
      'PostgreSQL database integration via SQLAlchemy',
      'AI-generated product descriptions via Gemini API',
      'Stock classification and inventory suggestions',
    ],
    metrics: [
      { text: 'CRUD', label: 'products, end to end' },
      { text: 'JWT', label: 'user-specific inventory' },
    ],
    flow: [['', 'React'], ['fastapi', 'FastAPI'], ['postgresql', 'PostgreSQL'], ['sqlalchemy', 'SQLAlchemy'], ['googlegemini', 'Gemini API']],
    link: { href: 'https://github.com/harSHITags/StockSphere', label: 'View on GitHub' },
  },
];

export const ragDemo = {
  question: 'Which products suit a small kitchen?',
  answer: 'Here are options from the catalog that fit compact spaces, ranked by relevance to your question.',
  sources: ['embed', 'faiss top-k', 'gemini'],
  agents: [
    ['Planner', 'splits the query'],
    ['Researcher', 'Groq + DuckDuckGo'],
    ['Analyst', 'synthesises findings'],
    ['Critic', 'checks the answer'],
  ],
};
