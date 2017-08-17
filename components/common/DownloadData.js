import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/common/Button';

export default function DownloadData(props) {
  const { onClickButton } = props;
  return (
    <div className="c-download-data">
      <div className="download-data-content">
        <div className="row">
          <div className="column large-12 c-title -fs-huge -fw-thin">
            Download Data
          </div>
        </div>
        <div className="row">
          <div className="column large-12 c-text -fs-medium">
            <p>Select the part of the dataset you are interested in and download it to your computer</p>
          </div>
        </div>
        <div className="row">
          <div className="column large-12">
            <Button className="download-button" secondary onClick={onClickButton}>select data to download</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

DownloadData.propTypes = {
  onClickButton: PropTypes.func.isRequired
};
