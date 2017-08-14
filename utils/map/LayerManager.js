
// components
import MarkerLayer from 'components/common/map/MarkerLayer';

// utils
import substitution from 'utils/text';

export default class LayerManager {

  constructor(map, options = {}) {
    this._map = map;
    this._mapLayers = {};
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
    this._getLayer = options.getLayer;
    this._filters = options.filters;
    this._categories = options.categories;
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
    this._mapLayers[id] = new MarkerLayer(
      data,
      this._map,
      this._filters,
      this._categories
    );
  }
}
