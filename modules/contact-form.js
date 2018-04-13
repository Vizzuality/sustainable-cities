import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
const SET_FORM_FIELD_VALUE = 'contact-form/SET_FORM_FIELD_VALUE';
const SET_FORM_LOADING = 'contact-form/SET_FORM_LOADING';
const SET_FORM_SUCCESS = 'contact-form/SET_FORM_SUCCESS';
const SET_FORM_ERROR = 'contact-form/SET_FORM_ERROR';
const SET_FORM_SENT = 'contact-form/SET_FORM_SENT';
const SET_FORM_SUBMIT = 'contact-form/SET_FORM_SUBMIT';
const RESET_FORM_DATA = 'contact-form/RESET_FORM_DATA';

/* Initial state */
const initialState = {
  fields: {
    'contact-name': '',
    'email': '',
    'message': ''
  },
  loading: false,
  success: false,
  sent: false,
  error: false
};

/* Reducer */
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_FORM_FIELD_VALUE: {
      const { name, value } = action.payload;
      return {
        ...state,
        fields: {
          ...state.fields,
          [name]: value
        }
      }
    }
    case SET_FORM_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case SET_FORM_SUCCESS:
      return Object.assign({}, state, { success: action.payload });
    case SET_FORM_ERROR:
      return Object.assign({}, state, { error: action.payload });
    case SET_FORM_SENT:
      return Object.assign({}, state, { sent: action.payload });
    case RESET_FORM_DATA:
      return Object.assign({}, state, initialState);
    default:
      return state;
  }
}

/* Action creators */
export const setFormValue = (field) =>
  dispatch => {
    dispatch({ type: SET_FORM_FIELD_VALUE, payload: field });
  };

export const setSentForm = (sent) =>
  dispatch => {
    dispatch({ type: SET_FORM_SENT, payload: sent });
  };

export const resetForm = (field) =>
  dispatch => {
    dispatch({ type: RESET_FORM_DATA });
    dispatch(setSentForm(initialState.sent));
  };

export const onSubmit = () =>
  (dispatch, getState) => {
    dispatch({ type: SET_FORM_LOADING, payload: true });
    const { fields } = getState().contactForm;
    const queryParams = { fields };

    dispatch(setSentForm(true));

    fetch(`${process.env.API_URL}/contact-us`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'SC-API-KEY': process.env.SC_API_KEY
      },
      body: JSON.stringify({ contact: { name: fields["contact-name"], email: fields["email"], message: fields["message"] } })
    })
    .then((response) => {
      if (response.ok) {
        if (getState().project.error) dispatch({ type: SET_FORM_ERROR, payload: false });
        return response.json();
      }

      dispatch({ type: SET_FORM_ERROR, payload: true });
      dispatch(setSentForm(false));
      throw new Error(response.status);
    })
    .then(response => {
      dispatch({ type: SET_FORM_LOADING, payload: false });

      // message was sent successfully
      if (response.messages[0].status === 201) {
        dispatch({ type: SET_FORM_SUCCESS, payload: true })
      } else {
        dispatch(setSentForm(false));
        dispatch({ type: SET_FORM_ERROR, payload: true });
      }
    });
  };
