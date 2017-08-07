import React from 'react';

import Button from 'components/common/Button';

class HelpModal extends React.Component {
  render() {
    return (
      <div className="c-modal">
        <div className="content">
          <section className="builder-help">
            <h1 className="c-title -fw-thin -fs-huge">Design your business model</h1>

            <p className="c-text">
              Start selecting a <strong>solution</strong> and, optionally,
              some <strong>enabling conditions</strong>. It would change how the
              business model elements are shown on the interactive chart.
            </p>

            <p className="c-text">
              Placing the cursor over the dots, they will show their names. Then,
              clicking on them a modal window will show the details of
              the <strong>business model element</strong> and save and comment options.
            </p>

            <div className="actions">
              <Button onClick={this.props.onClose}>Start</Button>
            </div>

            <div className="dismiss" onClick={() => this.props.onClose()}>&times;</div>
          </section>
        </div>
      </div>
    );
  }
}

export default HelpModal;
