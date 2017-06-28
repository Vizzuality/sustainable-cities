import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

// utils
import { projectsBySolution, listProjects } from 'utils/project';

/* Actions */
const GET_PROJECTS = 'project/GET_PROJECTS';
const SET_PARSED_PROJECTS = 'project/SET_PARSED_PROJECTS';
const SET_PROJECT_DETAIL = 'project/SET_PROJECT_DETAIL';
const SET_SOLUTION_ID = 'project/SET_SOLUTION_ID';
const SET_FILTERS = 'project/SET_FILTERS';
const REMOVE_PROJECT_DETAIL = 'project/REMOVE_PROJECT_DETAIL';

const SET_LOADING_PROJECTS = 'project/SET_LOADING_PROJECTS';
const SET_ERROR_PROJECTS = 'project/SET_ERROR_PROJECTS';

/* Initial state */
const initialState = {
  list: [],
  parsedList: [],
  detail: {},
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
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });
    const { solution } = filters;

    const queryParams = queryString.stringify({
      'filters[solution]': solution || undefined
    });

    fetch(`${process.env.API_URL}/study-cases?${queryParams}`, {
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

export function getProjectDetail(projectId) {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });

    fetch(`${process.env.API_URL}/study-cases/${projectId}`, {
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
      new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(project, (err, parsedProject) => {
        dispatch({ type: SET_LOADING_PROJECTS, payload: false });
        dispatch({ type: SET_PROJECT_DETAIL, payload: parsedProject });
      });
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

export function removeProjectDetail() {
  return (dispatch) => {
    dispatch({ type: REMOVE_PROJECT_DETAIL });
  };
}

