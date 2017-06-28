import React from 'react';
import Proptypes from 'prop-types';

const descomposeItem = item => (
  <div>
    <h3 className="item-title">{item.name}</h3>
    <ul className="item-child-list">
      {item.children.map(child =>
        <li key={child.id} className="item-child-list">{child.name}</li>
      )}
    </ul>
  </div>
);

export default function Itemization(props) {
  return (
    <div className="c-itemization">
      {props.items(item => descomposeItem(item))}
    </div>
  );
}

Itemization.propTypes = {
  items: Proptypes.array
};

Itemization.defaultProps = {
  items: []
};
