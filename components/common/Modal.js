import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {

  // Close modal when esc key is pressed
  componentWillReceiveProps({ open }) {
    function escKeyPressListener(evt) {
      document.removeEventListener('keydown', escKeyPressListener);
      return evt.keyCode === 27 && this.props.toggleModal(false);
    }
    // if opened property has changed
    if (this.props.open !== open) {
      document[open ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener.bind(this));
    }
  }

  render() {
    const { open, children } = this.props;
    return (
      <section ref={(node) => { this.el = node; }} className={`c-modal ${open ? '' : '-hidden'}`}>
        <div className="modal-container">
          <button className="dismiss" onClick={() => this.props.toggleModal(false)}>x</button>
          <div className="content">
            {children}
          </div>
        </div>
        <area className="modal-backdrop" onClick={() => this.props.toggleModal(false)} />
      </section>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  toggleModal: PropTypes.func.isRequired
};
