import React from 'react';

export default function SnapshotSection({ project }) {
  const { country, cities, category, operationalYear } = project;
  const items = [
    {
      label: 'Location',
      values: [
       [cities && cities[0] && cities[0].name, country && country.regionName].filter(s => s).join(', '),
       country && country.iso
      ].filter(s => s)
    },
    {
      label: 'Date',
      values: [
        operationalYear
      ].filter(s => s)
    },
    {
      label: 'Solution type',
      values: [category.name]
    }
  ];

  return (<div className="c-snapshot-section">
    {items.map(item => (<div key={item.label} className="c-snapshot-section-item">
      <div className="c-text -dark -fs-big -fw-light">
        {item.label}
      </div>
      <div>
        <ul>
          {item.values.length === 0 && (<li className="c-text -uppercase">
            n/a
          </li>)}
          {item.values.map((value, n) => (<li key={n}>
            {value}
          </li>))}
        </ul>
      </div>
    </div>))}
  </div>);
}
