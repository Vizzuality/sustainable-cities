import React from 'react';

import Button from 'components/common/Button';

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
          <p>7 conditions selected</p>
        </div>

        <div className="footer">
          <p><Button secondary>Need help?</Button></p>

          <p>Business model element</p>
          <p>Element affected</p>
          <p>Element selected (commented)</p>
        </div>
      </div>
    );
  }
}

export default Sidebar;
