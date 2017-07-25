import React from 'react';
import PropTypes from 'prop-types';

export default function BmeTitleAccordion(props) {
  const textButton = props.isOpen ? 'Hide' : 'Show';
  return (
    <div className="c-bme-title-accordion">
      <h2 className="c-title -dark -fs-huge -fw-thin">{props.title}</h2>
      <button className="c-button" onClick={props.onClickButton}>{textButton}</button>
    </div>
  );
}

BmeTitleAccordion.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired
};
