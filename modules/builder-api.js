import deserialize from 'utils/jsonapi-deserializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

import { apiRequest } from 'modules/helpers';


const GET_BME_TREE = 'builder/GET_BME_TREE';
const GET_SOLUTION_TREE = 'builder/GET_SOLUTION_TREE';
const GET_ENABLING_TREE = 'builder/GET_ENABLING_TREE';

const LOADING_BMES = 'builder/LOADING_BMES';
const LOADING_SOLUTIONS = 'builder/LOADING_SOLUTIONS';
const LOADING_ENABLINGS = 'builder/LOADING_ENABLINGS';

const ERROR_BMES = 'builder/ERROR_BMES';
const ERROR_SOLUTIONS = 'builder/ERROR_SOLUTIONS';
const ERROR_ENABLINGS = 'builder/ERROR_ENABLINGS';

const initialState = {
  solutionCategories: [],
  enablingCategories: [],
  bmeCategories: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BME_TREE:
      return { ...state, bmeCategories: action.payload };
    case GET_SOLUTION_TREE:
      return { ...state, solutionCategories: action.payload };
    case GET_ENABLING_TREE:
      return { ...state, enablingCategories: action.payload };
    default:
      return state;
  }
}

export function getBmes() {
  const includeParams = ['children.children.bmes', 'children.children.bmes.enablings'];

  const queryParams = queryString.stringify({
    'filter[category-type]': 'Bme',
    'filter[level]': 1,
    'fields[categories]': 'name,slug,description,category-type,label,level,children,bmes',
    'fields[enablings]': 'assessment-value,description,is-featured,name',
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
      dispatch({ type: GET_BME_TREE, payload: deserialize(bmes) });
    });
  };
}

export function getSolutions() {
  const includeParams = ['children.children.bmes'];

  const queryParams = queryString.stringify({
    'filter[category-type]': 'Solution',
    'filter[level]': 1,
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return (dispatch, getState) => {
    dispatch({ type: LOADING_SOLUTIONS, payload: true });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_SOLUTIONS, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_SOLUTIONS, payload: true });
      throw new Error(response.status);
    })
    .then((solutions) => {
      dispatch({ type: GET_SOLUTION_TREE, payload: deserialize(solutions) });
    });
  };
}

export function getEnablings() {
  const includeParams = ['enablings'];

  const queryParams = queryString.stringify({
    'filter[category-type]': 'Enabling',
    'filter[level]': 1,
    'include': includeParams.join(','),
    'page[size]': 1000
  });

  return (dispatch, getState) => {
    dispatch({ type: LOADING_ENABLINGS, payload: true });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: ERROR_ENABLINGS, payload: false });
        return response.json();
      }

      dispatch({ type: ERROR_ENABLINGS, payload: true });
      throw new Error(response.status);
    })
    .then((bmes) => {
      dispatch({ type: GET_ENABLING_TREE, payload: deserialize(bmes) });
    });
  };
}
