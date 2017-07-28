import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
const SELECT_BME = 'builder/SELECT_BME';
const DESELECT_BME = 'builder/DESELECT_BME';
const GET_BME_TREE = 'builder/GET_BME_TREE';
const LOADING_BMES = 'builder/LOADING_BMES';
const ERROR_BMES = 'builder/ERROR_BMES';

const initialState = {
  selectedBMEs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.concat([action.payload]) };
    case DESELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.filter(bme => bme != action.payload) };
    case GET_BME_TREE:
      return { ...state, bmeCategories: action.payload };
    default:
      return state;
  }
}

/* Action creators */
export function getBmes() {
  const includeParams = ['children.children.bmes', 'children.children.bmes.enablings'];

  const queryParams = queryString.stringify({
    'filter[category-type]': 'Bme',
    'filter[level]': 1,
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return (dispatch, getState) => {
    dispatch({ type: LOADING_BMES, payload: true });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_BMES, payload: true });
      throw new Error(response.status);
    })
    .then((bmes) => {
      new Deserializer()
        .deserialize(bmes, (err, parsedBmes) => {
          dispatch({ type: LOADING_BMES, payload: false });
          dispatch({ type: GET_BME_TREE, payload: parsedBmes });
        });
    });
  };
}

export function selectBME(bmeId) {
  return (dispatch) => dispatch({ type: SELECT_BME, payload: bmeId });
}

export function deselectBME(bmeId) {
  return (dispatch) => dispatch({ type: DESELECT_BME, payload: bmeId });
}
