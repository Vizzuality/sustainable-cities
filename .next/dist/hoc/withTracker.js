'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/hoc/withTracker.js';


// Libraries
var GA = void 0;
if (typeof window !== 'undefined') {
  /* eslint-disable global-require */
  GA = require('react-ga');
  /* eslint-enable global-require */
  var gaTrackingId = process.env.NODE_ENV === 'production' ? process.env.GA_TRACKING_ID : 'UA-XXXXXXX-XX';
  GA.initialize(gaTrackingId);
}

var withTracker = function withTracker(Page) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var trackPage = function trackPage(page) {
    GA.event((0, _extends3.default)({
      page: page,
      category: page,
      action: 'Navigation',
      label: page
    }, options));

    GA.pageview(page);
  };

  var HOC = function (_React$Component) {
    (0, _inherits3.default)(HOC, _React$Component);

    function HOC() {
      (0, _classCallCheck3.default)(this, HOC);

      return (0, _possibleConstructorReturn3.default)(this, (HOC.__proto__ || (0, _getPrototypeOf2.default)(HOC)).apply(this, arguments));
    }

    (0, _createClass3.default)(HOC, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var page = this.props.url.pathname;
        trackPage(page);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var currentPage = this.props.url.pathname;
        var nextPage = nextProps.url.pathname;

        if (currentPage !== nextPage) {
          trackPage(nextPage);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Page, (0, _extends3.default)({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 53
          }
        }));
      }
    }], [{
      key: 'getInitialProps',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(context) {
          var props;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  props = void 0;

                  if (!(typeof Page.getInitialProps === 'function')) {
                    _context.next = 5;
                    break;
                  }

                  _context.next = 4;
                  return Page.getInitialProps(context);

                case 4:
                  props = _context.sent;

                case 5:
                  return _context.abrupt('return', (0, _extends3.default)({}, props));

                case 6:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function getInitialProps(_x2) {
          return _ref.apply(this, arguments);
        }

        return getInitialProps;
      }()
    }]);

    return HOC;
  }(_react2.default.Component);

  HOC.propTypes = {
    url: _propTypes2.default.object
  };

  return HOC;
};

exports.default = withTracker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvYy93aXRoVHJhY2tlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsIkdBIiwid2luZG93IiwicmVxdWlyZSIsImdhVHJhY2tpbmdJZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkdBX1RSQUNLSU5HX0lEIiwiaW5pdGlhbGl6ZSIsIndpdGhUcmFja2VyIiwiUGFnZSIsIm9wdGlvbnMiLCJ0cmFja1BhZ2UiLCJwYWdlIiwiZXZlbnQiLCJjYXRlZ29yeSIsImFjdGlvbiIsImxhYmVsIiwicGFnZXZpZXciLCJIT0MiLCJwcm9wcyIsInVybCIsInBhdGhuYW1lIiwibmV4dFByb3BzIiwiY3VycmVudFBhZ2UiLCJuZXh0UGFnZSIsImNvbnRleHQiLCJnZXRJbml0aWFsUHJvcHMiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7OztBQUVQO0FBQ0EsSUFBSSxVQUFKO0FBQ0EsSUFBSSxPQUFBLEFBQU8sV0FBWCxBQUFzQixhQUFhLEFBQ2pDO0FBQ0E7T0FBQSxBQUFLLEFBQ0w7QUFDQTtNQUFNLGVBQWUsUUFBQSxBQUFRLElBQVIsQUFBWSxhQUFaLEFBQXlCLGVBQzVDLFFBQUEsQUFBUSxJQURXLEFBQ1AsaUJBRGQsQUFDK0IsQUFDL0I7S0FBQSxBQUFHLFdBQUgsQUFBYyxBQUNmOzs7QUFFRCxJQUFNLGNBQWMsU0FBZCxBQUFjLFlBQUEsQUFBQyxNQUF1QjtNQUFqQixBQUFpQiw4RUFBUCxBQUFPLEFBQzFDOztNQUFNLFlBQVksU0FBWixBQUFZLFVBQUEsQUFBQyxNQUFTLEFBQzFCO09BQUEsQUFBRztZQUFILEFBRUU7Z0JBRkYsQUFFWSxBQUNWO2NBSEYsQUFHVSxBQUNSO2FBSkYsQUFJUztBQUhQLE9BREYsQUFLSyxBQUdMOztPQUFBLEFBQUcsU0FBSCxBQUFZLEFBQ2I7QUFWRCxBQVlBOztNQUFNLGtDQUFBO2lDQUFBOzttQkFBQTswQ0FBQTs7OEhBQUE7QUFBQTs7O1dBQUE7MENBVWdCLEFBQ2xCO1lBQU0sT0FBTyxLQUFBLEFBQUssTUFBTCxBQUFXLElBQXhCLEFBQTRCLEFBQzVCO2tCQUFBLEFBQVUsQUFDWDtBQWJHO0FBQUE7V0FBQTtnREFBQSxBQWVzQixXQUFXLEFBQ25DO1lBQU0sY0FBYyxLQUFBLEFBQUssTUFBTCxBQUFXLElBQS9CLEFBQW1DLEFBQ25DO1lBQU0sV0FBVyxVQUFBLEFBQVUsSUFBM0IsQUFBK0IsQUFFL0I7O1lBQUksZ0JBQUosQUFBb0IsVUFBVSxBQUM1QjtvQkFBQSxBQUFVLEFBQ1g7QUFDRjtBQXRCRztBQUFBO1dBQUE7K0JBd0JLLEFBQ1A7NkNBQU8sQUFBQyxpQ0FBUyxLQUFWLEFBQWU7O3NCQUFmO3dCQUFQLEFBQU8sQUFDUjtBQURRO0FBQUEsVUFBQTtBQXpCTDtBQUFBO1dBQUE7eUJBQUE7NkdBQUEsQUFDeUIsU0FEekI7Y0FBQTt3RUFBQTtzQkFBQTsrQ0FBQTtxQkFFRTtBQUZGLCtCQUFBOzt3QkFHRSxPQUFPLEtBQVAsQUFBWSxvQkFIZCxBQUdrQyxhQUhsQztvQ0FBQTtBQUFBO0FBQUE7O2tDQUFBO3lCQUljLEtBQUEsQUFBSyxnQkFKbkIsQUFJYyxBQUFxQjs7cUJBQW5DO0FBSkEsbUNBQUE7O3FCQUFBOzhFQUFBLEFBT1U7O3FCQVBWO3FCQUFBO2tDQUFBOztBQUFBO3NCQUFBO0FBQUE7O3NDQUFBO2tDQUFBO0FBQUE7O2VBQUE7QUFBQTtBQUFBOztXQUFBO0lBQW9CLGdCQUExQixBQUFNLEFBQTBCLEFBNkJoQzs7TUFBQSxBQUFJO1NBQ0csb0JBRFAsQUFBZ0IsQUFDQyxBQUdqQjtBQUpnQixBQUNkOztTQUdGLEFBQU8sQUFDUjtBQS9DRCxBQWtEQTs7a0JBQUEsQUFBZSIsImZpbGUiOiJ3aXRoVHJhY2tlci5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==