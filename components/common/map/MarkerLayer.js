
import GeoJSON from 'geojson';

import { CATEGORY_FIRST_LEVEL_COLORS, CATEGORY_SOLUTIONS_COLORS } from 'constants/category';

// Leaflet can't be imported on the server because it's not isomorphic
const L = (typeof window !== 'undefined') ? require('leaflet') : null;


const DEFAULT_MARKER_OPTIONS = {
  className: 'c-marker',
  radius: 5,
  fillColor: '#f00',
  fillOpacity: 1,
  weight: 0
};

export default class MarkerLayer {
  constructor(data, map, filters, categories) {
    this._data = data;
    this._map = map;
    this._filters = filters;
    this._categories = categories;

    return this.render();
  }

  parseMarkerOptions({ projects }) {
    const { category } = this._filters;
    let fillColor = DEFAULT_MARKER_OPTIONS.color;
    let radius = DEFAULT_MARKER_OPTIONS.radius;
    const value = projects.length;

    // all solutions / single-solution
    if (category === 'solutions') {
      // temporary solution. Now is taking the first project to set the color
      // in case a city has more than one.
      const project = projects[0] || {};
      const categoryLevel2 = project['category-level-2'];

      if (!categoryLevel2) {
        return {
          ...DEFAULT_MARKER_OPTIONS,
          fillColor
        };
      }

      const categoryObject = this._categories.find(cat => cat.slug === categoryLevel2);
      fillColor = CATEGORY_SOLUTIONS_COLORS[(categoryObject || {}).slug];
    }

    // no solution cases
    if (category !== 'solutions') {
      fillColor = CATEGORY_FIRST_LEVEL_COLORS[category];
    }

    radius = value !== 0 || value !== 1 ? ((radius * Math.log(value)) + 5) : 5;

    return {
      ...DEFAULT_MARKER_OPTIONS,
      fillColor,
      radius
    };
  }

  render() {
    const geojson = GeoJSON.parse(this._data, { Point: ['lat', 'lng'] });
    return L.geoJson(geojson, {
      pointToLayer: (feature, latlng) =>
        new L.CircleMarker(latlng, this.parseMarkerOptions(feature.properties)),
      onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.name)
    }).addTo(this._map);
  }
}
