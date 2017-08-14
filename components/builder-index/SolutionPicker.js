import React from 'react';
import classnames from 'classnames';

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
            Select conditions to lorem ipsum casius tesebe leo risus, pora ac
            consectetur ac, vestibulum at eros:
          </p>
        </header>

        <ul className="solutions-list">
          {this.props.solutions.map(solution => (
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
