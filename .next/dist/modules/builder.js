'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCustomBME = exports.addCustomBME = exports.commentBME = exports.SLICE_EXISTING = exports.SLICE_NEW = undefined;
exports.selectSolution = selectSolution;
exports.selectBME = selectBME;
exports.deselectBME = deselectBME;
exports.selectEnabling = selectEnabling;
exports.deselectEnabling = deselectEnabling;
exports.rememberProject = rememberProject;
exports.reset = reset;
exports.setField = setField;
exports.create = create;
exports.update = update;
exports.fetchBM = fetchBM;

var _values = require('next/node_modules/babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _jsonapiSerializer = require('jsonapi-serializer');

var _jsonapiDeserializer = require('../utils/jsonapi-deserializer');

var _jsonapiDeserializer2 = _interopRequireDefault(_jsonapiDeserializer);

var _queryString = require('query-string');

var queryString = _interopRequireWildcard(_queryString);

var _fromPairs = require('lodash/fromPairs');

var _fromPairs2 = _interopRequireDefault(_fromPairs);

var _redux = require('redux');

var _helpers = require('./helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _combineReducers;

/* Actions */
var SELECT_SOLUTION = 'builder/SELECT_SOLUTION';
var SELECT_BME = 'builder/SELECT_BME';
var DESELECT_BME = 'builder/DESELECT_BME';
var COMMENT_BME = 'builder/COMMENT_BME';
var SELECT_ENABLING = 'builder/SELECT_ENABLING';
var DESELECT_ENABLING = 'builder/DESELECT_ENABLING';
var SET_FIELD = 'builder/SET_FIELD';
var RESET = 'builder/RESET';

var ADD_CUSTOM_BME = 'builder/ADD_CUSTOM_BME';
var DELETE_CUSTOM_BME = 'builder/DELETE_CUSTOM_BME';

var BM_CREATING = 'builder/BM_CREATING';
var BM_CREATED = 'builder/BM_CREATED';
var BM_GET = 'builder/BM_GET';

var SLICE_NEW = exports.SLICE_NEW = 'new';
var SLICE_EXISTING = exports.SLICE_EXISTING = 'existing';

var initialSliceState = {
  commentedBMEs: {},
  selectedBMEs: [],
  customBMEs: [],
  selectedSolution: null,
  selectedEnablings: [],
  title: "Project title",
  description: ""
};

var sliceReducer = function sliceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialSliceState;
  var action = arguments[1];

  switch (action.type) {
    case SELECT_ENABLING:
      return (0, _extends3.default)({}, state, { selectedEnablings: state.selectedEnablings.concat([action.enablingId]) });
    case SELECT_SOLUTION:
      return (0, _extends3.default)({}, state, { selectedSolution: action.solutionId });
    case SELECT_BME:
      return (0, _extends3.default)({}, state, { selectedBMEs: state.selectedBMEs.concat([action.bmeId]) });
    case DESELECT_ENABLING:
      return (0, _extends3.default)({}, state, { selectedEnablings: state.selectedEnablings.filter(function (bme) {
          return bme != action.enablingId;
        }) });
    case DESELECT_BME:
      return (0, _extends3.default)({}, state, { selectedBMEs: state.selectedBMEs.filter(function (bme) {
          return bme != action.bmeId;
        }) });
    case COMMENT_BME:
      return (0, _extends3.default)({}, state, { commentedBMEs: (0, _extends3.default)({}, state.commentedBMEs, (0, _defineProperty3.default)({}, action.bmeId, action.comment)) });
    case ADD_CUSTOM_BME:
      var tempId = (state.maxTempId || -1) + 1;
      var id = 'custom-' + tempId;

      return (0, _extends3.default)({}, state, {
        maxTempId: tempId,
        customBMEs: state.customBMEs.concat([{ id: id, tempId: tempId, name: action.bme.name, category: action.bme.category }]),
        commentedBMEs: (0, _extends3.default)({}, state.commentedBMEs, (0, _defineProperty3.default)({}, id, action.bme.comment))
      });
    case DELETE_CUSTOM_BME:
      return (0, _extends3.default)({}, state, {
        customBMEs: state.customBMEs.filter(function (bme) {
          return bme.id != action.bme.id;
        }),
        commentedBMEs: (0, _extends3.default)({}, state.commentedBMEs, (0, _defineProperty3.default)({}, action.bme.id, undefined))
      });

    case RESET:
      return (0, _extends3.default)({}, initialSliceState);
    case SET_FIELD:
      return (0, _extends3.default)({}, state, (0, _defineProperty3.default)({}, action.field, action.value));

    case BM_GET:
      if (state.readableId === action.project['link-share']) {
        return state;
      }

      var publicBmBmes = action.project['business-model-bmes'].filter(function (bmbme) {
        return !bmbme.bme.private;
      });
      var privateBmBmes = action.project['business-model-bmes'].filter(function (bmbme) {
        return bmbme.bme.private;
      });

      return (0, _extends3.default)({}, state, {
        title: action.project.title,
        description: action.project.description,
        selectedSolution: action.project['solution-id'] && action.project['solution-id'].toString(),

        selectedBMEs: publicBmBmes.map(function (bmbme) {
          return bmbme.bme.id;
        }),
        commentedBMEs: (0, _fromPairs2.default)(publicBmBmes.map(function (bmbme) {
          return [bmbme.bme.id, bmbme.comment ? bmbme.comment.body : null];
        }).concat(privateBmBmes.map(function (bmbme, i) {
          return ['custom-' + i, bmbme.comment ? bmbme.comment.body : null];
        }))),

        bmeInternalIds: (0, _fromPairs2.default)([].concat(publicBmBmes.map(function (bmbme) {
          return [bmbme.bme.id, bmbme.id];
        }), privateBmBmes.map(function (bmbme, i) {
          return ['custom-' + i, bmbme.id];
        }))),

        privateBmeInternalIds: (0, _fromPairs2.default)(privateBmBmes.map(function (bmbme, i) {
          return ['custom-' + i, bmbme.bme.id];
        })),

        maxTempId: privateBmBmes.length - 1,

        customBMEs: privateBmBmes.map(function (bmbme, i) {
          return {
            id: 'custom-' + i,
            tempId: i,
            name: bmbme.bme.name,
            category: bmbme.bme.categories[0].id
          };
        }),

        commentInternalIds: (0, _fromPairs2.default)([].concat(publicBmBmes.map(function (bmbme) {
          return [bmbme.bme.id, bmbme.comment ? bmbme.comment.id : null];
        }), privateBmBmes.map(function (bmbme, i) {
          return ['custom-' + i, bmbme.comment ? bmbme.comment.id : null];
        }))),
        selectedEnablings: action.project.enablings.map(function (enabling) {
          return enabling.id;
        }),

        readableId: action.project['link-share'],
        writableId: action.project['link-edit']
      });
    default:
      return state;
  }
};

var makeSliceReducer = function makeSliceReducer(slice) {
  return function (state, action) {
    if (state === undefined || slice === action.slice) {
      return sliceReducer(state, action);
    } else {
      return state;
    }
  };
};

exports.default = (0, _redux.combineReducers)((_combineReducers = {}, (0, _defineProperty3.default)(_combineReducers, SLICE_EXISTING, makeSliceReducer(SLICE_EXISTING)), (0, _defineProperty3.default)(_combineReducers, SLICE_NEW, makeSliceReducer(SLICE_NEW)), (0, _defineProperty3.default)(_combineReducers, 'props', function props() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case BM_CREATED:
      return (0, _extends3.default)({}, state, { writableId: action.writableId });
    case RESET:
      return {};
    default:
      return state;
  }
}), _combineReducers));
function selectSolution(slice, solutionId) {
  return function (dispatch) {
    return dispatch({ type: SELECT_SOLUTION, slice: slice, solutionId: solutionId });
  };
}

