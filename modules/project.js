import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

// utils
import { projectsBySolution, listProjects } from 'utils/project';

/* Actions */
const GET_PROJECTS = 'project/GET_PROJECTS';
const SET_PARSED_PROJECTS = 'project/SET_PARSED_PROJECTS';
const SET_SOLUTION_ID = 'project/SET_SOLUTION_ID';
const SET_FILTERS = 'project/SET_FILTERS';

const SET_LOADING_PROJECTS = 'project/SET_LOADING_PROJECTS';
const SET_ERROR_PROJECTS = 'project/SET_ERROR_PROJECTS';

/* Initial state */
const initialState = {
  list: [],
  parsedList: [],
  detailId: null,
  filters: {
    // BME category
    bme: null,
    // id used to get a single project
    detailId: null,
    // category or subcategory (exclusive for projects)
    solution: 'all',
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
    case SET_PARSED_PROJECTS:
      return Object.assign({}, state, { parsedList: action.payload });
    case SET_LOADING_PROJECTS:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_PROJECTS:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.assign({}, state, { filters });
    }
    case SET_SOLUTION_ID: {
      const filters = { ...state.filters, ...{ solution: action.payload } };
      return Object.assign({}, state, { filters });
    }
    default:
      return state;
  }
}

/* Action creators */
export function getProjects(filters = {}) {
  const { detailId } = filters;
  let endpoint = '/study-cases?';

  if (detailId) {
    endpoint = `/study-cases/${detailId}`;
  }

  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });
    const { solution } = filters;

    const queryParams = queryString.stringify({
      'filters[solution]': solution
    });

    fetch(`${process.env.API_URL}${endpoint}${queryParams}`, {
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
      if (!solution) {
        new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(projects, (err, parsedProjects) => {
          dispatch({ type: SET_LOADING_PROJECTS, payload: false });
          dispatch({ type: GET_PROJECTS, payload: parsedProjects });
        });
      }

      dispatch({ type: SET_LOADING_PROJECTS, payload: false });
      dispatch({ type: GET_PROJECTS, payload: projects.data });
    });
  };
}

export function setParsedProjects(projects, filters) {
  const parsedProjects = filters.solution === 'all' ?
    projectsBySolution(projects) : listProjects(projects);
  return (dispatch) => {
    dispatch({ type: SET_PARSED_PROJECTS, payload: parsedProjects });
  };
}

export function setProjectFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
    dispatch({ type: SET_PARSED_PROJECTS, payload: [] });
  };
}


export function setSolutionId(solutionId) {
  return (dispatch) => {
    dispatch({ type: SET_SOLUTION_ID, payload: solutionId });
  };
}

