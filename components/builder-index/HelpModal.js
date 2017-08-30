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
              Start by selecting a <strong>solution</strong> and then, optionally, some
              <strong> enabling conditions</strong>, which provide context to the situation.
              This will change how the elements are shown on the interactive chart.
            </p>

            <p className="c-text">
              Placing the cursor over the dots will make their names appear. By clicking on them,
              a modal window will show the details of the element and options to add comments or
              save the element to your chart.
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