function selectBME(slice, bmeId) {
  return function (dispatch) {
    return dispatch({ type: SELECT_BME, slice: slice, bmeId: bmeId });
  };
}

function deselectBME(slice, bmeId) {
  return function (dispatch) {
    return dispatch({ type: DESELECT_BME, slice: slice, bmeId: bmeId });
  };
}

function selectEnabling(slice, enablingId) {
  return function (dispatch) {
    return dispatch({ type: SELECT_ENABLING, slice: slice, enablingId: enablingId });
  };
}

function deselectEnabling(slice, enablingId) {
  return function (dispatch) {
    return dispatch({ type: DESELECT_ENABLING, slice: slice, enablingId: enablingId });
  };
}

var commentBME = exports.commentBME = function commentBME(slice, bmeId, comment) {
  return { type: COMMENT_BME, slice: slice, bmeId: bmeId, comment: comment };
};

var addCustomBME = exports.addCustomBME = function addCustomBME(slice, bme) {
  return { type: ADD_CUSTOM_BME, slice: slice, bme: bme };
};

var deleteCustomBME = exports.deleteCustomBME = function deleteCustomBME(slice, bme) {
  return { type: DELETE_CUSTOM_BME, slice: slice, bme: bme };
};

function rememberProject(slice, writableId) {
  return { type: BM_CREATED, writableId: writableId };
}

function reset(slice) {
  return function (dispatch, getState) {
    var id = getState().builder[slice].writableId;

    dispatch({ type: RESET, slice: slice });
    if (slice === SLICE_EXISTING) {
      fetchBM('w' + id)(dispatch);
    }
  };
}

