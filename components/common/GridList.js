import React from 'react';
import PropTypes from 'prop-types';

// Components
import GridItem from 'components/common/GridItem';

export default function GridList(props) {
  const { items, layout, onClick } = props;
  return (
    <div className="c-grid-list row align-stretch">
      { items.length > 0 ? items.map(item => (
        <div className="column small-3" key={item.id}>
          <GridItem
            image={item.image}
            imageLayout={layout || item.layout}
            title={item.title}
            subtitle={item.subtitle}
            link={item.link}
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
