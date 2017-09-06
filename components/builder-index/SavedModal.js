import React from 'react';
import Button from 'components/common/Button';

export default class SavedModal extends React.Component {
  render() {
    return (
      <section className="builder-help">
        <h1 className="c-title -fw-thin -fs-huge">Project saved</h1>

        <div className="actions">
          <Button secondary onClick={this.props.onClose}>Cancel</Button>
        </div>
      </section>
    );
  }
}
