// import React from 'react';

export default function Marker({ latlng, feature }) {
  debugger
  // temporary
  const getMarkerColor = (type) => {
    switch (type) {
      case 'all-solutions':
        return 'red';
      case 'one-solution':
        return 'blue';
      case 'bme':
        return 'green';
      default:
        return 'black';
    }
  };

  console.log(feature);

  return new L.CircleMarker(latlng, {
    className: 'c-marker',
    radius: 5,
    fillColor: getMarkerColor(layerSpec.type),
    fillOpacity: 1,
    color: '#000',
    weight: 1
  });
}
