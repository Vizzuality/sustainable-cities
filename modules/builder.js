import { Deserializer } from 'jsonapi-serializer';
import deserialize from 'utils/jsonapi-deserializer';
import * as queryString from 'query-string';
import fromPairs from 'lodash/fromPairs';
import { combineReducers } from 'redux';

import { apiRequest } from 'modules/helpers';


/* Actions */
const SELECT_SOLUTION = 'builder/SELECT_SOLUTION';
const SELECT_BME = 'builder/SELECT_BME';
const DESELECT_BME = 'builder/DESELECT_BME';
const COMMENT_BME = 'builder/COMMENT_BME';
const SELECT_ENABLING = 'builder/SELECT_ENABLING';
const DESELECT_ENABLING = 'builder/DESELECT_ENABLING';
const SET_FIELD = 'builder/SET_FIELD';
const RESET = 'builder/RESET';

const ADD_CUSTOM_BME = 'builder/ADD_CUSTOM_BME';
const DELETE_CUSTOM_BME = 'builder/DELETE_CUSTOM_BME';

const BM_CREATING = 'builder/BM_CREATING';
const BM_CREATED = 'builder/BM_CREATED';
const BM_GET = 'builder/BM_GET';

export const SLICE_NEW = 'new';
export const SLICE_EXISTING = 'existing';

const initialSliceState = {
  commentedBMEs: {},
  selectedBMEs: [],
  customBMEs: [],
  selectedSolution: null,
  selectedEnablings: [],
  title: "Project title",
  description: "",
};

const sliceReducer = (state = initialSliceState, action) => {
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
    case ADD_CUSTOM_BME:
      const tempId = (state.maxTempId || -1) + 1;
      const id = `custom-${tempId}`;

      return {
        ...state,
        maxTempId: tempId,
        customBMEs: state.customBMEs.concat([{ id, tempId, name: action.bme.name, category: action.bme.category }]),
        commentedBMEs: { ...state.commentedBMEs, [id]: action.bme.comment },
      };
    case DELETE_CUSTOM_BME:
      return {
        ...state,
        customBMEs: state.customBMEs.filter(bme => bme.id != action.bme.id),
        commentedBMEs: { ...state.commentedBMEs, [action.bme.id]: undefined },
      };

    case RESET:
      return { ...initialSliceState };
    case SET_FIELD:
      return { ...state, [action.field]: action.value };

    case BM_CREATED:
      return { ...state, writableId: action.writableId, readableId: action.readableId };
    case BM_GET:
      if (state.readableId === action.project['link-share']) {
        return state;
      }

      const publicBmBmes = action.project['business-model-bmes'].filter(bmbme => !bmbme.bme.private);
      const privateBmBmes = action.project['business-model-bmes'].filter(bmbme => bmbme.bme.private);

      return {
        ...state,
        title: action.project.title,
        description: action.project.description,
        selectedSolution: action.project['solution-id'],

        selectedBMEs: publicBmBmes.map(bmbme => bmbme.bme.id),
        commentedBMEs: fromPairs(
          publicBmBmes.map(bmbme => ([
            bmbme.bme.id,
            bmbme.comment ? bmbme.comment.body : null,
          ])).concat(privateBmBmes.map((bmbme, i) => ([
            `custom-${i}`,
            bmbme.comment ? bmbme.comment.body : null,
          ])))
        ),

        bmeInternalIds: fromPairs(
          [].concat(
            publicBmBmes.map(bmbme => ([
              bmbme.bme.id,
              bmbme.id,
            ])),
            privateBmBmes.map((bmbme, i) => ([
              `custom-${i}`,
              bmbme.id,
            ])),
          )
        ),

        privateBmeInternalIds: fromPairs(
          privateBmBmes.map((bmbme, i) => ([
            `custom-${i}`,
            bmbme.bme.id,
          ]))
        ),

        maxTempId: privateBmBmes.length - 1,

        customBMEs: privateBmBmes.map((bmbme, i) => ({
          id: `custom-${i}`,
          tempId: i,
          name: bmbme.bme.name,
          category: bmbme.bme.categories[0].id,
        })),

        commentInternalIds: fromPairs(
          [].concat(
            publicBmBmes.map(bmbme => ([
              bmbme.bme.id,
              bmbme.comment ? bmbme.comment.id : null,
            ])),
            privateBmBmes.map((bmbme, i) => ([
              `custom-${i}`,
              bmbme.comment ? bmbme.comment.id : null,
            ])),
          )
        ),
        selectedEnablings: action.project.enablings.map(enabling => enabling.id),

        readableId: action.project['link-share'],
        writableId: action.project['link-edit'],
      };
    default:
      return state;
  }
}

const makeSliceReducer = (slice) => (state, action) => {
  if (state === undefined || slice === action.slice) {
    return sliceReducer(state, action);
  } else {
    return state;
  }
};

export default combineReducers({
  [SLICE_EXISTING]: makeSliceReducer(SLICE_EXISTING),
  [SLICE_NEW]: makeSliceReducer(SLICE_NEW),
});

