import React from 'react';
import PropTypes from 'prop-types';

// Components
import GridItem from 'components/common/GridItem';

export default function GridList(props) {
  return (
    <div className="c-grid-list row align-stretch">
      { props.items.map(item => (
        <div className="column small-3" key={item.title}>
          <GridItem
            image={item.image}
            imageLayout={props.layout || item.layout}
            title={item.title}
            subtitle={item.subtitle}
            link={item.link}
            onClick={props.onClick || item.onClick}
          />
        </div>
      )) }
    </div>
  );
}

GridList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape(GridItem.propTypes)).isRequired,
  layout: GridItem.propTypes.imageLayout, // eslint-disable-line react/no-unused-prop-types
  onClick: GridItem.propTypes.onClick
};
