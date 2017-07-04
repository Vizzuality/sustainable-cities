import React from 'react';
import PropTypes from 'prop-types';

// components
import DetailSection from 'components/explore-detail/DetailSection';
import Itemization from 'components/explore-detail/Itemization';
import Accordion from 'components/explore-detail/project/Accordion';
import BmeDetailsButton from 'components/explore-detail/project/BmeDetailsButton';
import BmeDescriptionList from 'components/explore-detail/project/BmeDescriptionList';

const getBmeDescriptions = (categoryChildren) => {
  const bmes = [];
  categoryChildren.forEach((categoryChild) => {
    const bmeObject = categoryChild.children.map(bme => ({
      id: bme.id,
      name: bme.name,
      description: bme.description,
      category: categoryChild.name
    }));

    bmes.push(...bmeObject);
  });

  return bmes;
};

export default function BmeContentAccordion(props) {
  return (
    <div className="c-bme-content-accordion">
      {props.bmes.map(bme =>
        <DetailSection
          key={bme.title}
          title={bme.title}
        >
          <Itemization
            items={bme.children}
          />
          {bme.children && bme.children.length > 0 && <Accordion
            header={BmeDetailsButton}
            content={<BmeDescriptionList bmes={getBmeDescriptions(bme.children)} />}
          />}

        </DetailSection>)}
    </div>
  );
}

BmeContentAccordion.propTypes = {
  bmes: PropTypes.array
};

BmeContentAccordion.defaultProps = {
  bmes: []
};
