import GeoJSON from 'geojson';
import substitution from 'utils/text';

// Leaflet can't be imported on the server because it's not isomorphic
const L = (typeof window !== 'undefined') ? require('leaflet') : null;

export default class LayerManager {
  // temporary
  static getMarkerColor(type) {
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
  }

  // Constructor
  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
    this._getLayer = options.getLayer;
  }

  /*
    Public methods
  */
  addLayer(layerSpec, filters) {
    let layerConfig = {
      ...layerSpec
    };
    const { category, subCategory, children } = filters;
    const { queryParams } = layerConfig;

    if (queryParams) {
      const params = queryParams.map(p => ({
        key: p,
        value: children || subCategory || category
      }));

      const queryParsed = substitution(layerSpec.urlQuery, params);

      layerConfig = {
        ...layerConfig,
        urlQuery: queryParsed
      };
    }

    this._getLayer(layerConfig);
  }

  removeLayer(layerId) {
    if (this._mapLayers[layerId]) {
      this._map.removeLayer(this._mapLayers[layerId]);
      delete this._mapLayers[layerId];
    }
  }

  removeLayers() {
    Object.keys(this._mapLayers).forEach((id) => {
      if (this._mapLayers[id]) {
        this._map.removeLayer(this._mapLayers[id]);
        delete this._mapLayers[id];
      }
    });
  }

  setMarkers(id, data) {
    const geojson = GeoJSON.parse(data, { Point: ['lat', 'lng'] });
    this._mapLayers[id] = L.geoJson(geojson, {
      pointToLayer: (feature, latlng) =>
        new L.CircleMarker(latlng, {
          className: 'c-marker',
          radius: 5,
          fillColor: '#f00',
          fillOpacity: 1,
          color: '#000',
          weight: 1
        }),
      onEachFeature: (feature, layer) => {
        layer.bindPopup(feature.properties.name);
      }
    }).addTo(this._map);
  }
}
