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

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/home/Blogs.js';

// redux


// modules


// components


var Blogs = function (_React$Component) {
  (0, _inherits3.default)(Blogs, _React$Component);

  function Blogs() {
    (0, _classCallCheck3.default)(this, Blogs);

    return (0, _possibleConstructorReturn3.default)(this, (Blogs.__proto__ || (0, _getPrototypeOf2.default)(Blogs)).apply(this, arguments));
  }

  (0, _createClass3.default)(Blogs, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getBlogs();
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
          blogs = _props.blogs,
          loading = _props.loading;

      return _react2.default.createElement('div', { className: 'c-detail-section', __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 28
        }
      }, loading && _react2.default.createElement(_Spinner2.default, { isLoading: true, className: '-transparent', __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        }
      }), blogs.slice(0, 4).map(function (blog) {
        return _react2.default.createElement('div', { key: blog.id, className: 'column small-12 medium-3', __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        }, _react2.default.createElement('a', {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: blog.link,
          className: 'post',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          }
        }, _react2.default.createElement('div', { className: 'picture', style: { backgroundImage: 'url(' + blog.image + ')' }, __source: {
            fileName: _jsxFileName,
            lineNumber: 38
          }
        }), _react2.default.createElement('p', { className: 'c-text -dark -fs-medium', __source: {
            fileName: _jsxFileName,
            lineNumber: 39
          }
        }, blog.title), _react2.default.createElement('span', { className: 'c-text -dark -fs-smaller -fw-light -uppercase', __source: {
            fileName: _jsxFileName,
            lineNumber: 40
          }
        }, blog.date)));
      })));
    }
  }]);

  return Blogs;
}(_react2.default.Component);

Blogs.propTypes = {
  Blogs: _propTypes2.default.array,
  getBlogs: _propTypes2.default.func
};

Blogs.defaultProps = {
  blogs: []
};

exports.default = (0, _nextReduxWrapper2.default)(_store.store, function (_ref) {
  var about = _ref.about;
  return {
    blogs: about.blogs,
    loading: about.loading
  };
}, function (dispatch) {
  return {
    getBlogs: function getBlogs() {
      dispatch((0, _about.getDataAbout)('blogs'));
    },
    resetData: function resetData() {
      dispatch((0, _about.resetData)());
    }
  };
})(Blogs);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9tZS9CbG9ncy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsInN0b3JlIiwid2l0aFJlZHV4IiwiZ2V0RGF0YUFib3V0IiwicmVzZXREYXRhIiwiU3Bpbm5lciIsIkJsb2dzIiwicHJvcHMiLCJnZXRCbG9ncyIsImJsb2dzIiwibG9hZGluZyIsInNsaWNlIiwibWFwIiwiYmxvZyIsImlkIiwibGluayIsImJhY2tncm91bmRJbWFnZSIsImltYWdlIiwidGl0bGUiLCJkYXRlIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiYXJyYXkiLCJmdW5jIiwiZGVmYXVsdFByb3BzIiwiYWJvdXQiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUdQLEFBQVM7O0FBQ1QsQUFBTzs7OztBQUdQLEFBQVMsQUFBYzs7QUFHdkIsQUFBTzs7Ozs7Ozs7QUFSUDs7O0FBSUE7OztBQUdBOzs7SUFHTSxBOzs7Ozs7Ozs7Ozt5Q0FFaUIsQUFDbkI7V0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNaOzs7OzJDQUVzQixBQUNyQjtXQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7Ozs7NkJBRVE7bUJBQ29CLEtBRHBCLEFBQ3lCO1VBRHpCLEFBQ0MsZUFERCxBQUNDO1VBREQsQUFDUSxpQkFEUixBQUNRLEFBQ2Y7OzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7b0NBQ2MsQUFBQyxtQ0FBUSxXQUFULE1BQW1CLFdBQW5CLEFBQTZCO29CQUE3QjtzQkFEZCxBQUNjLEFBQ1g7QUFEVztPQUFBLFNBQ1gsQUFBTSxNQUFOLEFBQVksR0FBWixBQUFjLEdBQWQsQUFBaUIsSUFBSSxnQkFBQTsrQkFDcEIsY0FBQSxTQUFLLEtBQUssS0FBVixBQUFlLElBQUksV0FBbkIsQUFBNkI7c0JBQTdCO3dCQUFBLEFBQ0U7QUFERjtTQUFBLGtCQUNFLGNBQUE7a0JBQUEsQUFDUyxBQUNQO2VBRkYsQUFFTSxBQUNKO2dCQUFNLEtBSFIsQUFHYSxBQUNYO3FCQUpGLEFBSVk7O3NCQUpaO3dCQUFBLEFBTUU7QUFORjtBQUNFLGtEQUtLLFdBQUwsQUFBZSxXQUFVLE9BQU8sRUFBRSwwQkFBd0IsS0FBeEIsQUFBNkIsUUFBL0QsQUFBZ0M7c0JBQWhDO3dCQU5GLEFBTUUsQUFDQTtBQURBOzRCQUNBLGNBQUEsT0FBRyxXQUFILEFBQWE7c0JBQWI7d0JBQUEsQUFBd0M7QUFBeEM7Z0JBUEYsQUFPRSxBQUE2QyxBQUM3Qyx3QkFBQSxjQUFBLFVBQU0sV0FBTixBQUFnQjtzQkFBaEI7d0JBQUEsQUFBaUU7QUFBakU7Z0JBVmdCLEFBQ3BCLEFBQ0UsQUFRRSxBQUFzRTtBQWRsRixBQUNFLEFBQ0UsQUFFRyxBQWtCUjs7Ozs7RUFsQ2lCLGdCLEFBQU07O0FBcUMxQixNQUFBLEFBQU07U0FDRyxvQkFEUyxBQUNDLEFBQ2pCO1lBQVUsb0JBRlosQUFBa0IsQUFFSTtBQUZKLEFBQ2hCOztBQUlGLE1BQUEsQUFBTTtTQUFOLEFBQXFCLEFBQ1osQUFHVDtBQUpxQixBQUNuQjs7Z0VBS0EsZ0JBQUE7TUFBQSxBQUFHLGFBQUgsQUFBRzs7V0FDTSxNQURPLEFBQ0QsQUFDYjthQUFTLE1BRlgsQUFBZ0IsQUFFQztBQUZELEFBQ2Q7QUFIVyxDQUFBLEFBQ2IsRUFLQSxvQkFBQTs7QUFBYSxrQ0FDQSxBQUFFO2VBQVMseUJBQVQsQUFBUyxBQUFhLEFBQVk7QUFEcEMsQUFFWDtBQUZXLG9DQUVDLEFBQUU7ZUFBQSxBQUFTLEFBQWU7QUFGeEMsQUFBYTtBQUFBLEFBQ1g7QUFQVyxHQUFmLEFBQWUsQUFVYiIsImZpbGUiOiJCbG9ncy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==