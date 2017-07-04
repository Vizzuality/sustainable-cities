import React from 'react';
import PropTypes from 'prop-types';

// components
import Accordion from 'components/explore-detail/project/Accordion';
import BmeTitleAccordion from 'components/explore-detail/project/BmeTitleAccordion';
import BmeContentAccordion from 'components/explore-detail/project/BmeContentAccordion';

export default function BmeTree(props) {
  return (
    <div className="c-bme-tree">
      {props.bmes.map(bme =>
        bme.items && bme.items.length > 0
          && <Accordion
            key={bme.title}
            title={bme.title}
            header={BmeTitleAccordion}
            content={<BmeContentAccordion bmes={bme.items} />}
          />)}
    </div>
  );
}

BmeTree.propTypes = {
  bmes: PropTypes.array
};

BmeTree.defaultProps = {
  bmes: []
};
