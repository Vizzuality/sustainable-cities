import React from 'react';
import PropTypes from 'prop-types';

// components
import GridSlider from 'components/common/GridSlider';
import GridList from 'components/common/GridList';

export default function ItemGallery(props) {
  return (
    <div className="c-item-gallery">
      <ul className="gallery-list">
        {props.slider ?
          props.items.map(item => (
            <li className="gallery-item" key={item.id}>
              {props.showTitle &&
                <h3 className="c-title -dark -fs-extrabig -fw-light">{item.title}</h3>}
              <GridSlider items={item.children} />
            </li>
          ))
        : <GridList items={props.items} />}
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
  items: [],
  // shows/hides title
  showTitle: true,
  // sets by default GridSlider as default componnent container.
  // Otherwise it will use GridList.
  slider: true
};