function setField(slice, field, value) {
  return function (dispatch) {
    return dispatch({ type: SET_FIELD, slice: slice, field: field, value: value });
  };
}

function create(project, authToken) {
  var params = {
    title: project.title,
    description: project.description,
    solution_id: project.selectedSolution,
    enabling_ids: project.selectedEnablings,
    business_model_bmes_attributes: project.selectedBMEs.map(function (bmeId) {
      return (0, _extends3.default)({
        bme_id: bmeId
      }, project.commentedBMEs[bmeId] ? { comment_attributes: { body: project.commentedBMEs[bmeId] } } : {});
    }).concat(project.customBMEs.map(function (bme) {
      return (0, _extends3.default)({
        bme_attributes: {
          name: bme.name,
          category_ids: [bme.category]
        }
      }, project.commentedBMEs[bme.id] ? { comment_attributes: { body: project.commentedBMEs[bme.id] } } : {});
    }))
  };

  return (0, _helpers.apiRequest)('business-models', {
    method: 'POST',
    body: (0, _stringify2.default)({ business_model: params }),
    headers: {
      Authorization: 'Bearer ' + authToken
    }
  }).then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        return data.messages[0].link_edit;
      });
    } else {
      return response.ok;
    }
  });
}

function update(_, project, authToken) {
  var id = project.writableId;

  var existingInternalIds = [].concat(project.selectedBMEs, project.customBMEs.map(function (bme) {
    return bme.id;
  })).map(function (bmeId) {
    return project.bmeInternalIds[bmeId];
  });

  var removedInternalIds = (0, _values2.default)(project.bmeInternalIds).filter(function (id) {
    return !existingInternalIds.includes(id);
  });

  var params = {
    title: project.title,
    description: project.description,
    solution_id: project.selectedSolution || null,
    enabling_ids: project.selectedEnablings,
    business_model_bmes_attributes: [].concat(project.selectedBMEs.map(function (bmeId) {
      return {
        id: project.bmeInternalIds[bmeId],
        bme_id: bmeId,
        comment_attributes: {
          id: project.commentInternalIds[bmeId],
          body: project.commentedBMEs[bmeId],
          _destroy: (project.commentedBMEs[bmeId] || "").length == 0
        }
      };
    }), project.customBMEs.map(function (bme) {
      return {
        id: project.bmeInternalIds[bme.id],

        bme_attributes: {
          id: project.privateBmeInternalIds[bme.id],
          name: bme.name,
          category_ids: [bme.category]
        },

        comment_attributes: {
          id: project.commentInternalIds[bme.id],
          body: project.commentedBMEs[bme.id],
          _destroy: (project.commentedBMEs[bme.id] || "").length == 0
        }
      };
    }), removedInternalIds.map(function (id) {
      return {
        id: id,
        _destroy: 1
      };
    }))
  };

  return function (dispatch, getState) {
    return (0, _helpers.apiRequest)('business-models/' + id, {
      method: 'PATCH',
      body: (0, _stringify2.default)({ business_model: params }),
      headers: {
        Authorization: 'Bearer ' + authToken
      }
    }).then(function (response) {
      if (response.ok) {
        return reset(SLICE_EXISTING)(dispatch, getState);
      } else {
        return response.ok;
      }
    });
  };
}

