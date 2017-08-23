
import { render } from 'react-dom';
import GeoJSON from 'geojson';
import { groupProjectsByCity } from 'utils/project';
import uniq from 'lodash/uniq';
import compact from 'lodash/compact';

// components
import Infowindow from 'components/common/map/Infowindow';

// constants
import { CATEGORY_FIRST_LEVEL_COLORS, CATEGORY_SOLUTIONS_COLORS } from 'constants/category';

// Leaflet can't be imported on the server because it's not isomorphic
const L = (typeof window !== 'undefined') ? require('leaflet') : null;

const DEFAULT_MARKER_OPTIONS = {
  className: 'c-marker',
  size: 10,
  zIndex: 2000
};

export default class MarkerLayer {
  static _getType({ category }) {
    let type = 'bme';

    switch (category) {
      case 'solutions':
        type = 'solution';
        break;
      case 'cities':
        type = 'city';
        break;
      default:
        type = 'bme';
    }

    return type;
  }

  static _getMarkerContent({ fillColor, size }) {
    return `<div class="c-marker" style="background: ${fillColor}; width: ${size}px; height: ${size}px;">`;
  }

  constructor(data, map, filters, categories) {
    this._data = data;
    this._map = map;
    this._filters = filters;
    this._categories = categories;

    return this.render();
  }

  parseMarkerOptions({ projects }) {
    const { category, subCategory, children } = this._filters;
    let { size, zIndex } = DEFAULT_MARKER_OPTIONS;
    let fillColor = '';
    let value = 1;

    // solution cases
    if (category === 'solutions' || category === 'cities') {
      // temporary solution. Now is taking the first project to set the color
      // in case a city has more than one.
      const project = projects[0] || {};
      const categoryLevel2 = project.categoryLevel2;
      const isMultiSolution = (uniq(compact(projects.map(p => p.categoryLevel2)) || []).length > 1);

      if (isMultiSolution) zIndex = -DEFAULT_MARKER_OPTIONS.zIndex;


      if (!categoryLevel2) {
        return {
          ...DEFAULT_MARKER_OPTIONS,
          fillColor,
          zIndex
        };
      }

      if (category === 'solutions') {
        fillColor = !isMultiSolution ?
          CATEGORY_SOLUTIONS_COLORS[categoryLevel2] : CATEGORY_SOLUTIONS_COLORS['multi-solution'];
      } else {
        // cities
        fillColor = CATEGORY_SOLUTIONS_COLORS['multi-solution'];
      }

      value = projects.length;
    }

    // no solution cases
    if (category !== 'solutions' && category !== 'cities') {
      const { cities } = projects[0] || {};
      const city = cities[0] || {};
      const { bmesQuantity } = city;
      let currentBme = {};

      if (category) {
        currentBme = (bmesQuantity || []).find(bme => bme.slug === category) || {};
      }

      if (subCategory) {
        currentBme = (currentBme.children || []).find(bme => bme.slug === subCategory) || {};
      }

      if (children) {
        currentBme = (currentBme.children || []).find(bme => bme.slug === children) || {};
      }

      value = currentBme.quantity || value;
      fillColor = CATEGORY_FIRST_LEVEL_COLORS[category];
    }

    size = (value !== 0 && value !== 1) ?
      ((size * Math.log(value)) + 5) : DEFAULT_MARKER_OPTIONS.size;

    return {
      ...DEFAULT_MARKER_OPTIONS,
      fillColor,
      size,
      zIndex
    };
  }

  render() {
    const projectsByCity = groupProjectsByCity(this._data);
    const geojson = GeoJSON.parse(projectsByCity, { Point: ['lat', 'lng'] });
    return L.geoJson(geojson, {
      pointToLayer: (feature, latlng) => {
        const markerOptions = this.parseMarkerOptions(feature.properties);
        const { size, zIndex } = markerOptions;
        const iconSize = [size, size];

        return new L.Marker(latlng, {
          icon: L.divIcon({
            html: MarkerLayer._getMarkerContent(markerOptions),
            iconSize
          }),
          zIndexOffset: zIndex
        });
      },
      onEachFeature: (feature, layer) => layer.bindPopup(
        render(
          Infowindow({
            ...feature.properties,
            type: MarkerLayer._getType(this._filters),
            filters: this._filters,
            categories: this._categories
          })
        , window.document.createElement('div'))
      )
    }).addTo(this._map);
  }
}
