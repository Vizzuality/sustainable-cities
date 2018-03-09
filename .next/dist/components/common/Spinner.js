'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Spinner;

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/Spinner.js';
function Spinner(_ref) {
  var _classNames;

  var isLoading = _ref.isLoading,
      className = _ref.className,
      style = _ref.style;

  return _react2.default.createElement('div', { className: (0, _classnames2.default)('c-spinner', (_classNames = {}, (0, _defineProperty3.default)(_classNames, className, !!className), (0, _defineProperty3.default)(_classNames, '-loading', isLoading), _classNames)), __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement('div', { className: 'spinner-box', style: style, __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement('div', { className: 'icon', __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  })));
}

Spinner.propTypes = {
  className: _propTypes2.default.string,
  isLoading: _propTypes2.default.bool,
  style: _propTypes2.default.object
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL1NwaW5uZXIuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJjbGFzc05hbWVzIiwiUHJvcFR5cGVzIiwiU3Bpbm5lciIsImlzTG9hZGluZyIsImNsYXNzTmFtZSIsInN0eWxlIiwicHJvcFR5cGVzIiwic3RyaW5nIiwiYm9vbCIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU8sQUFFUDs7Ozs7OztBQUFlLFNBQUEsQUFBUyxjQUF5QztNQUFBOztNQUEvQixBQUErQixpQkFBL0IsQUFBK0I7TUFBcEIsQUFBb0IsaUJBQXBCLEFBQW9CO01BQVQsQUFBUyxhQUFULEFBQVMsQUFDL0Q7O3lCQUNFLGNBQUEsU0FBSyxXQUFXLDBCQUFBLEFBQVcsMkVBQVgsQUFBMkIsV0FBWSxDQUFDLENBQXhDLEFBQXlDLHVEQUF6QyxBQUFvRCxZQUFwRCxBQUFnRSxZQUFoRjtnQkFBQTtrQkFBQSxBQUNFO0FBREY7R0FBQSxrQkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlLGVBQWMsT0FBN0IsQUFBb0M7Z0JBQXBDO2tCQUFBLEFBQ0U7QUFERjs0Q0FDTyxXQUFMLEFBQWU7Z0JBQWY7a0JBSE4sQUFDRSxBQUNFLEFBQ0UsQUFJUDtBQUpPOzs7O0FBTVIsUUFBQSxBQUFRO2FBQ0ssb0JBRE8sQUFDRyxBQUNyQjthQUFXLG9CQUZPLEFBRUcsQUFDckI7U0FBTyxvQkFIVCxBQUFvQixBQUdEO0FBSEMsQUFDbEIiLCJmaWxlIjoiU3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==