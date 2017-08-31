import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/common/Spinner';

export default class Modal extends React.Component {

  // Close modal when esc key is pressed
  componentWillReceiveProps({ open }) {
    function escKeyPressListener(evt) {
      document.removeEventListener('keydown', escKeyPressListener);
      return evt.keyCode === 27 && this.props.toggleModal(false);
    }

    // if opened property has changed
    if (this.props.open !== open) {
      document.getElementsByTagName('body')[0].classList.toggle('no-overflow', open);
      document[open ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener.bind(this));
    }
  }

  render() {
    const { open, children, loading, toggleModal } = this.props;
    return (
      <section ref={(node) => { this.el = node; }} className={`c-modal ${open ? '' : '-hidden'}`}>
        <area className="modal-backdrop" onClick={() => toggleModal(false)} />
        <div className="modal-container">
          <button className="dismiss" onClick={() => toggleModal(false)}>×</button>
          <div className="content">
            {loading ? <Spinner isLoading /> : children}
          </div>
        </div>
      </section>
    );
  }
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired
};

Modal.defaultProps = {
  loading: false
};
