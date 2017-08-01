import React from 'react';

import Button from 'components/common/Button';
import { BME } from 'components/common/RadialChart';
import { Link } from 'routes';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="c-builder-sidebar">
        <div className="header">
          <p><Button primary>Generate document</Button></p>
          <p><Button secondary>Save current status</Button></p>

          <h2 className="c-title -fs-smaller -fw-light -uppercase">Solution</h2>
          <p>Bike sharing</p>

          <h2 className="c-title -fs-smaller -fw-light -uppercase">Enabling conditions</h2>
          <p><Link route="/builder/enabling-conditions">7 conditions selected</Link></p>
        </div>

        <div className="footer">
          <p><Button secondary>Need help?</Button></p>

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
            <p>Element selected (commented)</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
