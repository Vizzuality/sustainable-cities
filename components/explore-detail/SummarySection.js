import React from 'react';
import PropTypes from 'prop-types';

export default function SummarySection(props) {
  return (<div className='c-summary-section'>
    <div className='row title'>
      <div className='column large-12 c-text -fs-huge -fw-thin' style={{ borderBottom: `2px solid ${props.titleColor}` }}>
        {props.title}
      </div>
    </div>
    {props.items.map((item, n) => (<div key={n} className='row subtitle'>
      <div className='column large-4 c-text -fs-extrabig -fw-light'>
        {item.title}
      </div>
      <div className='column large-8'>
        {item.items && item.items.map((item, n) => (<div className='subsubitem' key={n}>
          <div className='row subsubtitle'>
            <div className='column large-12 c-text -fs-big -fw-light'>
              {item.title}
            </div>
          </div>
          <div className='row description'>
            <div className='column large-12 c-text'>
              {item.description}
            </div>
          </div>
        </div>))}
      </div>
    </div>))}
  </div>);
}

SummarySection.propTypes = {
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    }))
  }))
};
