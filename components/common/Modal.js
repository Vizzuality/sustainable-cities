import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Spinner from 'components/common/Spinner';

export default class Modal extends React.Component {

  componentDidMount() {
    document.getElementsByTagName('body')[0].classList.add('no-overflow');
  }

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

  componentWillUnmount() {
    document.getElementsByTagName('body')[0].classList.remove('no-overflow');
  }

  render() {
    const { open, children, loading, toggleModal, className } = this.props;
    const modalClass = classnames('c-modal', {
      [className]: !!className,
      '-hidden': !open
    });

    return (
      <section ref={(node) => { this.el = node; }} className={modalClass}>
        <area className="modal-backdrop" onClick={() => toggleModal(false)} />
        <div className="modal-container">
          <button className="dismiss" onClick={() => toggleModal(false)}>
            <svg className="icon -close"><use xlinkHref="#icon-close" /></svg>
          </button>
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
  toggleModal: PropTypes.func.isRequired,
  className: PropTypes.string
};

Modal.defaultProps = {
  loading: false
};
