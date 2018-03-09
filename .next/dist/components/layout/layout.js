'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Layout;

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _head = require('./head');

var _head2 = _interopRequireDefault(_head);

var _icons = require('./icons');

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/layout/layout.js';

// Components
function Layout(props) {
  var title = props.title,
      children = props.children,
      className = props.className,
      description = props.description,
      queryParams = props.queryParams;

  var classNames = (0, _classnames2.default)((0, _defineProperty3.default)({}, className, !!className));

  return _react2.default.createElement('div', { className: 'l-page c-page ' + classNames, __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement(_head2.default, {
    title: title,
    description: description,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), _react2.default.createElement(_icons2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), _react2.default.createElement(_header2.default, {
    queryParams: queryParams,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }), _react2.default.createElement('div', { className: 'l-main ' + classNames, __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, children), _react2.default.createElement(_footer2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }));
}

Layout.propTypes = {
  title: _propTypes2.default.string.isRequired,
  queryParams: _propTypes2.default.object,
  description: _propTypes2.default.string,
  children: _propTypes2.default.any.isRequired,
  className: _propTypes2.default.string
};

Layout.defaultProps = {
  description: 'Default description'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2xheW91dC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImNsYXNzbmFtZXMiLCJIZWFkZXIiLCJGb290ZXIiLCJIZWFkIiwiSWNvbnMiLCJMYXlvdXQiLCJwcm9wcyIsInRpdGxlIiwiY2hpbGRyZW4iLCJjbGFzc05hbWUiLCJkZXNjcmlwdGlvbiIsInF1ZXJ5UGFyYW1zIiwiY2xhc3NOYW1lcyIsInByb3BUeXBlcyIsInN0cmluZyIsImlzUmVxdWlyZWQiLCJvYmplY3QiLCJhbnkiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBR1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTyxBQUVQOzs7Ozs7OztBQU5BO0FBTWUsU0FBQSxBQUFTLE9BQVQsQUFBZ0IsT0FBTztNQUFBLEFBQzVCLFFBRDRCLEFBQzZCLE1BRDdCLEFBQzVCO01BRDRCLEFBQ3JCLFdBRHFCLEFBQzZCLE1BRDdCLEFBQ3JCO01BRHFCLEFBQ1gsWUFEVyxBQUM2QixNQUQ3QixBQUNYO01BRFcsQUFDQSxjQURBLEFBQzZCLE1BRDdCLEFBQ0E7TUFEQSxBQUNhLGNBRGIsQUFDNkIsTUFEN0IsQUFDYSxBQUVqRDs7TUFBTSxhQUFhLDREQUFBLEFBQ2hCLFdBQVksQ0FBQyxDQURoQixBQUFtQixBQUNGLEFBR2pCOzt5QkFDRSxjQUFBLFNBQUssOEJBQUwsQUFBaUM7Z0JBQWpDO2tCQUFBLEFBQ0U7QUFERjtHQUFBLGtCQUNFLEFBQUM7V0FBRCxBQUNTLEFBQ1A7aUJBRkYsQUFFZTs7Z0JBRmY7a0JBREYsQUFDRSxBQUtBO0FBTEE7QUFDRSxzQkFJRixBQUFDOztnQkFBRDtrQkFORixBQU1FLEFBRUE7QUFGQTtBQUFBLHNCQUVBLEFBQUM7aUJBQUQsQUFDZTs7Z0JBRGY7a0JBUkYsQUFRRSxBQUlBO0FBSkE7QUFDRSxzQkFHRixjQUFBLFNBQUssdUJBQUwsQUFBMEI7Z0JBQTFCO2tCQUFBLEFBQ0c7QUFESDtLQVpGLEFBWUUsQUFJQSwyQkFBQSxBQUFDOztnQkFBRDtrQkFqQkosQUFDRSxBQWdCRSxBQUdMO0FBSEs7QUFBQTs7O0FBS04sT0FBQSxBQUFPO1NBQ0Usb0JBQUEsQUFBVSxPQURBLEFBQ08sQUFDeEI7ZUFBYSxvQkFGSSxBQUVNLEFBQ3ZCO2VBQWEsb0JBSEksQUFHTSxBQUN2QjtZQUFVLG9CQUFBLEFBQVUsSUFKSCxBQUlPLEFBQ3hCO2FBQVcsb0JBTGIsQUFBbUIsQUFLSTtBQUxKLEFBQ2pCOztBQU9GLE9BQUEsQUFBTztlQUFQLEFBQXNCLEFBQ1A7QUFETyxBQUNwQiIsImZpbGUiOiJsYXlvdXQuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=