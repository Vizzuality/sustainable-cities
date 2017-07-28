import React from 'react';
import Proptypes from 'prop-types';

export default function ItemList(props) {
  return (
    <div className="c-itemlist">
      <ul className="itemlist">
        {props.items.map(item =>
          <li className="itemlist-item" key={item.id}>
            <a href={item.link} className="item-link" target="_blank" rel="noopener noreferrer">{item.name}</a>
          </li>
        )}
      </ul>
    </div>
  );
}

ItemList.propTypes = {
  items: Proptypes.array
};

ItemList.defaultProps = {
  items: []
};