export function selectSolution(slice, solutionId) {
  return (dispatch) => dispatch({ type: SELECT_SOLUTION, slice, solutionId });
}

export function selectBME(slice, bmeId) {
  return (dispatch) => dispatch({ type: SELECT_BME, slice, bmeId });
}

export function deselectBME(slice, bmeId) {
  return (dispatch) => dispatch({ type: DESELECT_BME, slice, bmeId });
}

export function selectEnabling(slice, enablingId) {
  return (dispatch) => dispatch({ type: SELECT_ENABLING, slice, enablingId });
}

export function deselectEnabling(slice, enablingId) {
  return (dispatch) => dispatch({ type: DESELECT_ENABLING, slice, enablingId });
}

export const commentBME = (slice, bmeId, comment) => ({ type: COMMENT_BME, slice, bmeId, comment });

export const addCustomBME = (slice, bme) => ({ type: ADD_CUSTOM_BME, slice, bme });

export const deleteCustomBME = (slice, bme) => ({ type: DELETE_CUSTOM_BME, slice, bme });

export function reset(slice) {
  return (dispatch, getState) => {
    const id = getState().builder[slice].writableId;

    dispatch({ type: RESET, slice });
    if (slice === SLICE_EXISTING) {
      fetchBM(`w${id}`)(dispatch);
    }
  }
}

export function setField(slice, field, value) {
  return (dispatch) => dispatch({ type: SET_FIELD, slice, field, value });
}

export function create(project, authToken) {
  const params = {
    title: project.title,
    description: project.description,
    solution_id: project.selectedSolution,
    enabling_ids: project.selectedEnablings,
    business_model_bmes_attributes: project.selectedBMEs.map(bmeId => ({
      bme_id: bmeId,
      ...(
        project.commentedBMEs[bmeId] ?
        { comment_attributes: { body: project.commentedBMEs[bmeId] } } :
        {}
      ),
    })).concat(project.customBMEs.map(bme => ({
      bme_attributes: {
        name: bme.name,
        category_ids: [bme.category],
      },
      ...(
        project.commentedBMEs[bme.id] ?
        { comment_attributes: { body: project.commentedBMEs[bme.id] } } :
        {}
      ),
    }))),
  };

  return apiRequest(`business-models`, {
    method: 'POST',
    body: JSON.stringify({ business_model: params }),
    headers: {
      Authorization: 'Bearer ' + authToken,
    }
  }).then(response => {
    if (response.ok) {
      return response.json().then(data => data.messages[0].link_edit);
    } else {
      return response.ok;
    }
  });
}

export function update(_, project, authToken) {
  const id = project.writableId;

  const existingInternalIds = [].concat(
    project.selectedBMEs,
    project.customBMEs.map(bme => bme.id),
  ).map(bmeId => project.bmeInternalIds[bmeId]);

  const removedInternalIds = Object.values(project.bmeInternalIds).filter(id => !existingInternalIds.includes(id));

  const params = {
    title: project.title,
    description: project.description,
    solution_id: project.selectedSolution,
    enabling_ids: project.selectedEnablings,
    business_model_bmes_attributes: [].concat(
      project.selectedBMEs.map(bmeId => ({
        id: project.bmeInternalIds[bmeId],
        bme_id: bmeId,
        comment_attributes: {
          id: project.commentInternalIds[bmeId],
          body: project.commentedBMEs[bmeId],
          _destroy: (project.commentedBMEs[bmeId] || "").length == 0,
        }
      })),
      project.customBMEs.map(bme => ({
        id: project.bmeInternalIds[bme.id],

        bme_attributes: {
          id: project.privateBmeInternalIds[bme.id],
          name: bme.name,
          category_ids: [bme.category],
        },

        comment_attributes: {
          id: project.commentInternalIds[bme.id],
          body: project.commentedBMEs[bme.id],
          _destroy: (project.commentedBMEs[bme.id] || "").length == 0,
        }
      })),
      removedInternalIds.map(id => ({
        id,
        _destroy: 1,
      }))
    ),
  };

  return (dispatch, getState) => apiRequest(`business-models/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ business_model: params }),
    headers: {
      Authorization: 'Bearer ' + authToken,
    }
  }).then(response => {
    if (response.ok) {
      return reset(SLICE_EXISTING)(dispatch, getState);
    } else {
      return response.ok;
    }
  });
}

export function fetchBM(id) {
  const resource = id[0] == "r" ? "business-models" : "business-model-edits";
  const token = id.slice(1);

  return (dispatch) => apiRequest(
    `${resource}/${token}?include=enablings,business-model-bmes.comment,business-model-bmes.bme`,
    { method: 'GET' },
  ).then(r => r.json()).then(
    data => new Deserializer().deserialize(data, (err, project) => {
      const privateBmes = project['private-bmes'].map(bme => deserialize(bme));

      project["business-model-bmes"].forEach(bmbme => {
        if (!bmbme.bme) {
          bmbme.bme = privateBmes.find(bme => bme.id == bmbme["bme-id"].toString());
        }
      });

      dispatch({ type: BM_GET, slice: SLICE_EXISTING, project });
    })
  );
}
