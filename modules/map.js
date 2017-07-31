import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';

/* Actions */
// setters and getters
const GET_LAYER = 'map/GET_LAYER';
const REMOVE_DATA_LAYER = 'map/REMOVE_DATA_LAYER';
// load management
const SET_LOADING_LAYER = 'map/SET_LOADING_LAYER';
// error management
const SET_ERROR_LAYER = 'map/SET_ERROR_LAYER';

/* Initial state */
const initialState = {
  layer: {
    id: null,
    data: []
  },
  error: false,
  loading: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LAYER:
      return Object.assign({}, state, {
        layer: { id: action.payload.id, data: action.payload.data }
      });
    case REMOVE_DATA_LAYER:
      return Object.assign({}, state, { layer: initialState.layer });
    case SET_LOADING_LAYER:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_LAYER:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
}

/* Action creators */
// Retrieves categories of type Solution
export function getLayer(layerSpec = {}) {
  const { urlQuery, id } = layerSpec;
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_LAYER, payload: true });

    fetch(`${process.env.API_URL}${urlQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_LAYER, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_LAYER, payload: true });
      throw new Error(response.status);
    })
    .then((layerData) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(layerData, (err, parsedLayerData) => {
          dispatch({ type: SET_LOADING_LAYER, payload: false });
          console.log(parsedLayerData);
          dispatch({ type: GET_LAYER, payload: { id, data: parsedLayerData } });
        });
    });
  };
}

export function removeDataLayer() {
  return (dispatch) => {
    dispatch({ type: REMOVE_DATA_LAYER });
  };
}
