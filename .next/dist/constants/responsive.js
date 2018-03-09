'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BREAKPOINT_DESKTOP = exports.BREAKPOINT_LAPTOP = exports.BREAKPOINT_TABLET = exports.BREAKPOINT_MOBILE = undefined;
exports.Mobile = Mobile;
exports.Tablet = Tablet;
exports.Desktop = Desktop;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/constants/responsive.js';
var BREAKPOINT_MOBILE = exports.BREAKPOINT_MOBILE = 320;
var BREAKPOINT_TABLET = exports.BREAKPOINT_TABLET = 768;
var BREAKPOINT_LAPTOP = exports.BREAKPOINT_LAPTOP = 1024;
var BREAKPOINT_DESKTOP = exports.BREAKPOINT_DESKTOP = 1200;

function Mobile(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(_reactResponsive2.default, { maxWidth: BREAKPOINT_TABLET - 1, children: children, __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  });
}

function Tablet(_ref2) {
  var children = _ref2.children;

  return _react2.default.createElement(_reactResponsive2.default, { minWidth: BREAKPOINT_TABLET, children: children, __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  });
}

function Desktop(_ref3) {
  var children = _ref3.children;

  return _react2.default.createElement(_reactResponsive2.default, { minWidth: BREAKPOINT_DESKTOP, children: children, __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnN0YW50cy9yZXNwb25zaXZlLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUmVzcG9uc2l2ZSIsIkJSRUFLUE9JTlRfTU9CSUxFIiwiQlJFQUtQT0lOVF9UQUJMRVQiLCJCUkVBS1BPSU5UX0xBUFRPUCIsIkJSRUFLUE9JTlRfREVTS1RPUCIsIk1vYmlsZSIsImNoaWxkcmVuIiwiVGFibGV0IiwiRGVza3RvcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O1FBUU8sQUFBUztRQUlULEFBQVM7UUFJVCxBQUFTOztBQWhCaEIsQUFBTzs7OztBQUNQLEFBQU8sQUFFUDs7Ozs7OztBQUFPLElBQU0sZ0RBQU4sQUFBMEIsQUFDakM7QUFBTyxJQUFNLGdEQUFOLEFBQTBCLEFBQ2pDO0FBQU8sSUFBTSxnREFBTixBQUEwQixBQUNqQztBQUFPLElBQU0sa0RBQU4sQUFBMkIsQUFFbEM7O0FBQU8sc0JBQThCO01BQVosQUFBWSxnQkFBWixBQUFZLEFBQ25DOzt5QkFBTyxBQUFDLDJDQUFXLFVBQVUsb0JBQXRCLEFBQTBDLEdBQUcsVUFBN0MsQUFBdUQ7Z0JBQXZEO2tCQUFQLEFBQU8sQUFDUjtBQURRO0dBQUE7QUFHVDs7QUFBTyx1QkFBOEI7TUFBWixBQUFZLGlCQUFaLEFBQVksQUFDbkM7O3lCQUFPLEFBQUMsMkNBQVcsVUFBWixBQUFzQixtQkFBbUIsVUFBekMsQUFBbUQ7Z0JBQW5EO2tCQUFQLEFBQU8sQUFDUjtBQURRO0dBQUE7QUFHVDs7QUFBTyx3QkFBK0I7TUFBWixBQUFZLGlCQUFaLEFBQVksQUFDcEM7O3lCQUFPLEFBQUMsMkNBQVcsVUFBWixBQUFzQixvQkFBb0IsVUFBMUMsQUFBb0Q7Z0JBQXBEO2tCQUFQLEFBQU8sQUFDUjtBQURRO0dBQUEiLCJmaWxlIjoicmVzcG9uc2l2ZS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==