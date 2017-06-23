import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';

// utils
import { categoriesToTabs } from 'utils/category';

/* Actions */
const GET_CATEGORIES = 'category/GET_CATEGORIES';
const SET_FILTERS = 'category/SET_FILTERS';
const GET_FILTERED_CATEGORIES = 'category/GET_FILTERED_CATEGORIES';

const SET_LOADING_CATEGORIES = 'category/SET_LOADING_CATEGORIES';
const SET_ERROR_CATEGORIES = 'category/SET_ERROR_CATEGORIES';

/* Initial state */
const initialState = {
  // contains all categories available
  list: [],
  filters: {
    // type of the categories, can be 'Solution' or 'Bme' by now
    type: null,
    // it can be category or subcategory
    category: null
  },
  // used when one or several filters are applied to categories
  filteredList: [],
  loading: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign({}, state, { list: action.payload });
    case SET_LOADING_CATEGORIES:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_CATEGORIES:
      return Object.assign({}, state, { error: action.payload });
    case SET_FILTERS: {
      const filters = { ...state.filters, ...action.payload };
      return Object.assign({}, state, { filters });
    }
    case GET_FILTERED_CATEGORIES:
      return Object.assign({}, state, { filteredList: action.payload });
    default:
      return state;
  }
}

/* Action creators */
export function getCategoryTree() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_CATEGORIES, payload: true });

    fetch(`${process.env.API_URL}/categories?filters[type]=Solution,Bme`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CATEGORIES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CATEGORIES, payload: true });
      throw new Error(response.status);
    })
    .then(({ data }) => {
      // We don't use deserializer by now in this call
      // new Deserializer().deserialize(categories, (err, parsedCategories) => {
      //   dispatch({ type: SET_LOADING_CATEGORIES, payload: false });
      //   dispatch({ type: GET_CATEGORIES, payload: parsedCategories });
      // });

      dispatch({ type: SET_LOADING_CATEGORIES, payload: false });
      dispatch({ type: GET_CATEGORIES, payload: data });
    });
  };
}

export function getCategories() {
  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_CATEGORIES, payload: true });

    fetch(`${process.env.API_URL}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().category.error) dispatch({ type: SET_ERROR_CATEGORIES, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_CATEGORIES, payload: true });
      throw new Error(response.status);
    })
    .then((categories) => {
      new Deserializer().deserialize(categories, (err, parsedCategories) => {
        dispatch({ type: SET_LOADING_CATEGORIES, payload: false });
        dispatch({ type: GET_FILTERED_CATEGORIES, payload: parsedCategories });
      });
    });
  };
}

export function getParsedCategories() {
  return (dispatch, getState) => {
    const { list } = getState().category;

    return dispatch({
      type: GET_FILTERED_CATEGORIES,
      payload: categoriesToTabs(list)
    });
  };
}

export function setCategoryFilters(filters) {
  return (dispatch) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };
}
