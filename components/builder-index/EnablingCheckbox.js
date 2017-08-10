import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class EnablingCheckbox extends React.Component {
  render() {
    const { checked, enabling, onChange } = this.props;

    return (
      <label className={classnames("c-checkbox", { "-checked": checked })}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(enabling, !e.target.checked)}
        />
        {enabling.name}
      </label>
    );
  }
}

export default EnablingCheckbox;
