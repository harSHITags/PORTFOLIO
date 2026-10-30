import { skillTree } from '../data/skills.js';
import { useInView } from '../hooks/useInView.js';
import { useTilt } from '../hooks/useTilt.js';
import Icon from './Icon.jsx';
import Reveal from './Reveal.jsx';
import { TechChips, TechFlow } from './TechChips.jsx';

function Plate({ icon, name, note }) {
  const ref = useTilt(6);
  return (
    <div className="plate-card" ref={ref}>
      <div className="orb"><Icon name={icon} /></div>
      <b>{name}</b>
      <span>{note}</span>
    </div>
  );
}

function Branch({ branch }) {
  return (
    <li className={`branch br-${branch.key}`}>
      <div className="branch-card">
        <h3>{branch.title}</h3>
        <p className="cap">{branch.caption}</p>
        {branch.plates && (
          <div className="plates">
            {branch.plates.map((p) => <Plate key={p.name} {...p} />)}
          </div>
        )}
        {branch.groups && branch.groups.map((g, i) => (
          <div className="sg" key={g.label || i}>
            {g.label && <h4>{g.label}</h4>}
            <TechChips items={g.items} />
          </div>
        ))}
        {branch.ship && (
          <div className="ship">
            <p>From code to cloud</p>
            <TechFlow items={branch.ship} />
          </div>
        )}
      </div>
    </li>
  );
}

// Tree layout: root node → stem → horizontal rail → one drop per branch (see skills.css).
export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.15 });
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="skills-head">
          <span className="kicker">Technical skills</span>
          <h2>A Python backend core, with AI around it</h2>
          <p className="lede">Python and FastAPI are where I spend most of my time. Databases, Generative AI, RAG, agentic workflows, and DevOps are the layers I connect to them.</p>
        </Reveal>

        <div className={`tree${inView ? ' in' : ''}`} ref={ref}>
          <div className="root"><span>{skillTree.root}</span></div>
          <ul className="branches">
            {skillTree.branches.map((b) => <Branch key={b.key} branch={b} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
