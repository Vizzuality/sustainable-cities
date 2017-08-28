import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function Radio({ name, labelString, theme, value, isChecked, onCheck }) {
  const radioClass = classnames('c-custom-radio', {
    [theme]: theme
  });

  return (
    <div className={radioClass}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={(e) => { onCheck(e); }}
      />
      <span className="radio-fake" />
      <label htmlFor={name}>{labelString}</label>
    </div>
  );
}

Radio.propTypes = {
  theme: PropTypes.string,
  name: PropTypes.string.isRequired,
  labelString: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  onCheck: PropTypes.func.isRequired
};
