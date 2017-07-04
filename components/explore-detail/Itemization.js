import React from 'react';
import Proptypes from 'prop-types';

const descomposeItem = item => (
  <div key={item.id}>
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
      {props.items.map(item => descomposeItem(item))}
    </div>
  );
}

Itemization.propTypes = {
  items: Proptypes.array
};

Itemization.defaultProps = {
  items: []
};
