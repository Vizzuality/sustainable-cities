import React from 'react';
import PropTypes from 'prop-types';

// components
import GridSlider from 'components/common/GridSlider';
import GridList from 'components/common/GridList';

export default function ItemGallery(props) {
  return (
    <div className="c-item-gallery">
      <ul className="gallery-list">
        {props.items.map(item => (
          <li className="gallery-item" key={item.title}>
            {props.showTitle &&
              <h3 className="gallery-title">{item.title}</h3>}
            {props.slider ?
              <GridSlider items={item.children} /> :
              <GridList items={item.children} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

ItemGallery.propTypes = {
  items: PropTypes.array,
  slider: PropTypes.bool,
  showTitle: PropTypes.bool // eslint-disable-line react/no-unused-prop-types
};

ItemGallery.defaultProps = {
  // [
  // { title: 'Bike sharing system',
  //   children: [
  //    { id: 1,
  //      title: 'Capital bikeshare',
  //      subtitle: 'Washington DC',
  //      link: { route: 'explore-detail', params: { category: 2, id: 1 }}
  //   }]
  //  },
  // ...
  // ]
  items: [],
  // shows/hides title
  showTitle: true,
  // sets by default GridSlider as default componnent container.
  // Otherwise it will use GridList.
  slider: true
};
