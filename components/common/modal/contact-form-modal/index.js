import { connect } from 'react-redux';

// component
import ContactFormModal from './contact-form-modal-component';

export default connect(
  state => ({
    success: state.contactForm.success,
    error: state.contactForm.error,
    loading: state.contactForm.loading
  }),
  {}
)(ContactFormModal);
