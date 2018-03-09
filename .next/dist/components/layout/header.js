'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _responsive = require('../../constants/responsive');

var _MainNav = require('../common/MainNav');

var _MainNav2 = _interopRequireDefault(_MainNav);

var _MobileHeader = require('../common/MobileHeader');

var _MobileHeader2 = _interopRequireDefault(_MobileHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/layout/header.js';

// constants


// Components
function Header(props) {
  return _react2.default.createElement('header', { className: 'c-header', __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, _react2.default.createElement(_reactResponsive2.default, { maxWidth: _responsive.BREAKPOINT_TABLET, __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, _react2.default.createElement(_MobileHeader2.default, {
    route: props.queryParams.route,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  })), _react2.default.createElement(_reactResponsive2.default, { minWidth: _responsive.BREAKPOINT_TABLET + 1, __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, _react2.default.createElement(_MainNav2.default, {
    route: props.queryParams.route,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  })));
}

Header.propTypes = {
  queryParams: _propTypes2.default.object
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2hlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIk1lZGlhUXVlcnkiLCJCUkVBS1BPSU5UX1RBQkxFVCIsIk1haW5OYXYiLCJNb2JpbGVIZWFkZXIiLCJIZWFkZXIiLCJwcm9wcyIsInF1ZXJ5UGFyYW1zIiwicm91dGUiLCJwcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFHUCxBQUFTOztBQUdULEFBQU87Ozs7QUFDUCxBQUFPLEFBRVA7Ozs7Ozs7O0FBUEE7OztBQUdBO0FBSWUsU0FBQSxBQUFTLE9BQVQsQUFBZ0IsT0FBTyxBQUNwQzt5QkFDRSxjQUFBLFlBQVEsV0FBUixBQUFrQjtnQkFBbEI7a0JBQUEsQUFFRTtBQUZGO0dBQUEsa0JBRUUsQUFBQywyQ0FBRCxBQUFZLEFBQVU7Z0JBQXRCO2tCQUFBLEFBQ0U7QUFERjtxQkFDRSxBQUFDO1dBQ1EsTUFBQSxBQUFNLFlBRGYsQUFDMkI7O2dCQUQzQjtrQkFISixBQUVFLEFBQ0UsQUFLRjtBQUxFO0FBQ0UsdUJBSUosQUFBQywyQ0FBVyxVQUFVLGdDQUF0QixBQUEwQztnQkFBMUM7a0JBQUEsQUFDRTtBQURGO3FCQUNFLEFBQUM7V0FDUSxNQUFBLEFBQU0sWUFEZixBQUMyQjs7Z0JBRDNCO2tCQVZOLEFBQ0UsQUFRRSxBQUNFLEFBT1A7QUFQTztBQUNFOzs7QUFRVixPQUFBLEFBQU87ZUFDUSxvQkFEZixBQUFtQixBQUNNO0FBRE4sQUFDakIiLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9