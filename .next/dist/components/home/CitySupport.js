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

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/home/CitySupport.js';

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

      return _react2.default.createElement('div', { className: 'columns c-detail-section', key: category.id, __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }, (category.cities || []).slice(0, 2).map(function (city) {
        return _react2.default.createElement('div', { key: city.id, className: 'column small-12 medium-6', __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        }, _react2.default.createElement('div', { className: 'post', __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        }, _react2.default.createElement('div', { className: 'picture', style: { backgroundImage: 'url(' + city.image + ')' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        }), city.imageSource && _react2.default.createElement('span', { className: 'c-text -dark -fs-smaller -fw-light -uppercase', __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }, 'image source: ', city.imageSource), _react2.default.createElement('p', { className: 'c-text -dark -fs-medium', __source: {
            fileName: _jsxFileName,
            lineNumber: 35
          }
        }, city.title), _react2.default.createElement('p', { className: 'c-text -fw-light', __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          }
        }, city.description || '')));
      })));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          citiesByCategory = _props.citiesByCategory,
          loading = _props.loading;

      return _react2.default.createElement('div', { className: 'small-12 medium-8', __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement('div', { className: 'c-content', __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, loading && _react2.default.createElement(_Spinner2.default, { isLoading: true, className: '-transparent', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }), this.renderBlock(citiesByCategory)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9tZS9DaXR5U3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsInN0b3JlIiwid2l0aFJlZHV4IiwiZ2V0RGF0YUFib3V0IiwicmVzZXREYXRhIiwiZ2V0Q2l0aWVzQnlDYXRlZ29yeSIsIlNwaW5uZXIiLCJDaXR5U3VwcG9ydCIsInByb3BzIiwiZ2V0Q2l0eVN1cHBvcnQiLCJjYXRlZ29yeSIsImxvYWRpbmciLCJpZCIsImNpdGllcyIsInNsaWNlIiwibWFwIiwiY2l0eSIsImJhY2tncm91bmRJbWFnZSIsImltYWdlIiwiaW1hZ2VTb3VyY2UiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiY2l0aWVzQnlDYXRlZ29yeSIsInJlbmRlckJsb2NrIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiYXJyYXkiLCJmdW5jIiwiZGVmYXVsdFByb3BzIiwic3RhdGUiLCJhYm91dCIsImRpc3BhdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBR1AsQUFBUzs7QUFDVCxBQUFPOzs7O0FBR1AsQUFBUyxBQUFjOztBQUN2QixBQUFPOzs7O0FBR1AsQUFBTzs7Ozs7Ozs7QUFUUDs7O0FBSUE7OztBQUlBOzs7SUFHTSxBOzs7Ozs7Ozs7Ozt5Q0FFaUIsQUFDbkI7V0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNaOzs7OzJDQUVzQixBQUNyQjtXQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7Ozs7Z0NBRVcsQSxVQUFVO1VBQUEsQUFDWixVQUFZLEtBREEsQUFDSyxNQURMLEFBQ1osQUFDUjs7NkJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZSw0QkFBMkIsS0FBSyxTQUEvQyxBQUF3RDtvQkFBeEQ7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7VUFDSSxTQUFBLEFBQVMsVUFBVixBQUFvQixJQUFwQixBQUF3QixNQUF4QixBQUE4QixHQUE5QixBQUFpQyxHQUFqQyxBQUFvQyxJQUFJLGdCQUFBOytCQUN2QyxjQUFBLFNBQUssS0FBSyxLQUFWLEFBQWUsSUFBSSxXQUFuQixBQUE2QjtzQkFBN0I7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtzQkFBZjt3QkFBQSxBQUNFO0FBREY7a0RBQ08sV0FBTCxBQUFlLFdBQVUsT0FBTyxFQUFFLDBCQUF3QixLQUF4QixBQUE2QixRQUEvRCxBQUFnQztzQkFBaEM7d0JBREYsQUFDRSxBQUNDO0FBREQ7aUJBQ0MsQUFBSywrQkFBZSxjQUFBLFVBQU0sV0FBTixBQUFnQjtzQkFBaEI7d0JBQUE7QUFBQTtTQUFBLEVBQStFLHVCQUZ0RyxBQUV1QixBQUFvRixBQUN6Ryw4QkFBQSxjQUFBLE9BQUcsV0FBSCxBQUFhO3NCQUFiO3dCQUFBLEFBQXdDO0FBQXhDO2dCQUhGLEFBR0UsQUFBNkMsQUFDN0Msd0JBQUEsY0FBQSxPQUFHLFdBQUgsQUFBYTtzQkFBYjt3QkFBQSxBQUFpQztBQUFqQztnQkFBaUMsQUFBSyxlQU5ILEFBQ3ZDLEFBQ0UsQUFJRSxBQUFxRDtBQVRqRSxBQUNFLEFBQ0UsQUFDRyxBQWFSOzs7OzZCQUVRO21CQUMrQixLQUQvQixBQUNvQztVQURwQyxBQUNDLDBCQURELEFBQ0M7VUFERCxBQUNtQixpQkFEbkIsQUFDbUIsQUFDMUI7OzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7b0NBQ2MsQUFBQyxtQ0FBUSxXQUFULE1BQW1CLFdBQW5CLEFBQTZCO29CQUE3QjtzQkFEZCxBQUNjLEFBQ1g7QUFEVztPQUFBLFFBQ1gsQUFBSyxZQUpaLEFBQ0UsQUFDRSxBQUVHLEFBQWlCLEFBR3pCOzs7OztFQXZDdUIsZ0IsQUFBTTs7QUEwQ2hDLFlBQUEsQUFBWTtvQkFDUSxvQkFESSxBQUNNLEFBQzVCO2tCQUFnQixvQkFGbEIsQUFBd0IsQUFFSTtBQUZKLEFBQ3RCOztBQUlGLFlBQUEsQUFBWTtvQkFBWixBQUEyQixBQUNQLEFBR3BCO0FBSjJCLEFBQ3pCOztnRUFLQSxVQUFBLEFBQUMsT0FBRDs7c0JBQ29CLDJCQURSLEFBQ1EsQUFBb0IsQUFDdEM7YUFBUyxNQUFBLEFBQU0sTUFGakIsQUFBWSxBQUVXO0FBRlgsQUFDVjtBQUhXLENBQUEsQUFDYixFQUtBLG9CQUFBOztBQUFhLDhDQUNNLEFBQUU7ZUFBUyx5QkFBVCxBQUFTLEFBQWEsQUFBb0I7QUFEbEQsQUFFWDtBQUZXLG9DQUVDLEFBQUU7ZUFBQSxBQUFTLEFBQWU7QUFGeEMsQUFBYTtBQUFBLEFBQ1g7QUFQVyxHQUFmLEFBQWUsQUFVYiIsImZpbGUiOiJDaXR5U3VwcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==