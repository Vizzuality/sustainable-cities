import React from 'react';
import classnames from 'classnames';
import sortBy from 'lodash/sortBy';

import Button from 'components/common/Button';
import { BME } from 'components/common/RadialChart';
import SolutionRadio from 'components/builder-index/SolutionRadio';
import { Link } from 'routes';

class SolutionPicker extends React.Component {
  render() {
    return (
      <div className="c-builder-solution-picker">
        <header>
          <h1 className="c-title -fs-huge -fw-thin">Solution</h1>

          <p>
            Select one or all sustainable solutions that you wish to create a project of:
          </p>
        </header>

        <ul className="solutions-list">
          <li className="u-block">
            <SolutionRadio
              solution={{ name: "All solutions" }}
              checked={!this.props.selectedSolution}
              onChange={() => this.props.onSolutionSelected({ id: undefined })}
            />
          </li>
          {sortBy(this.props.solutions, 'name').map(solution => (
            <li key={solution.slug} className="u-block">
              <SolutionRadio
                solution={solution}
                checked={this.props.selectedSolution && this.props.selectedSolution.id === solution.id}
                onChange={() => this.props.onSolutionSelected(solution)}
              />
            </li>
          ))}
        </ul>

        <div className="c-dismiss -arrow" onClick={() => this.props.onClose()}>Done</div>
      </div>
    );
  }
}

export default SolutionPicker;
