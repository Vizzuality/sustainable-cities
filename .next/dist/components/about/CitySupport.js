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

var _citySupport = require('../../selectors/city-support');

var _citySupport2 = _interopRequireDefault(_citySupport);

var _Spinner = require('../common/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/about/CitySupport.js';

// redux


// modules


// components


var CitySupport = function (_React$Component) {
  (0, _inherits3.default)(CitySupport, _React$Component);

  function CitySupport() {
    (0, _classCallCheck3.default)(this, CitySupport);

    return (0, _possibleConstructorReturn3.default)(this, (CitySupport.__proto__ || (0, _getPrototypeOf2.default)(CitySupport)).apply(this, arguments));
  }

  (0, _createClass3.default)(CitySupport, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getCitySupport();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.resetData();
    }
  }, {
    key: 'renderBlock',
    value: function renderBlock(category) {
      var loading = this.props.loading;

      return _react2.default.createElement('div', { className: 'c-detail-section -content-separator', key: category.id, __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, _react2.default.createElement('div', { className: 'about-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        }
      }, category.map(function (city) {
        return _react2.default.createElement('div', { key: city.id, className: 'column small-12 medium-4', __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        }, _react2.default.createElement('div', { className: 'post', __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        }, _react2.default.createElement('div', { className: 'picture', style: { backgroundImage: 'url(' + city.image + ')' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }), _react2.default.createElement('p', { className: 'c-title -dark -fs-big -fw-light -lh-small', __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        }, city.title), _react2.default.createElement('p', { className: 'c-text -fw-light -lh-small', __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          }
        }, city.description || ''), city.imageSource && _react2.default.createElement('span', { className: 'c-text -fs-smaller -fw-light', __source: {
            fileName: _jsxFileName,
            lineNumber: 37
          }
        }, 'image source: ', city.imageSource)));
      }))));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          citiesByCategory = _props.citiesByCategory,
          loading = _props.loading;

      return _react2.default.createElement('div', { className: 'c-about-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, loading && _react2.default.createElement(_Spinner2.default, { isLoading: true, className: '-transparent', __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }), this.renderBlock(citiesByCategory));
    }
  }]);

  return CitySupport;
}(_react2.default.Component);

CitySupport.propTypes = {
  citiesByCategory: _propTypes2.default.array,
  getCitySupport: _propTypes2.default.func
};

CitySupport.defaultProps = {
  citiesByCategory: []
};

