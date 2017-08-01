import React from 'react';
import PropTypes from 'prop-types';

const renderDetail = (item) => {
  if (item.description && item.impactUnit && item.impactValue) {
    return (<span>{item.impactUnit}: {item.impactValue} ({item.description})</span>);
  } else if (item.impactUnit && item.impactValue) {
    return (<span>{item.impactUnit}: {item.impactValue}</span>);
  } else if (item.impactUnit) {
    return (<span>{item.impactUnit}</span>);
  } else if (item.impactValue) {
    return (<span>{item.impactValue}</span>);
  }
}

export default function ReportedImpact({ items }) {
  return (<div className="c-reported-impact">
    {items.map(item => (<div key={item.id} className="c-reported-impact-item">
      <div className="c-text -dark -fs-big -fw-light">
        {item.category.name}
      </div>
      <div className="c-text">
        {renderDetail(item)}
      </div>
    </div>))}
  </div>);
}

ReportedImpact.propTypes = {
  items: PropTypes.array
};
