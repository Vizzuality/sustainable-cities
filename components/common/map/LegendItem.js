import React from 'react';
import PropTypes from 'prop-types';

export default function LegendItem(props) {
  const { item } = props;

  const setContent = () => {
    let content = null;
    const { type, name } = item;

    switch (type) {
      case 'single-circle': {
        const { color } = item;
        content = (
          <div className="legend-item-content">
            {color && <span className="legend-item-circle" style={{ backgroundColor: color }} />}
            <span className="legend-item-name">{name}</span>
          </div>
        );
        break;
      }
      case 'range': {
        const { color, description, icon, label, range, text } = item;
        const { min, max } = range;
        content = (
          <div className="legend-item-content">
            <div className="title">
              {icon &&
              <svg className="icon -dark -in-line-left -medium"><use xlinkHref={`#${icon}`} /></svg>}
              <span className="legend-title">{name}</span>
            </div>
            {label && <span className="legend-label">{label}</span>}
            {description && <p className="legend-description">{description}</p>}
            <div className="legend-range">
              <span className="limit-range">{min}</span>
              <span className="circle -small" style={{ backgroundColor: color }} />
              <span className="circle -medium" style={{ backgroundColor: color }} />
              <span className="circle -big" style={{ backgroundColor: color }} />
              <span className="legend-custom-text">{max} {text}</span>
            </div>
          </div>
        );
        break;
      }
      default:
        content = null;
    }

    return content;
  };

  return (
    <li className="c-legend-item">
      {item && setContent()}
    </li>
  );
}

LegendItem.propTypes = {
  item: PropTypes.object
};
