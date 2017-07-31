
import GeoJSON from 'geojson';
import groupBy from 'lodash/groupBy';

// constants
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
  constructor(data, map, filters) {
    this._data = data;
    this._map = map;
    this._filters = filters;

    return this.render();
  }

  parseData(data) {
    let parsedData = [];
    const { category, subCategory } = this._filters;

    switch (true) {
      case (category === 'solutions' && !!subCategory): {
        const projectsByCity = groupBy(data, d => d.cities[0].name);
        // const citiesWithProjects = [];
        Object.keys(projectsByCity).forEach((cityName) => {
          const cityData = (projectsByCity[cityName] || []).length ?
            projectsByCity[cityName][0].cities[0] : {};
          const { lat, lng } = cityData;

          parsedData.push({
            name: cityName,
            lat,
            lng,
            projects: projectsByCity[cityName]
          });
        });
        break;
      }

      default: {
        parsedData = data;
      }
    }

    return parsedData;
  }

  parseMarkerOptions({ projects }) {
    const { category } = this._filters;
    let fillColor = DEFAULT_MARKER_OPTIONS.color;
    let radius = DEFAULT_MARKER_OPTIONS.radius;
    const value = projects.length;

    // all solutions / single-solution cases
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

      fillColor = CATEGORY_SOLUTIONS_COLORS[categoryLevel2];
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
    const parsedData = this.parseData(this._data);
    const geojson = GeoJSON.parse(parsedData, { Point: ['lat', 'lng'] });
    return L.geoJson(geojson, {
      pointToLayer: (feature, latlng) =>
        new L.CircleMarker(latlng, this.parseMarkerOptions(feature.properties)),
      onEachFeature: (feature, layer) => layer.bindPopup(feature.properties.name)
    }).addTo(this._map);
  }
}
