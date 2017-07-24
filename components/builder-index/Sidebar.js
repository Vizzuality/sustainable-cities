import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="c-builder-sidebar">
        <button>Generate document</button>
        <button>Save current status</button>

        <h2>Solution</h2>
        <p>Bike sharing</p>

        <h2>Enabling conditions</h2>
        <p>7 conditions selected</p>
      </div>
    );
  }
}

export default Sidebar;
