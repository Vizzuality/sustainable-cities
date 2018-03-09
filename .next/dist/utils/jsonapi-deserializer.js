"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require("next/node_modules/babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require("next/node_modules/babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

var _extends2 = require("next/node_modules/babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (jsonapi) {
  var isCollection = Array.isArray(jsonapi.data);

  var included = jsonapi.included.concat(isCollection ? jsonapi.data : [jsonapi.data]).map(function (record) {
    return {
      relationships: record.relationships,
      deserialized: (0, _extends3.default)({
        type: record.type,
        id: record.id
      }, record.attributes)
    };
  });

  var findRecord = function findRecord(primaryKey) {
    return included.find(function (record) {
      return record.deserialized.id === primaryKey.id && record.deserialized.type === primaryKey.type;
    }).deserialized;
  };

  included.forEach(function (record) {
    (0, _entries2.default)(record.relationships || {}).forEach(function (_ref) {
      var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
          name = _ref2[0],
          associations = _ref2[1];

      if (!associations.data) {
        record.deserialized[name] = null;
      } else if (Array.isArray(associations.data)) {
        record.deserialized[name] = associations.data.map(findRecord);
      } else {
        record.deserialized[name] = findRecord(associations.data);
      }
    });
  });

  if (isCollection) {
    return included.slice(included.length - jsonapi.data.length).map(function (r) {
      return r.deserialized;
    });
  } else {
    return included[included.length - 1].deserialized;
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2pzb25hcGktZGVzZXJpYWxpemVyLmpzIl0sIm5hbWVzIjpbImpzb25hcGkiLCJpc0NvbGxlY3Rpb24iLCJBcnJheSIsImlzQXJyYXkiLCJkYXRhIiwiaW5jbHVkZWQiLCJjb25jYXQiLCJtYXAiLCJyZWxhdGlvbnNoaXBzIiwicmVjb3JkIiwiZGVzZXJpYWxpemVkIiwidHlwZSIsImlkIiwiYXR0cmlidXRlcyIsImZpbmRSZWNvcmQiLCJwcmltYXJ5S2V5IiwiZmluZCIsImZvckVhY2giLCJuYW1lIiwiYXNzb2NpYXRpb25zIiwic2xpY2UiLCJsZW5ndGgiLCJyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7a0JBQWUsVUFBQSxBQUFDLFNBQVksQUFDMUI7TUFBTSxlQUFlLE1BQUEsQUFBTSxRQUFRLFFBQW5DLEFBQXFCLEFBQXNCLEFBRTNDOztNQUFNLG1CQUFXLEFBQVEsU0FBUixBQUFpQixPQUNoQyxlQUFlLFFBQWYsQUFBdUIsT0FBTyxDQUFDLFFBRGhCLEFBQ2UsQUFBUyxPQUR4QixBQUVmLElBQUksa0JBQUE7O3FCQUNXLE9BREEsQUFDTyxBQUN0Qjs7Y0FDUSxPQURSLEFBQ2UsQUFDYjtZQUFJLE9BRk4sQUFFYTtBQURYLFNBRUcsT0FMRCxBQUFXLEFBRWYsQUFHWTtBQUxHLEFBQ2Y7QUFIRixBQUFpQixBQVdqQixHQVhpQjs7TUFXWCxhQUFhLFNBQWIsQUFBYSxXQUFBLEFBQUMsWUFBRDtvQkFDakIsQUFBUyxLQUFLLGtCQUFBO2FBQ1osT0FBQSxBQUFPLGFBQVAsQUFBb0IsT0FBTyxXQUEzQixBQUFzQyxNQUN0QyxPQUFBLEFBQU8sYUFBUCxBQUFvQixTQUFTLFdBRmpCLEFBRTRCO0FBRjFDLEtBQUEsRUFEaUIsQUFJZjtBQUpKLEFBT0E7O1dBQUEsQUFBUyxRQUFRLGtCQUFVLEFBQ3pCOzJCQUFlLE9BQUEsQUFBTyxpQkFBdEIsQUFBdUMsSUFBdkMsQUFBMkMsUUFBUSxnQkFBMEI7cURBQUE7VUFBeEIsQUFBd0IsYUFBQTtVQUFsQixBQUFrQixxQkFDM0U7O1VBQUksQ0FBQyxhQUFMLEFBQWtCLE1BQU0sQUFDdEI7ZUFBQSxBQUFPLGFBQVAsQUFBb0IsUUFBcEIsQUFBNEIsQUFDN0I7QUFGRCxpQkFFVyxNQUFBLEFBQU0sUUFBUSxhQUFsQixBQUFJLEFBQTJCLE9BQU8sQUFDM0M7ZUFBQSxBQUFPLGFBQVAsQUFBb0IsUUFBUSxhQUFBLEFBQWEsS0FBYixBQUFrQixJQUE5QyxBQUE0QixBQUFzQixBQUNuRDtBQUZNLE9BQUEsTUFFQSxBQUNMO2VBQUEsQUFBTyxhQUFQLEFBQW9CLFFBQVEsV0FBVyxhQUF2QyxBQUE0QixBQUF3QixBQUNyRDtBQUNGO0FBUkQsQUFTRDtBQVZELEFBWUE7O01BQUEsQUFBSSxjQUFjLEFBQ2hCO29CQUFPLEFBQVMsTUFBTSxTQUFBLEFBQVMsU0FBUyxRQUFBLEFBQVEsS0FBekMsQUFBOEMsUUFBOUMsQUFBc0QsSUFBSSxhQUFBO2FBQUssRUFBTCxBQUFPO0FBQXhFLEFBQU8sQUFDUixLQURRO0FBRFQsU0FFTyxBQUNMO1dBQU8sU0FBUyxTQUFBLEFBQVMsU0FBbEIsQUFBMkIsR0FBbEMsQUFBcUMsQUFDdEM7QUFDRjtBQXRDRCIsImZpbGUiOiJqc29uYXBpLWRlc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==