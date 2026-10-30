import Icon from './Icon.jsx';

export function TechChips({ items, className = '' }) {
  return (
    <ul className={`chips ${className}`}>
      {items.map(([icon, label]) => (
        <li className="tech" key={label}>
          <Icon name={icon} />
          <b>{label}</b>
        </li>
      ))}
    </ul>
  );
}

// A left-to-right pipeline of tech pills joined by arrows.
export function TechFlow({ items, className = '' }) {
  return (
    <div className={`flow ${className}`}>
      {items.map(([icon, label], i) => (
        <span key={label} className="flow-item">
          {i > 0 && <i aria-hidden="true">→</i>}
          <span className="tech">
            <Icon name={icon} />
            <b>{label}</b>
          </span>
        </span>
      ))}
    </div>
  );
}
