import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import Spinner from 'components/common/Spinner';

// Leaflet can't be imported on the server because it's not isomorphic
const L = (typeof window !== 'undefined') ? require('leaflet') : null;

const MAP_CONFIG = {
  zoom: 2,
  minZoom: 2,
  latLng: {
    lat: 30,
    lng: -120
  },
  zoomControl: true,
  scrollWheelZoom: false
};

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this._mounted = true;
    this.map = L.map(this.mapNode, {
      minZoom: MAP_CONFIG.minZoom,
      zoom: MAP_CONFIG.zoom,
      zoomControl: MAP_CONFIG.zoomControl,
      center: [0, -20],
      detectRetina: true,
      scrollWheelZoom: MAP_CONFIG.scrollWheelZoom
    });


    // if (this.props.mapConfig.bounds) {
    //   this.fitBounds(this.props.mapConfig.bounds.geometry);
    // }

    // SETTERS
    this.setAttribution();
    this.setZoomControl();
    this.setBasemap();
    this.setMapEventListeners();

    // Add layers
    this.setLayerManager();
    this.addLayers(this.props.layersActive, this.props.filters);
  }

  componentWillReceiveProps(nextProps) {
    const filtersChanged = !isEqual(nextProps.filters, this.props.filters);
    const layersActiveChanged = !isEqual(nextProps.layersActive, this.props.layersActive);

    if (filtersChanged || layersActiveChanged) {
      this.removeLayers();
      this.addLayers(nextProps.layersActive, nextProps.filters);
    }

    // Zoom
    // if (this.props.mapConfig.zoom !== nextProps.mapConfig.zoom) {
    //   this.map.setZoom(nextProps.mapConfig.zoom);
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.loading !== nextState.loading;
  }

  componentWillUnmount() {
    this._mounted = false;
    // Remember to remove the listeners before removing the map
    // or they will stay in memory
    if (this.props.setMapParams) this.removeMapEventListeners();
    this.map.remove();
  }


  // SETTERS
  setLayerManager() {
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
      onLayerAddedError: stopLoading
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

  // GETTERS
  getMapParams() {
    const params = {
      zoom: this.getZoom(),
      latLng: this.getCenter()
    };
    return params;
  }

  // MAP FUNCTIONS
  getCenter() { return this.map.getCenter(); }

  getZoom() { return this.map.getZoom(); }

  // MAP LISTENERS
  setMapEventListeners() {
    function mapChangeHandler() {
      // Dispatch the action to set the params
      this.props.setMapParams(this.getMapParams());
    }

    if (this.props.setMapParams) {
      this.map.on('zoomend', mapChangeHandler.bind(this));
      this.map.on('dragend', mapChangeHandler.bind(this));
    }
  }

  removeMapEventListeners() {
    this.map.off('zoomend');
    this.map.off('dragend');
  }

  //  ??
  addMarkers(layer, zoomStatus) {
    this.layerManager._setMarkers(layer, zoomStatus);
  }

  // LAYER METHODS
  addLayer(layer, filters) {
    this.setState({
      loading: true
    });
    this.layerManager.addLayer(layer, filters || this.props.filters);
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
        {this.state.loading && <Spinner className="-map" isLoading />}
        <div ref={(node) => { this.mapNode = node; }} className="map-leaflet" />
      </div>
    );
  }
}

Map.propTypes = {
  LayerManager: PropTypes.func,
  layersActive: PropTypes.array,
  filters: PropTypes.object,
  //  ??
  setMapParams: PropTypes.func
};

Map.defaultProptypes = {
  layersActive: [],
  filters: {}
};

export default Map;
