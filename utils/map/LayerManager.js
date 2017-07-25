import fetch from 'isomorphic-fetch';
import { Deserializer } from 'jsonapi-serializer';
import GeoJSON from 'geojson';

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
    this._markerLayers = {};
    this._mapRequests = {};
    this._mapLayersLoading = {};
    this._rejectLayersLoading = false;
    this._onLayerAddedSuccess = options.onLayerAddedSuccess;
    this._onLayerAddedError = options.onLayerAddedError;
    this._filters = options.filters || {};
  }

  /*
    Public methods
  */
  addLayer(layerSpec) {
    const layerConfig = {
      ...layerSpec.layerConfig,
      ...{ id: layerSpec.id, category: layerSpec.category }
    };

    // const options = opts;

    // if (this._mapRequests[layerConfig.category]) {
    //   if (this._mapRequests[layerConfig.category].readyState !== 4) {
    //     this._mapRequests[layerConfig.category].abort();
    //     delete this._mapRequests[layerConfig.category];
    //     this._deleteLoader(layerConfig.id);
    //   }
    // }

    // const layerConfigConverted = getObjectConversion(layerConfig, options, 'water');
    // const layerConfigParsed = {
    //   ...layerConfigConverted,
    //   ...{ body: LayerManager._getLayerConfigParsed(layerConfigConverted) }
    // };

    // Save loader
    this._addLoader(layerSpec.id);

    // Save request && send
    this._mapRequests[layerSpec.id] = fetch(`${process.env.API_URL}${layerSpec.urlQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      this._deleteLoader(layerConfig.id);
      throw new Error(response.status);
    })
    .then((cities) => {
      new Deserializer()
        .deserialize(cities, (err, parsedCities) => {
          // temporary filter until API allows it
          const citiesWithProjects = parsedCities.filter(city => city.projects.length);
          const geojson = GeoJSON.parse(citiesWithProjects, { Point: ['lat', 'lng'] });

          this._mapLayers[layerSpec.id] = L.geoJson(geojson, {
            pointToLayer: (feature, latlng) =>
              new L.CircleMarker(latlng, {
                className: 'c-marker',
                radius: 5,
                fillColor: LayerManager.getMarkerColor(layerSpec.type),
                fillOpacity: 1,
                color: '#000',
                weight: 1
              }),
            onEachFeature: (feature, layer) => {
              layer.bindPopup(feature.properties.name);
            }
          }).addTo(this._map);

          this._deleteLoader(layerSpec.id);
        });
    });
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
    this._mapLayersLoading = {};
  }

  /**
   * PRIVATE METHODS
   * - _addLoader
   * - _removeLoader
  */
  _addLoader(id) {
    this._mapLayersLoading[id] = true;
  }

  _deleteLoader(id) {
    delete this._mapLayersLoading[id];
    // Check if all the layers are loaded
    if (!Object.keys(this._mapLayersLoading).length) {
      if (this._onLayerAddedSuccess) this._onLayerAddedSuccess();
    }
  }
}
