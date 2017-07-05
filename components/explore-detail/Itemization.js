import React from 'react';
import Proptypes from 'prop-types';

const descomposeItem = item => (
  <div
    key={item.id}
    className="itemization-unit"
  >
    <h3 className="c-title -dark -fs-bigger -fw-light">{item.name}</h3>
    <ul className="child-list">
      {item.children.map(child =>
        <li key={child.id} className="child-item">{child.name}</li>
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
