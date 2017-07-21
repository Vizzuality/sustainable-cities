import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
const GET_PROJECTS = 'project/GET_PROJECTS';
const SET_PROJECT_DETAIL = 'project/SET_PROJECT_DETAIL';
const SET_FILTERS = 'project/SET_FILTERS';
const RESET_FILTERS = 'project/RESET_FILTERS';
const REMOVE_PROJECT_DETAIL = 'project/REMOVE_PROJECT_DETAIL';

// loading and error management
const SET_LOADING_PROJECTS = 'project/SET_LOADING_PROJECTS';
const SET_ERROR_PROJECTS = 'project/SET_ERROR_PROJECTS';

/* Initial state */
const initialState = {
  list: [],
  detail: {},
  filters: {
    category: null,
    detailId: null,
    city: null
  },
  loading: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return Object.assign({}, state, { list: action.payload });
    case SET_PROJECT_DETAIL:
      return Object.assign({}, state, { detail: action.payload });
    case REMOVE_PROJECT_DETAIL: {
      const filters = { ...state.filters, ...{ detailId: null } };
      return Object.assign({}, state, { list: [] }, { filters });
    }
    case SET_LOADING_PROJECTS:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_PROJECTS:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.assign({}, state, { filters });
    }
    case RESET_FILTERS: {
      const filters = { ...state.filters, ...initialState.filters };
      return Object.assign({}, state, { filters });
    }
    default:
      return state;
  }
}

/* Action creators */
export function getProjectsByCategory(filters = {}) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });
    const { category } = filters;

    const includeFields = ['projects', 'children', 'children.projects'];
    const levelFilter = [2, 3];

    const queryParams = queryString.stringify({
      'filter[slug]': category !== 'solutions' ? category : undefined,
      'filter[category-type]': 'Solution',
      'filter[level]': levelFilter.join(','),
      include: includeFields.join(',')
    });

    fetch(`${process.env.API_URL}/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_PROJECTS, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_PROJECTS, payload: true });
      throw new Error(response.status);
    })
    .then((projects) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(projects, (err, parsedProjects) => {
          dispatch({ type: SET_LOADING_PROJECTS, payload: false });
          dispatch({ type: GET_PROJECTS, payload: parsedProjects });
        });
    });
  };
}

export function getProjectDetail(projectId) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });

    const includeFields = ['category', 'cities', 'country', 'external-sources', 'impacts', 'impacts.category'];

    const queryParams = queryString.stringify({
      include: includeFields.join(',')
    });

    fetch(`${process.env.API_URL}/study-cases/${projectId}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_PROJECTS, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_PROJECTS, payload: true });
      throw new Error(response.status);
    })
    .then((project) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(project, (err, parsedProject) => {
          dispatch({ type: SET_LOADING_PROJECTS, payload: false });
          dispatch({ type: SET_PROJECT_DETAIL, payload: parsedProject });
        });
    });
  };
}

export function setProjectFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}

export function resetProjectFilters() {
  return (dispatch) => {
    dispatch({ type: RESET_FILTERS });
  };
}

export function removeProjectDetail() {
  return (dispatch) => {
    dispatch({ type: REMOVE_PROJECT_DETAIL });
  };
}

