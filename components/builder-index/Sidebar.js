import React from 'react';

import Button from 'components/common/Button';
import { BME } from 'components/common/RadialChart';
import { Router } from 'routes';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="c-builder-sidebar">
        <div className="header">
          <div onClick={this.props.onSolutionsClick} role="link">
            <h2 className="c-title -fs-smaller -fw-light -uppercase">Solution</h2>
            <p>{(this.props.selectedSolution || { name: "N/A"}).name}</p>
          </div>

          <div onClick={() => Router.pushRoute('/builder/enabling-conditions')} role="link">
            <h2 className="c-title -fs-smaller -fw-light -uppercase">Enabling conditions</h2>
            <p>7 conditions selected</p>
          </div>
        </div>

        <div className="footer">
          <p><Button secondary onClick={this.props.onHelpClick}>Need help?</Button></p>
          <p><Button secondary>Save current status</Button></p>
          <p><Button primary link={{ route: 'builder-project' }}>Generate document</Button></p>

          <div className="legend-item">
            <svg className="radial-chart legend" viewBox="0 0 28 28">
              <g transform="translate(14,14)">
                <BME size={6} level={3} family="none" angle={0} depth={0} />
              </g>
            </svg>
            <p>Business model element</p>
          </div>

          <div className="legend-item">
            <svg className="radial-chart legend" viewBox="0 0 28 28">
              <g transform="translate(14,14)">
                <BME selected={false} size={6} level={3} family="none" angle={0} depth={0} />
              </g>
            </svg>
            <p>Element affected</p>
          </div>

          <div className="legend-item">
            <svg className="radial-chart legend" viewBox="0 0 28 28">
              <g transform="translate(14,14)">
                <BME selected={true} size={6} level={3} family="none" angle={0} depth={0} />
              </g>
            </svg>
            <p>Element selected</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
