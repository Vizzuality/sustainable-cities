'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Button;

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/Button.js';
function Button(props) {
  var classes = (0, _classnames2.default)({
    'c-button': true,
    '-primary': !props.secondary,
    '-secondary': props.secondary,
    '-inverse': props.inverse,
    '-disabled': props.disabled
  }, props.className);

  if (props.link) {
    // If the link is a string, this means that it is external
    var isExternalLink = typeof props.link === 'string';

    var linkAttributes = isExternalLink ? { href: props.link, rel: 'noreferrer', target: '_blank' } : {};

    var content = _react2.default.createElement('a', (0, _extends3.default)({}, linkAttributes, {
      role: 'link',
      className: classes,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24
      }
    }), props.children);

    if (isExternalLink) {
      return content;
    }

    return _react2.default.createElement(_routes.Link, { route: props.link.route, params: props.link.params, __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      }
    }, content);
  }

  // We render a real button
  return _react2.default.createElement('button', {
    className: (0, _classnames2.default)(classes),
    type: 'button',
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, props.children);
}

Button.propTypes = {
  children: _propTypes2.default.node.isRequired,
  className: _propTypes2.default.string,
  link: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    route: _propTypes2.default.string.isRequired,
    params: _propTypes2.default.object
  })]),
  onClick: _propTypes2.default.func,
  secondary: _propTypes2.default.bool,
  inverse: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

Button.defaultProps = {
  secondary: false,
  inverse: false,
  disabled: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL0J1dHRvbi5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImNsYXNzbmFtZXMiLCJMaW5rIiwiQnV0dG9uIiwicHJvcHMiLCJjbGFzc2VzIiwic2Vjb25kYXJ5IiwiaW52ZXJzZSIsImRpc2FibGVkIiwiY2xhc3NOYW1lIiwibGluayIsImlzRXh0ZXJuYWxMaW5rIiwibGlua0F0dHJpYnV0ZXMiLCJocmVmIiwicmVsIiwidGFyZ2V0IiwiY29udGVudCIsImNoaWxkcmVuIiwicm91dGUiLCJwYXJhbXMiLCJvbkNsaWNrIiwicHJvcFR5cGVzIiwibm9kZSIsImlzUmVxdWlyZWQiLCJzdHJpbmciLCJvbmVPZlR5cGUiLCJzaGFwZSIsIm9iamVjdCIsImZ1bmMiLCJib29sIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVMsQUFFVDs7Ozs7QUFBZSxTQUFBLEFBQVMsT0FBVCxBQUFnQixPQUFPLEFBQ3BDO01BQU07Z0JBQXFCLEFBQ2IsQUFDWjtnQkFBWSxDQUFDLE1BRlksQUFFTixBQUNuQjtrQkFBYyxNQUhXLEFBR0wsQUFDcEI7Z0JBQVksTUFKYSxBQUlQLEFBQ2xCO2lCQUFhLE1BTEMsQUFBVyxBQUtOO0FBTE0sQUFDekIsR0FEYyxFQU1iLE1BTkgsQUFBZ0IsQUFNUCxBQUVUOztNQUFJLE1BQUosQUFBVSxNQUFNLEFBQ2Q7QUFDQTtRQUFNLGlCQUFpQixPQUFPLE1BQVAsQUFBYSxTQUFwQyxBQUE2QyxBQUU3Qzs7UUFBTSxpQkFBaUIsaUJBQ25CLEVBQUUsTUFBTSxNQUFSLEFBQWMsTUFBTSxLQUFwQixBQUF5QixjQUFjLFFBRHBCLEFBQ25CLEFBQStDLGFBRG5ELEFBRUksQUFFSjs7UUFBTSwwQkFDSixjQUFBLGdDQUFBLEFBQ007WUFETixBQUVPLEFBQ0w7aUJBSEYsQUFHYTs7a0JBSGI7b0JBQUEsQUFLRztBQUxIO0FBRUUsTUFGRixRQURGLEFBQ0UsQUFLUyxBQUlYOztRQUFBLEFBQUksZ0JBQWdCLEFBQ2xCO2FBQUEsQUFBTyxBQUNSO0FBRUQ7OzJCQUNFLEFBQUMsOEJBQUssT0FBTyxNQUFBLEFBQU0sS0FBbkIsQUFBd0IsT0FBTyxRQUFRLE1BQUEsQUFBTSxLQUE3QyxBQUFrRDtrQkFBbEQ7b0JBQUEsQUFDRztBQURIO0tBQUEsRUFERixBQUNFLEFBSUg7QUFFRDs7QUFDQTt5QkFDRSxjQUFBO2VBQ2EsMEJBRGIsQUFDYSxBQUFXLEFBQ3RCO1VBRkYsQUFFTyxBQUNMO2FBQVMsTUFIWCxBQUdpQjs7Z0JBSGpCO2tCQUFBLEFBS0c7QUFMSDtBQUNFLEdBREYsUUFERixBQUNFLEFBS1MsQUFHWjs7O0FBRUQsT0FBQSxBQUFPO1lBQ0ssb0JBQUEsQUFBVSxLQURILEFBQ1EsQUFDekI7YUFBVyxvQkFGTSxBQUVJLEFBQ3JCOzRCQUFNLEFBQVUsV0FDZCxvQkFEd0IsQUFDZCw0QkFDVixBQUFVO1dBQ0Qsb0JBQUEsQUFBVSxPQURILEFBQ1UsQUFDeEI7WUFBUSxvQkFQSyxBQUdYLEFBQW9CLEFBRXhCLEFBQWdCLEFBRUksQUFHdEI7QUFMa0IsQUFDZCxHQURGLENBRndCLENBQXBCO1dBT0csb0JBVlEsQUFVRSxBQUNuQjthQUFXLG9CQVhNLEFBV0ksQUFDckI7V0FBUyxvQkFaUSxBQVlFLEFBQ25CO1lBQVUsb0JBYlosQUFBbUIsQUFhRztBQWJILEFBQ2pCOztBQWVGLE9BQUEsQUFBTzthQUFlLEFBQ1QsQUFDWDtXQUZvQixBQUVYLEFBQ1Q7WUFIRixBQUFzQixBQUdWO0FBSFUsQUFDcEIiLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9