import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';
import moment from 'moment';

/* Actions */
const GET_ABOUT_DATA = 'about/GET_ABOUT_DATA';
const RESET_DATA = 'about/RESET_DATA';

// loading and error management
const SET_LOADING_ABOUT = 'bme/SET_LOADING_ABOUT';
const SET_ERROR_ABOUT = 'bme/SET_ERROR_ABOUT';

/* Initial state */
const initialState = {
  list: [],
  loading: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ABOUT_DATA:
      return Object.assign({}, state, { list: action.payload });
    case SET_LOADING_ABOUT:
      return Object.assign({}, state, { loading: action.payload });
    case SET_ERROR_ABOUT:
      return Object.assign({}, state, { error: action.payload });
    case RESET_DATA: {
      return { ...state, list: initialState.list };
    }
    default:
      return state;
  }
}

/* Action creators */
export function getDataAbout(type) {
  const queryParams = queryString.stringify({
    include: 'photos',
    'page[size]': 1000
  });

  return (dispatch, getState) => {
    dispatch({ type: SET_LOADING_ABOUT, payload: true });

    fetch(`${process.env.API_URL}/${type}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      }
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_ERROR_ABOUT, payload: false });
        return response.json();
      }

      dispatch({ type: SET_ERROR_ABOUT, payload: true });
      throw new Error(response.status);
    })
    .then((data) => {
      new Deserializer({ keyForAttribute: 'camelCase' })
        .deserialize(data, (err, parsedData = []) => {
          dispatch({ type: SET_LOADING_ABOUT, payload: false });
          dispatch({
            type: GET_ABOUT_DATA,
            payload: parsedData.map(d => ({
              ...d,
              ...{ date: moment(d.date).format('MMMM D, YYYY') },
              ...d.photos[0] && { image: `${process.env.API_URL}${d.photos[0].attachment.url}` }
            }))
          });
        });
    });
  };
}

export function resetData() {
  return (dispatch) => {
    dispatch({ type: RESET_DATA });
  };
}
