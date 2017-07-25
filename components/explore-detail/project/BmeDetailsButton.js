import React from 'react';
import PropTypes from 'prop-types';

export default function BmeDetailsButton(props) {
  const textButton = props.isOpen ? 'Hide details' : 'Show details';
  return (
    <div className="c-bme-detail">
      <button type="button" className="c-button" onClick={props.onClickButton}>{textButton}</button>
    </div>
  );
}

BmeDetailsButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClickButton: PropTypes.func.isRequired
};
