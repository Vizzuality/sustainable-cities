import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class SolutionRadio extends React.Component {
  render() {
    const { checked, solution, onChange } = this.props;

    return (
      <label className={classnames("c-radio", { "-checked": checked })}>
        <input
          type="radio"
          checked={checked || false}
          name="builder-selected-solution"
          onChange={(e) => onChange(solution, !e.target.checked)}
        />
        {solution.name}
      </label>
    );
  }
}

export default SolutionRadio;
