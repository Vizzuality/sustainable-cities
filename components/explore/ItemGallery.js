import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'routes';

// components
import GridSlider from 'components/common/GridSlider';
import GridList from 'components/common/GridList';

export default function ItemGallery(props) {
  const { items, isSolutionView, slider, showAll, showTitle } = props;
  return (
    <div className="c-item-gallery">
      <ul className="gallery-list">
        {slider ?
          (items || []).map(item => (
            <li className="gallery-item" key={item.id}>
              <div className="gallery-item-header">
                {showTitle &&
                  <h3 className="c-title -dark -fs-extrabig -fw-light">{item.title}</h3>}
                {showAll &&
                  <Link
                    route="explore-index"
                    params={{
                      category: isSolutionView ? 'solutions' : item.groupId,
                      subCategory: item.level === 3 ? item.parentId : item.slug,
                      children: item.level === 3 ? item.slug : null
                    }}
                  >
                    <a className="c-button -secondary">See all</a>
                  </Link>}
              </div>
              {(item.children || []).length > 0 ?
                <GridSlider items={item.children} /> :
                <div>no data available</div>}
            </li>
          ))
        : <GridList items={items} />}
      </ul>
    </div>
  );
}

ItemGallery.propTypes = {
  items: PropTypes.array,
  isSolutionView: PropTypes.bool,
  slider: PropTypes.bool,
  showAll: PropTypes.bool,
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
