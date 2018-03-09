'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = require('../../store');

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _about = require('../../modules/about');

var _Spinner = require('../common/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/home/Events.js';

// redux


// modules


// components


var Events = function (_React$Component) {
  (0, _inherits3.default)(Events, _React$Component);

  function Events() {
    (0, _classCallCheck3.default)(this, Events);

    return (0, _possibleConstructorReturn3.default)(this, (Events.__proto__ || (0, _getPrototypeOf2.default)(Events)).apply(this, arguments));
  }

  (0, _createClass3.default)(Events, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getEvents();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.resetData();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          events = _props.events,
          loading = _props.loading;

      return _react2.default.createElement('div', { className: 'c-detail-section columns small-12 medium-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, loading && _react2.default.createElement(_Spinner2.default, { isLoading: true, className: '-transparent', __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }), events.slice(0, 4).map(function (event) {
        return _react2.default.createElement('div', { key: event.id, className: 'column small-12 medium-6', __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        }, _react2.default.createElement('a', {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: event.link,
          className: 'event',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        }, _react2.default.createElement('div', { className: 'picture', style: { backgroundImage: 'url(' + event.image + ')' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          }
        }), _react2.default.createElement('p', { className: 'c-text -dark -fs-medium', __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          }
        }, event.title), _react2.default.createElement('span', { className: 'c-text -dark -fs-smaller -fw-light -uppercase', __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          }
        }, event.date)));
      })));
    }
  }]);

  return Events;
}(_react2.default.Component);

Events.propTypes = {
  events: _propTypes2.default.array,
  getEvents: _propTypes2.default.func
};

Events.defaultProps = {
  events: []
};

exports.default = (0, _nextReduxWrapper2.default)(_store.store, function (_ref) {
  var about = _ref.about;
  return {
    events: about.events,
    loading: about.loading
  };
}, function (dispatch) {
  return {
    getEvents: function getEvents() {
      dispatch((0, _about.getDataAbout)('events'));
    },
    resetData: function resetData() {
      dispatch((0, _about.resetData)());
    }
  };
})(Events);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9tZS9FdmVudHMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJzdG9yZSIsIndpdGhSZWR1eCIsImdldERhdGFBYm91dCIsInJlc2V0RGF0YSIsIlNwaW5uZXIiLCJFdmVudHMiLCJwcm9wcyIsImdldEV2ZW50cyIsImV2ZW50cyIsImxvYWRpbmciLCJzbGljZSIsIm1hcCIsImV2ZW50IiwiaWQiLCJsaW5rIiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2UiLCJ0aXRsZSIsImRhdGUiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhcnJheSIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJhYm91dCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBR1AsQUFBUzs7QUFDVCxBQUFPOzs7O0FBR1AsQUFBUyxBQUFjOztBQUd2QixBQUFPOzs7Ozs7OztBQVJQOzs7QUFJQTs7O0FBR0E7OztJQUdNLEE7Ozs7Ozs7Ozs7O3lDQUVpQixBQUNuQjtXQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7Ozs7MkNBRXNCLEFBQ3JCO1dBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjs7Ozs2QkFFUTttQkFDcUIsS0FEckIsQUFDMEI7VUFEMUIsQUFDQyxnQkFERCxBQUNDO1VBREQsQUFDUyxpQkFEVCxBQUNTLEFBRWhCOzs2QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRztBQURIO29DQUNjLEFBQUMsbUNBQVEsV0FBVCxNQUFtQixXQUFuQixBQUE2QjtvQkFBN0I7c0JBRGQsQUFDYyxBQUNYO0FBRFc7T0FBQSxVQUNYLEFBQU8sTUFBUCxBQUFhLEdBQWIsQUFBZ0IsR0FBaEIsQUFBbUIsSUFBSSxpQkFBQTsrQkFDdEIsY0FBQSxTQUFLLEtBQUssTUFBVixBQUFnQixJQUFJLFdBQXBCLEFBQThCO3NCQUE5Qjt3QkFBQSxBQUNFO0FBREY7U0FBQSxrQkFDRSxjQUFBO2tCQUFBLEFBQ1MsQUFDUDtlQUZGLEFBRU0sQUFDSjtnQkFBTSxNQUhSLEFBR2MsQUFDWjtxQkFKRixBQUlZOztzQkFKWjt3QkFBQSxBQU1FO0FBTkY7QUFDRSxrREFLSyxXQUFMLEFBQWUsV0FBVSxPQUFPLEVBQUUsMEJBQXdCLE1BQXhCLEFBQThCLFFBQWhFLEFBQWdDO3NCQUFoQzt3QkFORixBQU1FLEFBQ0E7QUFEQTs0QkFDQSxjQUFBLE9BQUcsV0FBSCxBQUFhO3NCQUFiO3dCQUFBLEFBQXdDO0FBQXhDO2lCQVBGLEFBT0UsQUFBOEMsQUFDOUMsd0JBQUEsY0FBQSxVQUFNLFdBQU4sQUFBZ0I7c0JBQWhCO3dCQUFBLEFBQWlFO0FBQWpFO2lCQVZrQixBQUN0QixBQUNFLEFBUUUsQUFBdUU7QUFkbkYsQUFDRSxBQUNFLEFBRUcsQUFpQlI7Ozs7O0VBbENrQixnQixBQUFNOztBQXFDM0IsT0FBQSxBQUFPO1VBQ0csb0JBRFMsQUFDQyxBQUNsQjthQUFXLG9CQUZiLEFBQW1CLEFBRUk7QUFGSixBQUNqQjs7QUFJRixPQUFBLEFBQU87VUFBUCxBQUFzQixBQUNaLEFBR1Y7QUFKc0IsQUFDcEI7O2dFQUtBLGdCQUFBO01BQUEsQUFBRyxhQUFILEFBQUc7O1lBQ08sTUFETSxBQUNBLEFBQ2Q7YUFBUyxNQUZYLEFBQWdCLEFBRUM7QUFGRCxBQUNkO0FBSFcsQ0FBQSxBQUNiLEVBS0Esb0JBQUE7O0FBQWEsb0NBQ0MsQUFBRTtlQUFTLHlCQUFULEFBQVMsQUFBYSxBQUFhO0FBRHRDLEFBRVg7QUFGVyxvQ0FFQyxBQUFFO2VBQUEsQUFBUyxBQUFlO0FBRnhDLEFBQWE7QUFBQSxBQUNYO0FBUFcsR0FBZixBQUFlLEFBVWIiLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9