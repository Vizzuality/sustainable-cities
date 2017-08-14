import { Deserializer } from 'jsonapi-serializer';
import fetch from 'isomorphic-fetch';
import * as queryString from 'query-string';

/* Actions */
const SELECT_SOLUTION = 'builder/SELECT_SOLUTION';
const SELECT_BME = 'builder/SELECT_BME';
const DESELECT_BME = 'builder/DESELECT_BME';
const COMMENT_BME = 'builder/COMMENT_BME';
const SELECT_ENABLING = 'builder/SELECT_ENABLING';
const DESELECT_ENABLING = 'builder/DESELECT_ENABLING';
const SET_FIELD = 'builder/SET_FIELD';
const RESET = 'builder/RESET';

const initialState = {
  commentedBMEs: {},
  selectedBMEs: [],
  selectedSolution: null,
  selectedEnablings: [],
  title: "Project title",
  description: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_ENABLING:
      return { ...state, selectedEnablings: state.selectedEnablings.concat([action.enablingId]) };
    case SELECT_SOLUTION:
      return { ...state, selectedSolution: action.solutionId };
    case SELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.concat([action.bmeId]) };
    case DESELECT_ENABLING:
      return { ...state, selectedEnablings: state.selectedEnablings.filter(bme => bme != action.enablingId) };
    case DESELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.filter(bme => bme != action.bmeId) };
    case COMMENT_BME:
      return { ...state, commentedBMEs: { ...state.commentedBMEs, [action.bmeId]: action.comment } }
    case RESET:
      return { ...initialState };
    case SET_FIELD:
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
}

export function selectSolution(solutionId) {
  return (dispatch) => dispatch({ type: SELECT_SOLUTION, solutionId });
}

export function selectBME(bmeId) {
  return (dispatch) => dispatch({ type: SELECT_BME, bmeId });
}

export function deselectBME(bmeId) {
  return (dispatch) => dispatch({ type: DESELECT_BME, bmeId });
}

export function selectEnabling(enablingId) {
  return (dispatch) => dispatch({ type: SELECT_ENABLING, enablingId });
}

export function deselectEnabling(enablingId) {
  return (dispatch) => dispatch({ type: DESELECT_ENABLING, enablingId });
}

export function commentBME(bmeId, comment) {
  return (dispatch) => dispatch({ type: COMMENT_BME, bmeId, comment });
}

export function reset() {
  return (dispatch) => dispatch({ type: RESET });
}

export function setField(field, value) {
  return (dispatch) => dispatch({ type: SET_FIELD, field, value });
}
