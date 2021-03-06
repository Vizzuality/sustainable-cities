import React from 'react';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';

// Components
import GridItem from 'components/common/GridItem';

export default function GridList(props) {
  const { items, layout, onClick } = props;

  return (
    <div className="c-grid-list row align-stretch">
      { items && items.length > 0 ? items.map(item => (
        <div className="column small-6 medium-4 large-3" key={uuidv1()}>
          <GridItem
            image={item.image}
            imageLayout={layout || item.layout}
            title={item.title}
            subtitle={item.subtitle}
            link={item.link}
            placeholder={item.placeholder}
            onClick={onClick || item.onClick}
          />
        </div>
      )) : <div>no data available</div>}
    </div>
  );
}

GridList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(GridItem.propTypes)).isRequired,
  layout: GridItem.propTypes.imageLayout, // eslint-disable-line react/no-unused-prop-types
  onClick: GridItem.propTypes.onClick
};
