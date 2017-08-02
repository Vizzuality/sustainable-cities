import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

import FinancialProduct from 'components/common/disclaimer/content/FinancialProduct';
import FundingSource from 'components/common/disclaimer/content/FundingSource';
import DeliveryMechanism from 'components/common/disclaimer/content/DeliveryMechanism';
import InvestmentComponent from 'components/common/disclaimer/content/InvestmentComponent';

const disclaimerComponents = {
  'funding-source': <FundingSource />,
  'delivery-mechanism': <DeliveryMechanism />,
  'investment-component': <InvestmentComponent />,
  'financial-product': <FinancialProduct />
};

export const DISCLAIMER_COMPONENTS = Object.keys(disclaimerComponents);

export class DisclaimerModal extends React.Component {

  handleClose() {
    const { onClose } = this.props;
    onClose();
  }

  componentWillReceiveProps(nextProps) {
    const { disclaimer } = nextProps;

    // prevent scrolling while the modal is open
    document.getElementsByTagName('body')[0].classList.toggle('no-overflow', !!disclaimer);
  }

  render() {
    const { onClose, disclaimer } = this.props;

    if (!disclaimer) {
      return null;
    }

    return (<div className="c-modal">
      <div className="content">

        {disclaimerComponents[disclaimer] || <div />}

        <div className="actions">
          <Button onClick={onClose}>OK</Button>
        </div>

        <div className="dismiss" onClick={() => this.handleClose()}>&times;</div>
      </div>
    </div>);
  }
}

DisclaimerModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  disclaimer: PropTypes.string.isRequired
};
