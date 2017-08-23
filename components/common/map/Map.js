import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Spinner from 'components/common/Spinner';

// Leaflet can't be imported on the server because it's not isomorphic
const L = (typeof window !== 'undefined') ? require('leaflet') : null;

const MAP_CONFIG = {
  zoom: 2,
  minZoom: 2,
  zoomControl: true,
  scrollWheelZoom: false,
  worldCopyJump: true,
  center: [0, -20],
  detectRetina: true
};

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: props.loading
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.map = L.map(this.mapNode, MAP_CONFIG);

    // SETTERS
    this.setAttribution();
    this.setZoomControl();
    this.setBasemap();
    this.setLayerManager(this.props);
    this.addLayers(this.props.activeLayer, this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    const filtersChanged = !isEqual(nextProps.filters, this.props.filters);
    const layerDataChanged = !isEqual(nextProps.layerData, this.props.layerData);

    if (filtersChanged || layerDataChanged) {
      this.setLayerManager(nextProps);
      this.removeLayers();
      this.addLayers(nextProps.activeLayer, nextProps.filters);
      this.setMarkers(nextProps.layerData);
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.loading !== nextProps.loading;
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.map) this.map.remove();
    this.props.removeDataLayer();
  }

  // SETTERS
  setLayerManager({ getLayer, filters, categories }) {
    const stopLoading = () => {
      // Don't execute callback if component has been unmounted
      if (this._mounted) {
        this.setState({
          loading: false
        });
      }
    };

    this.layerManager = new this.props.LayerManager(this.map, {
      onLayerAddedSuccess: stopLoading,
      onLayerAddedError: stopLoading,
      categories,
      getLayer,
      filters
    });
  }

  setAttribution() {
    this.map.attributionControl.addAttribution('&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>');
  }

  setZoomControl() {
    if (this.map.zoomControl) this.map.zoomControl.setPosition('topright');
  }

  setBasemap() {
    this.tileLayer = L.tileLayer(process.env.BASEMAP_TILE_URL, {})
                      .addTo(this.map)
                      .setZIndex(0);
  }


  // MAP FUNCTIONS
  getCenter() { return this.map.getCenter(); }

  getZoom() { return this.map.getZoom(); }

  // LAYER METHODS
  setMarkers({ id, data }) {
    this.layerManager.setMarkers(id, data);
  }

  addLayer(layer, filters) {
    this.setState({
      loading: true
    });
    this.layerManager.addLayer(
      layer,
      filters || this.props.filters
    );
  }

  addLayers(layers, filters) {
    if (!layers) return;
    layers.forEach((layer) => {
      this.addLayer(layer, filters);
    });
  }

  removeLayer(layer) {
    this.layerManager.removeLayer(layer.id);
  }

  removeLayers() {
    this.layerManager.removeLayers();
  }

  fitBounds(geoJson) {
    const geojsonLayer = L.geoJson(geoJson);
    this.map.fitBounds(geojsonLayer.getBounds(), {
      paddingTopLeft: [0, 0],
      paddingBottomRight: [0, 0]
    });
  }

  // RENDER
  render() {
    return (
      <div className="c-map">
        {this.props.loading && <Spinner className="-map" isLoading />}
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  LayerManager: PropTypes.func,
  activeLayer: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  categories: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  filters: PropTypes.object,
  layerData: PropTypes.object,
  loading: PropTypes.bool,
  removeDataLayer: PropTypes.func
};

Map.defaultProptypes = {
  activeLayer: [],
  categories: [],
  filters: {},
  layerData: {}
};

export default Map;
