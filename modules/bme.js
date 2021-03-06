import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
const GET_BMES = 'bme/GET_BMES';
const SET_BME_DETAIL = 'bme/SET_BME_DETAIL';
const SET_FILTERS = 'bme/SET_FILTERS';
const RESET_FILTERS = 'bme/RESET_FILTERS';
const REMOVE_BME_DETAIL = 'bme/REMOVE_BME_DETAIL';

// loading and error management
const SET_LOADING_BMES = 'bme/SET_LOADING_BMES';
const SET_ERROR_BMES = 'bme/SET_ERROR_BMES';

/* Initial state */
const initialState = {
  list: [],
  detail: {},
  filters: {
    category: null,
    subCategory: null,
    detailId: null
  },
  loading: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BMES:
      return Object.assign({}, state, { list: action.payload });
    case SET_BME_DETAIL:
      return { ...state, detail: action.payload };
    case SET_LOADING_BMES:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_BMES:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.assign({}, state, { filters });
    }
    case RESET_FILTERS: {
      return { ...state, filters: initialState.filters };
    }
    case REMOVE_BME_DETAIL: {
      const filters = { ...state.filters, ...{ detailId: null } };
      return Object.assign({}, state, { list: [] }, { filters });
    }
    default:
      return state;
  }
}

/* Action creators */
export function getBmes(filters = {}) {
  const { category, subCategory } = filters;

  const includeParams = ['children', 'children.bmes', 'children.children.bmes', 'children.children.bmes.enablings'];

  const queryParams = queryString.stringify({
    'filter[slug]': subCategory || category || undefined,
    include: includeParams.join(','),
    'page[size]': 1000,
    sort: 'name'
  });

  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_BMES, payload: true });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BMES, payload: true });
      throw new Error(response.status);
    })
    .then((bmes) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(bmes, (err, parsedBmes) => {
          dispatch({ type: SET_LOADING_BMES, payload: false });
          dispatch({ type: GET_BMES, payload: parsedBmes });
        });
    });
  };
}

export function getBmeDetail(filters) {
  const { detailId } = filters;

  const includeParams = [
    'enablings',
    'categories',
    'categories.parent',
    'categories.parent.parent',
    'categories.parent.parent.parent',
    'projects',
    'projects.cities',
    'external-sources'
  ];

  const queryParams = queryString.stringify({
    include: includeParams.join(',')
  });

  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_BMES, payload: true });

    fetch(`${process.env.API_URL}/bmes/${detailId}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().bme.error) dispatch({ SET_ERROR_BMES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_BMES, payload: true });
      throw new Error(response.status);
    })
    .then((bme) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(bme, (err, parsedBme) => {
          dispatch({ type: SET_LOADING_BMES, payload: false });
          dispatch({ type: SET_BME_DETAIL, payload: parsedBme });
        });
    });
  };
}

export function setBmeFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

export function resetBmeFilters() {
  return (dispatch) => {
    dispatch({ type: RESET_FILTERS });
  };
}

export function removeBmeDetail() {
  return (dispatch) => {
    dispatch({ type: REMOVE_BME_DETAIL });
  };
}