exports.default = (0, _nextReduxWrapper2.default)(_store.store, function (state) {
  return {
    citiesByCategory: (0, _citySupport2.default)(state),
    loading: state.about.loading
  };
}, function (dispatch) {
  return {
    getCitySupport: function getCitySupport() {
      dispatch((0, _about.getDataAbout)('city-supports'));
    },
    resetData: function resetData() {
      dispatch((0, _about.resetData)());
    }
  };
})(CitySupport);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYWJvdXQvQ2l0eVN1cHBvcnQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJzdG9yZSIsIndpdGhSZWR1eCIsImdldERhdGFBYm91dCIsInJlc2V0RGF0YSIsImdldENpdGllc0J5Q2F0ZWdvcnkiLCJTcGlubmVyIiwiQ2l0eVN1cHBvcnQiLCJwcm9wcyIsImdldENpdHlTdXBwb3J0IiwiY2F0ZWdvcnkiLCJsb2FkaW5nIiwiaWQiLCJtYXAiLCJjaXR5IiwiYmFja2dyb3VuZEltYWdlIiwiaW1hZ2UiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiaW1hZ2VTb3VyY2UiLCJjaXRpZXNCeUNhdGVnb3J5IiwicmVuZGVyQmxvY2siLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJhcnJheSIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiLCJzdGF0ZSIsImFib3V0IiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFHUCxBQUFTOztBQUNULEFBQU87Ozs7QUFHUCxBQUFTLEFBQWM7O0FBQ3ZCLEFBQU87Ozs7QUFHUCxBQUFPOzs7Ozs7OztBQVRQOzs7QUFJQTs7O0FBSUE7OztJQUdNLEE7Ozs7Ozs7Ozs7O3lDQUVpQixBQUNuQjtXQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7Ozs7MkNBRXNCLEFBQ3JCO1dBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjs7OztnQ0FFVyxBLFVBQVU7VUFBQSxBQUNaLFVBQVksS0FEQSxBQUNLLE1BREwsQUFDWixBQUNSOzs2QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlLHVDQUFzQyxLQUFLLFNBQTFELEFBQW1FO29CQUFuRTtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjt5QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0c7QUFESDtrQkFDRyxBQUFTLElBQUksZ0JBQUE7K0JBQ1osY0FBQSxTQUFLLEtBQUssS0FBVixBQUFlLElBQUksV0FBbkIsQUFBNkI7c0JBQTdCO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7c0JBQWY7d0JBQUEsQUFDRTtBQURGO2tEQUNPLFdBQUwsQUFBZSxXQUFVLE9BQU8sRUFBRSwwQkFBd0IsS0FBeEIsQUFBNkIsUUFBL0QsQUFBZ0M7c0JBQWhDO3dCQURGLEFBQ0UsQUFDQTtBQURBOzRCQUNBLGNBQUEsT0FBRyxXQUFILEFBQWE7c0JBQWI7d0JBQUEsQUFBMEQ7QUFBMUQ7Z0JBRkYsQUFFRSxBQUErRCxBQUMvRCx3QkFBQSxjQUFBLE9BQUcsV0FBSCxBQUFhO3NCQUFiO3dCQUFBLEFBQTJDO0FBQTNDO2dCQUEyQyxBQUFLLGVBSGxELEFBR0UsQUFBK0QsQUFDOUQsVUFBQSxBQUFLLCtCQUFlLGNBQUEsVUFBTSxXQUFOLEFBQWdCO3NCQUFoQjt3QkFBQTtBQUFBO1NBQUEsRUFBOEQsdUJBTjNFLEFBQ1osQUFDRSxBQUl1QixBQUFtRTtBQVZ0RyxBQUNFLEFBQ0UsQUFDRSxBQUNHLEFBY1Y7Ozs7NkJBRVE7bUJBQytCLEtBRC9CLEFBQ29DO1VBRHBDLEFBQ0MsMEJBREQsQUFDQztVQURELEFBQ21CLGlCQURuQixBQUNtQixBQUMxQjs7NkJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7T0FBQSw2QkFDYyxBQUFDLG1DQUFRLFdBQVQsTUFBbUIsV0FBbkIsQUFBNkI7b0JBQTdCO3NCQURkLEFBQ2MsQUFDWDtBQURXO09BQUEsUUFDWCxBQUFLLFlBSFYsQUFDRSxBQUVHLEFBQWlCLEFBRXZCOzs7OztFQXZDdUIsZ0JBQU0sQTs7QUEwQ2hDLFlBQUEsQUFBWTtvQkFDUSxvQkFESSxBQUNNLEFBQzVCO2tCQUFnQixvQkFGbEIsQUFBd0IsQUFFSTtBQUZKLEFBQ3RCOztBQUlGLFlBQUEsQUFBWTtvQkFBWixBQUEyQixBQUNQLEFBR3BCO0FBSjJCLEFBQ3pCOztnRUFLQSxVQUFBLEFBQUMsT0FBRDs7c0JBQ29CLDJCQURSLEFBQ1EsQUFBb0IsQUFDdEM7YUFBUyxNQUFBLEFBQU0sTUFGakIsQUFBWSxBQUVXO0FBRlgsQUFDVjtBQUhXLENBQUEsQUFDYixFQUtBLG9CQUFBOztBQUFhLDhDQUNNLEFBQUU7ZUFBUyx5QkFBVCxBQUFTLEFBQWEsQUFBb0I7QUFEbEQsQUFFWDtBQUZXLG9DQUVDLEFBQUU7ZUFBQSxBQUFTLEFBQWU7QUFGeEMsQUFBYTtBQUFBLEFBQ1g7QUFQVyxHQUFmLEFBQWUsQUFVYiIsImZpbGUiOiJDaXR5U3VwcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==