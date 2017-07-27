
/* Actions */
const SELECT_BME = 'builder/SELECT_BME';
const DESELECT_BME = 'builder/DESELECT_BME';

const initialState = {
  selectedBMEs: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.concat([action.payload]) };
    case DESELECT_BME:
      return { ...state, selectedBMEs: state.selectedBMEs.filter(bme => bme != action.payload) };
    default:
      return state;
  }
}

export function selectBME(bmeId) {
  return (dispatch) => dispatch({ type: SELECT_BME, payload: bmeId });
}

export function deselectBME(bmeId) {
  return (dispatch) => dispatch({ type: DESELECT_BME, payload: bmeId });
}