function fetchBM(id) {
  var resource = id[0] == "r" ? "business-models" : "business-model-edits";
  var token = id.slice(1);

  return function (dispatch) {
    return (0, _helpers.apiRequest)(resource + '/' + token + '?include=enablings,business-model-bmes.comment,business-model-bmes.bme', { method: 'GET' }).then(function (r) {
      return r.json();
    }).then(function (data) {
      return new _jsonapiSerializer.Deserializer().deserialize(data, function (err, project) {
        var privateBmes = project['private-bmes'].map(function (bme) {
          return (0, _jsonapiDeserializer2.default)(bme);
        });

        project["business-model-bmes"].forEach(function (bmbme) {
          if (!bmbme.bme) {
            bmbme.bme = privateBmes.find(function (bme) {
              return bme.id == bmbme["bme-id"].toString();
            });
          }
        });

        dispatch({ type: BM_GET, slice: SLICE_EXISTING, project: project });
      });
    });
  };
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvYnVpbGRlci5qcyJdLCJuYW1lcyI6WyJEZXNlcmlhbGl6ZXIiLCJkZXNlcmlhbGl6ZSIsInF1ZXJ5U3RyaW5nIiwiZnJvbVBhaXJzIiwiY29tYmluZVJlZHVjZXJzIiwiYXBpUmVxdWVzdCIsIlNFTEVDVF9TT0xVVElPTiIsIlNFTEVDVF9CTUUiLCJERVNFTEVDVF9CTUUiLCJDT01NRU5UX0JNRSIsIlNFTEVDVF9FTkFCTElORyIsIkRFU0VMRUNUX0VOQUJMSU5HIiwiU0VUX0ZJRUxEIiwiUkVTRVQiLCJBRERfQ1VTVE9NX0JNRSIsIkRFTEVURV9DVVNUT01fQk1FIiwiQk1fQ1JFQVRJTkciLCJCTV9DUkVBVEVEIiwiQk1fR0VUIiwiU0xJQ0VfTkVXIiwiU0xJQ0VfRVhJU1RJTkciLCJpbml0aWFsU2xpY2VTdGF0ZSIsImNvbW1lbnRlZEJNRXMiLCJzZWxlY3RlZEJNRXMiLCJjdXN0b21CTUVzIiwic2VsZWN0ZWRTb2x1dGlvbiIsInNlbGVjdGVkRW5hYmxpbmdzIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsInNsaWNlUmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsImNvbmNhdCIsImVuYWJsaW5nSWQiLCJzb2x1dGlvbklkIiwiYm1lSWQiLCJmaWx0ZXIiLCJibWUiLCJjb21tZW50IiwidGVtcElkIiwibWF4VGVtcElkIiwiaWQiLCJuYW1lIiwiY2F0ZWdvcnkiLCJ1bmRlZmluZWQiLCJmaWVsZCIsInZhbHVlIiwicmVhZGFibGVJZCIsInByb2plY3QiLCJwdWJsaWNCbUJtZXMiLCJibWJtZSIsInByaXZhdGUiLCJwcml2YXRlQm1CbWVzIiwidG9TdHJpbmciLCJtYXAiLCJib2R5IiwiaSIsImJtZUludGVybmFsSWRzIiwicHJpdmF0ZUJtZUludGVybmFsSWRzIiwibGVuZ3RoIiwiY2F0ZWdvcmllcyIsImNvbW1lbnRJbnRlcm5hbElkcyIsImVuYWJsaW5ncyIsImVuYWJsaW5nIiwid3JpdGFibGVJZCIsIm1ha2VTbGljZVJlZHVjZXIiLCJzbGljZSIsInNlbGVjdFNvbHV0aW9uIiwiZGlzcGF0Y2giLCJzZWxlY3RCTUUiLCJkZXNlbGVjdEJNRSIsInNlbGVjdEVuYWJsaW5nIiwiZGVzZWxlY3RFbmFibGluZyIsImNvbW1lbnRCTUUiLCJhZGRDdXN0b21CTUUiLCJkZWxldGVDdXN0b21CTUUiLCJyZW1lbWJlclByb2plY3QiLCJyZXNldCIsImdldFN0YXRlIiwiYnVpbGRlciIsImZldGNoQk0iLCJzZXRGaWVsZCIsImNyZWF0ZSIsImF1dGhUb2tlbiIsInBhcmFtcyIsInNvbHV0aW9uX2lkIiwiZW5hYmxpbmdfaWRzIiwiYnVzaW5lc3NfbW9kZWxfYm1lc19hdHRyaWJ1dGVzIiwiYm1lX2lkIiwiY29tbWVudF9hdHRyaWJ1dGVzIiwiYm1lX2F0dHJpYnV0ZXMiLCJjYXRlZ29yeV9pZHMiLCJtZXRob2QiLCJidXNpbmVzc19tb2RlbCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwidGhlbiIsInJlc3BvbnNlIiwib2siLCJqc29uIiwiZGF0YSIsIm1lc3NhZ2VzIiwibGlua19lZGl0IiwidXBkYXRlIiwiXyIsImV4aXN0aW5nSW50ZXJuYWxJZHMiLCJyZW1vdmVkSW50ZXJuYWxJZHMiLCJpbmNsdWRlcyIsIl9kZXN0cm95IiwicmVzb3VyY2UiLCJ0b2tlbiIsInIiLCJlcnIiLCJwcml2YXRlQm1lcyIsImZvckVhY2giLCJmaW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7UUE4S08sQUFBUztRQUlULEFBQVM7UUFJVCxBQUFTO1FBSVQsQUFBUztRQUlULEFBQVM7UUFVVCxBQUFTO1FBSVQsQUFBUztRQVdULEFBQVM7UUFJVCxBQUFTO1FBeUNULEFBQVM7UUE4RFQsQUFBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbFVoQixBQUFTOztBQUNULEFBQU87Ozs7QUFDUCxBQUFPOztJQUFQLEFBQVk7O0FBQ1osQUFBTzs7OztBQUNQLEFBQVM7O0FBRVQsQUFBUzs7Ozs7Ozs7QUFHVDtBQUNBLElBQU0sa0JBQU4sQUFBd0I7QUFDeEIsSUFBTSxhQUFO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