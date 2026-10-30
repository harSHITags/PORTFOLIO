// Skills tree — accurate to resume. Organised by category.
// Python + FastAPI are rendered as large "plates" as the primary professional identity.
export const skillTree = {
  root: 'My skills',
  branches: [
    {
      key: 'backend',
      title: 'Programming & Backend',
      caption: 'Where my work starts',
      plates: [
        { icon: 'python', name: 'Python', note: 'Primary language' },
        { icon: 'fastapi', name: 'FastAPI', note: 'API development' },
      ],
      groups: [{ items: [['rest', 'REST APIs'], ['jwt', 'JWT Authentication'], ['postman', 'Postman'], ['swagger', 'Swagger UI']] }],
      ship: [['python', 'Python'], ['fastapi', 'FastAPI'], ['docker', 'Docker'], ['githubactions', 'Actions'], ['aws', 'AWS EC2']],
    },
    {
      key: 'data',
      title: 'Databases & Data Handling',
      caption: 'Storage and retrieval',
      groups: [
        { items: [['sql', 'SQL'], ['postgresql', 'PostgreSQL'], ['mysql', 'MySQL'], ['sqlalchemy', 'SQLAlchemy'], ['faiss', 'FAISS']] },
      ],
    },
    {
      key: 'ai',
      title: 'Generative AI & Applied AI',
      caption: 'Practical AI on top of backend',
      groups: [
        { label: 'Generative & agentic', items: [['genai', 'Generative AI'], ['rag', 'RAG'], ['llm', 'LLM Integration'], ['crewai', 'CrewAI'], ['googlegemini', 'Google Gemini API'], ['groq', 'Groq'], ['agentic', 'Agentic AI']] },
        { label: 'Basic ML & NLP', items: [['ml', 'Basic Machine Learning'], ['nlp', 'Basic NLP']] },
      ],
    },
    {
      key: 'platform',
      title: 'Cloud & DevOps',
      caption: 'Delivery and deployment',
      groups: [
        { items: [['docker', 'Docker'], ['githubactions', 'GitHub Actions'], ['aws', 'AWS EC2'], ['cicd', 'CI/CD Fundamentals']] },
      ],
    },
    {
      key: 'tools',
      title: 'Development Tools',
      caption: 'Daily drivers',
      groups: [
        { items: [['git', 'Git'], ['github', 'GitHub'], ['vscode', 'VS Code'], ['googlecolab', 'Google Colab'], ['postman', 'Postman'], ['swagger', 'Swagger UI']] },
      ],
    },
  ],
};
