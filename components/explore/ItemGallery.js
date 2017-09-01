import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import GridSlider from 'components/common/GridSlider';
import GridList from 'components/common/GridList';

const MAX_ITEMS_PER_ROW = 4;

export default function ItemGallery(props) {
  const { items, isSolutionView, slider, showAll, showTitle } = props;

  let resultItems = items;
  if (isSolutionView && !slider) {
    resultItems = resultItems.map(c => c.children)[0];
  }

  return (
    <div className="c-item-gallery">
      <ul className="gallery-list">
        {slider ?
          (items || []).map(item => (
            (item.children || []).length > 0 &&
              <li className="gallery-item" key={item.id}>
                <div className="gallery-item-header">
                  <div className="gallery-item-title">
                    {item.icon &&
                    <svg className="icon -big -dark -in-line-left"><use xlinkHref={`#${item.icon}`} /></svg>}
                    {showTitle &&
                      <h3 className="c-title -dark -fs-extrabig -fw-light">{item.title}</h3>}
                  </div>
                  {(showAll &&
                    (item.children || []).length > MAX_ITEMS_PER_ROW) &&
                      <Link
                        route={item.link.route}
                        params={item.link.params}
                      >
                        <a className="c-button -secondary">See all</a>
                      </Link>}
                </div>
                {(item.children || []).length > 0 ?
                  <GridSlider
                    items={item.children}
                  /> :
                  <div>no data available</div>}
              </li>
          ))
        : <GridList items={resultItems || []} />}
      </ul>
    </div>
  );
}

ItemGallery.propTypes = {
  items: PropTypes.array,
  isSolutionView: PropTypes.bool,
  slider: PropTypes.bool,
  showAll: PropTypes.bool,
  showTitle: PropTypes.bool
};

ItemGallery.defaultProps = {
  items: [],
  // shows/hides title
  showTitle: true,
  // sets by default GridSlider as default componnent container.
  // Otherwise it will use GridList.
  slider: true
};
