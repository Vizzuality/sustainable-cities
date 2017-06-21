import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';

/* Actions */
const GET_PROJECTS = 'project/GET_PROJECTS';
const SET_FILTERS = 'project/SET_FILTERS';

const SET_LOADING_PROJECTS = 'project/SET_LOADING_PROJECTS';
const SET_ERROR_PROJECTS = 'project/SET_ERROR_PROJECTS';

/* Initial state */
const initialState = {
  list: [],
  detail: {
    id: null,
    data: {}
  },
  filters: {
    // BME category
    bme: null,
    // category or subcategory (exclusive for projects)
    solution: null,
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
    case SET_LOADING_PROJECTS:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_PROJECTS:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.asssign({}, state, { filters });
    }
    default:
      return state;
  }
}

/* Action creators */
export function getProjects() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_PROJECTS, payload: true });

    fetch(`${process.env.API_URL}/study-cases`, {
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
      new Deserializer().deserialize(projects, (err, parsedProjects) => {
        dispatch({ type: SET_LOADING_PROJECTS, payload: false });
        dispatch({ type: GET_PROJECTS, payload: parsedProjects });
      });
    });
  };
}

export function setFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}
