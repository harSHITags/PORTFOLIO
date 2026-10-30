import { CredentialViewerProvider } from './context/CredentialViewer.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Education from './components/Education.jsx';
import Experience from './components/Experience.jsx';
import Extracurricular from './components/Extracurricular.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import ResumeSection from './components/ResumeSection.jsx';
import Skills from './components/Skills.jsx';

export default function App() {
  return (
    <CredentialViewerProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Extracurricular />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </CredentialViewerProvider>
  );
}
