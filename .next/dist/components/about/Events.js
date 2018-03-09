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

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/about/Events.js';

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

      return _react2.default.createElement('div', { className: 'c-about-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement('div', { className: 'c-detail-section -content-separator', __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement('div', { className: 'column small-12', __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement('div', { className: 'about-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }, loading && _react2.default.createElement(_Spinner2.default, { isLoading: true, className: '-transparent', __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        }
      }), events.map(function (event) {
        return _react2.default.createElement('div', { key: event.id, className: 'column small-12 medium-6', __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        }, _react2.default.createElement('a', {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: event.link,
          className: 'event',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          }
        }, _react2.default.createElement('div', { className: 'picture', style: { backgroundImage: 'url(' + event.image + ')' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          }
        }), _react2.default.createElement('p', { className: 'c-text -dark -fs-medium -fw-light -lh-small', __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          }
        }, event.title), _react2.default.createElement('span', { className: 'c-text -dark -fs-smaller -fw-light -uppercase', __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        }, event.date)));
      }))))));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWJvdXQvRXZlbnRzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwic3RvcmUiLCJ3aXRoUmVkdXgiLCJnZXREYXRhQWJvdXQiLCJyZXNldERhdGEiLCJTcGlubmVyIiwiRXZlbnRzIiwicHJvcHMiLCJnZXRFdmVudHMiLCJldmVudHMiLCJsb2FkaW5nIiwibWFwIiwiZXZlbnQiLCJpZCIsImxpbmsiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZSIsInRpdGxlIiwiZGF0ZSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsImFycmF5IiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsImFib3V0IiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFHUCxBQUFTOztBQUNULEFBQU87Ozs7QUFHUCxBQUFTLEFBQWM7O0FBR3ZCLEFBQU87Ozs7Ozs7O0FBUlA7OztBQUlBOzs7QUFHQTs7O0lBR00sQTs7Ozs7Ozs7Ozs7eUNBRWlCLEFBQ25CO1dBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjs7OzsyQ0FFc0IsQUFDckI7V0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNaOzs7OzZCQUVRO21CQUNxQixLQURyQixBQUMwQjtVQUQxQixBQUNDLGdCQURELEFBQ0M7VUFERCxBQUNTLGlCQURULEFBQ1MsQUFDaEI7OzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUVFO0FBRkY7eUJBRUUsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7b0NBQ2MsQUFBQyxtQ0FBUSxXQUFULE1BQW1CLFdBQW5CLEFBQTZCO29CQUE3QjtzQkFEZCxBQUNjLEFBQ1g7QUFEVztPQUFBLFVBQ1gsQUFBTyxJQUFJLGlCQUFBOytCQUNWLGNBQUEsU0FBSyxLQUFLLE1BQVYsQUFBZ0IsSUFBSSxXQUFwQixBQUE4QjtzQkFBOUI7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQTtrQkFBQSxBQUNTLEFBQ1A7ZUFGRixBQUVNLEFBQ0o7Z0JBQU0sTUFIUixBQUdjLEFBQ1o7cUJBSkYsQUFJWTs7c0JBSlo7d0JBQUEsQUFNRTtBQU5GO0FBQ0Usa0RBS0ssV0FBTCxBQUFlLFdBQVUsT0FBTyxFQUFFLDBCQUF3QixNQUF4QixBQUE4QixRQUFoRSxBQUFnQztzQkFBaEM7d0JBTkYsQUFNRSxBQUNBO0FBREE7NEJBQ0EsY0FBQSxPQUFHLFdBQUgsQUFBYTtzQkFBYjt3QkFBQSxBQUE0RDtBQUE1RDtpQkFQRixBQU9FLEFBQWtFLEFBQ2xFLHdCQUFBLGNBQUEsVUFBTSxXQUFOLEFBQWdCO3NCQUFoQjt3QkFBQSxBQUFpRTtBQUFqRTtpQkFWTSxBQUNWLEFBQ0UsQUFRRSxBQUF1RTtBQWxCekYsQUFDRSxBQUNFLEFBQ0UsQUFFRSxBQUNFLEFBRUcsQUFxQmQ7Ozs7O0VBekNrQixnQixBQUFNOztBQTRDM0IsT0FBQSxBQUFPO1VBQ0csb0JBRFMsQUFDQyxBQUNsQjthQUFXLG9CQUZiLEFBQW1CLEFBRUk7QUFGSixBQUNqQjs7QUFJRixPQUFBLEFBQU87VUFBUCxBQUFzQixBQUNaLEFBR1Y7QUFKc0IsQUFDcEI7O2dFQUtBLGdCQUFBO01BQUEsQUFBRyxhQUFILEFBQUc7O1lBQ08sTUFETSxBQUNBLEFBQ2Q7YUFBUyxNQUZYLEFBQWdCLEFBRUM7QUFGRCxBQUNkO0FBSFcsQ0FBQSxBQUNiLEVBS0Esb0JBQUE7O0FBQWEsb0NBQ0MsQUFBRTtlQUFTLHlCQUFULEFBQVMsQUFBYSxBQUFhO0FBRHRDLEFBRVg7QUFGVyxvQ0FFQyxBQUFFO2VBQUEsQUFBUyxBQUFlO0FBRnhDLEFBQWE7QUFBQSxBQUNYO0FBUFcsR0FBZixBQUFlLEFBVWIiLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9