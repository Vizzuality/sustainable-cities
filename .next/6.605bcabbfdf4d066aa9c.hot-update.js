webpackHotUpdate(6,{

/***/ 881:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(55);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(30);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(31);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(56);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(60);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(27);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(72);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _store = __webpack_require__(583);

var _nextReduxWrapper = __webpack_require__(575);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _about = __webpack_require__(594);

var _citySupport = __webpack_require__(867);

var _citySupport2 = _interopRequireDefault(_citySupport);

var _Spinner = __webpack_require__(721);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/Users/claralinos/Sites/sustainable-cities/components/home/CitySupport.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/Users/claralinos/Sites/sustainable-cities/components/home/CitySupport.js"); } } })();

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNi42MDViY2FiYmZkZjRkMDY2YWE5Yy5ob3QtdXBkYXRlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9ob21lL0NpdHlTdXBwb3J0LmpzPzNjYWNiN2EiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5cbi8vIHJlZHV4XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJ3N0b3JlJztcbmltcG9ydCB3aXRoUmVkdXggZnJvbSAnbmV4dC1yZWR1eC13cmFwcGVyJztcblxuLy8gbW9kdWxlc1xuaW1wb3J0IHsgZ2V0RGF0YUFib3V0LCByZXNldERhdGEgfSBmcm9tICdtb2R1bGVzL2Fib3V0JztcbmltcG9ydCBnZXRDaXRpZXNCeUNhdGVnb3J5IGZyb20gJ3NlbGVjdG9ycy9jaXR5LXN1cHBvcnQnO1xuXG4vLyBjb21wb25lbnRzXG5pbXBvcnQgU3Bpbm5lciBmcm9tICdjb21wb25lbnRzL2NvbW1vbi9TcGlubmVyJztcblxuY2xhc3MgQ2l0eVN1cHBvcnQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLmdldENpdHlTdXBwb3J0KCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnByb3BzLnJlc2V0RGF0YSgpO1xuICB9XG5cbiAgcmVuZGVyQmxvY2soY2F0ZWdvcnkpIHtcbiAgICBjb25zdCB7IGxvYWRpbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sdW1ucyBjLWRldGFpbC1zZWN0aW9uXCIga2V5PXtjYXRlZ29yeS5pZH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgeyhjYXRlZ29yeS5jaXRpZXMgfHwgW10pLnNsaWNlKDAsIDIpLm1hcChjaXR5ID0+IChcbiAgICAgICAgICAgIDxkaXYga2V5PXtjaXR5LmlkfSBjbGFzc05hbWU9XCJjb2x1bW4gc21hbGwtMTIgbWVkaXVtLTZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb3N0XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaWN0dXJlXCIgc3R5bGU9e3sgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7Y2l0eS5pbWFnZX0pYCB9fSAvPlxuICAgICAgICAgICAgICAgIHtjaXR5LmltYWdlU291cmNlICYmIDxzcGFuIGNsYXNzTmFtZT1cImMtdGV4dCAtZGFyayAtZnMtc21hbGxlciAtZnctbGlnaHQgLXVwcGVyY2FzZVwiPmltYWdlIHNvdXJjZToge2NpdHkuaW1hZ2VTb3VyY2V9PC9zcGFuPn1cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjLXRleHQgLWRhcmsgLWZzLW1lZGl1bVwiPntjaXR5LnRpdGxlfTwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJjLXRleHQgLWZ3LWxpZ2h0XCI+e2NpdHkuZGVzY3JpcHRpb24gfHwgJyd9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBjaXRpZXNCeUNhdGVnb3J5LCBsb2FkaW5nIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtYWxsLTEyIG1lZGl1bS04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYy1jb250ZW50XCI+XG4gICAgICAgICAge2xvYWRpbmcgJiYgPFNwaW5uZXIgaXNMb2FkaW5nIGNsYXNzTmFtZT1cIi10cmFuc3BhcmVudFwiIC8+fVxuICAgICAgICAgIHt0aGlzLnJlbmRlckJsb2NrKGNpdGllc0J5Q2F0ZWdvcnkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2Pik7XG4gIH1cbn1cblxuQ2l0eVN1cHBvcnQucHJvcFR5cGVzID0ge1xuICBjaXRpZXNCeUNhdGVnb3J5OiBQcm9wVHlwZXMuYXJyYXksXG4gIGdldENpdHlTdXBwb3J0OiBQcm9wVHlwZXMuZnVuY1xufTtcblxuQ2l0eVN1cHBvcnQuZGVmYXVsdFByb3BzID0ge1xuICBjaXRpZXNCeUNhdGVnb3J5OiBbXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJlZHV4KFxuICBzdG9yZSxcbiAgKHN0YXRlKSA9PiAoe1xuICAgIGNpdGllc0J5Q2F0ZWdvcnk6IGdldENpdGllc0J5Q2F0ZWdvcnkoc3RhdGUpLFxuICAgIGxvYWRpbmc6IHN0YXRlLmFib3V0LmxvYWRpbmdcbiAgfSksXG4gIGRpc3BhdGNoID0+ICh7XG4gICAgZ2V0Q2l0eVN1cHBvcnQoKSB7IGRpc3BhdGNoKGdldERhdGFBYm91dCgnY2l0eS1zdXBwb3J0cycpKTsgfSxcbiAgICByZXNldERhdGEoKSB7IGRpc3BhdGNoKHJlc2V0RGF0YSgpKTsgfVxuICB9KVxuKShDaXR5U3VwcG9ydCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL2hvbWUvQ2l0eVN1cHBvcnQuanMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBRUE7QUFDQTtBQUFBO0FBQ0E7OztBQUVBO0FBQ0E7QUFBQTtBQUNBOzs7QUFFQTtBQUNBOzs7Ozs7O0FBVkE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBR0E7QUFBQTs7OztBQUlBO0FBQUE7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BOzs7O0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUFBOzs7OztBQW5DQTtBQUNBO0FBeUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUlBO0FBSEE7QUFDQTtBQUlBOztBQUNBO0FBQ0E7QUFEQTtBQUhBOztBQU1BO0FBQ0E7QUFDQTtBQUZBO0FBRUE7QUFGQTtBQUNBO0FBUEE7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==