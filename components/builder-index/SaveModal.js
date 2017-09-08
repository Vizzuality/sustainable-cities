import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

export default class SaveModal extends React.Component {
  state = {
    title: undefined,
  }

  onChange(field, value) {
    this.setState({ [field]: value });
  }

  render() {
    const {
      currentProjectName,
      onClose,
      onUpdate,
      onCreate,
      readonly,
      existing,
    } = this.props;

    return (
      <section className="builder-help">
        <h1 className="c-title -fw-thin -fs-huge">Save project</h1>
        <h2 className="c-title -fw-light -fs-bigger">Project name</h2>

        <input
          className="u-block u-w-100 input-text"
          placeholder="Write here"
          value={this.state.title == undefined ? currentProjectName : this.state.title}
          onChange={(e) => this.onChange('title', e.target.value)}
        />

        {!readonly && existing &&
          <div className="actions">
            <Button secondary onClick={() => onUpdate(this.state.title)}>Save</Button>
            <Button primary onClick={() => onCreate(this.state.title)}>Save as new</Button>
          </div>
        }
        {readonly &&
          <div className="actions">
            <Button primary onClick={() => onCreate(this.state.title)}>Save as new</Button>
          </div>
        }
        {!existing &&
          <div className="actions">
            <Button primary onClick={() => onCreate(this.state.title)}>Save</Button>
          </div>
        }

      </section>
    );
  }
}

SaveModal.propTypes = {
  onClose: PropTypes.func.isRequired
};
