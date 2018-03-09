'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _head = require('next/dist/lib/head.js');

var _head2 = _interopRequireDefault(_head);

var _index = require('../../css/index.scss');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/layout/head.js';


var Head = function (_React$Component) {
  (0, _inherits3.default)(Head, _React$Component);

  function Head() {
    (0, _classCallCheck3.default)(this, Head);

    return (0, _possibleConstructorReturn3.default)(this, (Head.__proto__ || (0, _getPrototypeOf2.default)(Head)).apply(this, arguments));
  }

  (0, _createClass3.default)(Head, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          description = _props.description;

      return _react2.default.createElement(_head2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      }, _react2.default.createElement('title', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        }
      }, title, ' | Sustainable Cities'), _react2.default.createElement('meta', { name: 'description', content: description, __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }), _react2.default.createElement('meta', { name: 'author', content: 'Vizzuality', __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }), _react2.default.createElement('link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/static/apple-touch-icon.png', __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }), _react2.default.createElement('link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/static/favicon-32x32.png', __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }), _react2.default.createElement('link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/static/favicon-16x16.png', __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      }), _react2.default.createElement('link', { rel: 'manifest', href: '/static/manifest.json', __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        }
      }), _react2.default.createElement('link', { rel: 'mask-icon', href: '/static/safari-pinned-tab.svg', color: '#28bcd4', __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }), _react2.default.createElement('meta', { name: 'theme-color', content: '#ffffff', __source: {
          fileName: _jsxFileName,
          lineNumber: 26
        }
      }), Head.getStyles());
    }
  }], [{
    key: 'getStyles',
    value: function getStyles() {
      return _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: _index2.default }, __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        }
      });
    }
  }]);

  return Head;
}(_react2.default.Component);

exports.default = Head;


Head.propTypes = {
  title: _propTypes2.default.string.isRequired,
  description: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbGF5b3V0L2hlYWQuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJIZWFkTmV4dCIsInN0eWxlcyIsIkhlYWQiLCJwcm9wcyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJnZXRTdHlsZXMiLCJfX2h0bWwiLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7Ozs7SUFFYyxBOzs7Ozs7Ozs7Ozs2QkFNVjttQkFDd0IsS0FEeEIsQUFDNkI7VUFEN0IsQUFDQyxlQURELEFBQ0M7VUFERCxBQUNRLHFCQURSLEFBQ1EsQUFFZjs7NkJBQ0UsQUFBQzs7b0JBQUQ7c0JBQUEsQUFDRTtBQURGO0FBQUEsT0FBQSxrQkFDRSxjQUFBOztvQkFBQTtzQkFBQSxBQUFRO0FBQVI7QUFBQSxTQUFBLE9BREYsQUFDRSxBQUNBLGtFQUFNLE1BQU4sQUFBVyxlQUFjLFNBQXpCLEFBQWtDO29CQUFsQztzQkFGRixBQUVFLEFBQ0E7QUFEQTtrREFDTSxNQUFOLEFBQVcsWUFBVyxTQUF0QixBQUE4QjtvQkFBOUI7c0JBSEYsQUFHRSxBQUNBO0FBREE7a0RBQ00sTUFBTixBQUFXLFVBQVMsU0FBcEIsQUFBNEI7b0JBQTVCO3NCQUpGLEFBSUUsQUFDQTtBQURBO2tEQUNNLEtBQU4sQUFBVSxvQkFBbUIsT0FBN0IsQUFBbUMsV0FBVSxNQUE3QyxBQUFrRDtvQkFBbEQ7c0JBTEYsQUFLRSxBQUNBO0FBREE7a0RBQ00sS0FBTixBQUFVLFFBQU8sTUFBakIsQUFBc0IsYUFBWSxPQUFsQyxBQUF3QyxTQUFRLE1BQWhELEFBQXFEO29CQUFyRDtzQkFORixBQU1FLEFBQ0E7QUFEQTtrREFDTSxLQUFOLEFBQVUsUUFBTyxNQUFqQixBQUFzQixhQUFZLE9BQWxDLEFBQXdDLFNBQVEsTUFBaEQsQUFBcUQ7b0JBQXJEO3NCQVBGLEFBT0UsQUFDQTtBQURBO2tEQUNNLEtBQU4sQUFBVSxZQUFXLE1BQXJCLEFBQTBCO29CQUExQjtzQkFSRixBQVFFLEFBQ0E7QUFEQTtrREFDTSxLQUFOLEFBQVUsYUFBWSxNQUF0QixBQUEyQixpQ0FBZ0MsT0FBM0QsQUFBaUU7b0JBQWpFO3NCQVRGLEFBU0UsQUFDQTtBQURBO2tEQUNNLE1BQU4sQUFBVyxlQUFjLFNBQXpCLEFBQWlDO29CQUFqQztzQkFWRixBQVVFLEFBQ0M7QUFERDtlQVhKLEFBQ0UsQUFXRyxBQUFLLEFBS1g7Ozs7Z0NBeEJrQixBQUNqQjtzREFBYyx5QkFBeUIsRUFBaEMsQUFBZ0MsQUFBRSxBQUFRO29CQUExQztzQkFBUCxBQUFPLEFBQ1I7QUFEUTtPQUFBOzs7OztFQUh1QixnQkFBTSxBOztrQkFBbkIsQTs7O0FBOEJyQixLQUFBLEFBQUs7U0FDSSxvQkFBQSxBQUFVLE9BREYsQUFDUyxBQUN4QjtlQUFhLG9CQUFBLEFBQVUsT0FGekIsQUFBaUIsQUFFZTtBQUZmLEFBQ2YiLCJmaWxlIjoiaGVhZC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==