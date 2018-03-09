'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('next/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _routes = require('../routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function (_React$Component) {
  (0, _inherits3.default)(Page, _React$Component);

  function Page() {
    (0, _classCallCheck3.default)(this, Page);

    return (0, _possibleConstructorReturn3.default)(this, (Page.__proto__ || (0, _getPrototypeOf2.default)(Page)).apply(this, arguments));
  }

  (0, _createClass3.default)(Page, null, [{
    key: 'getInitialProps',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
        var pathname = _ref.pathname,
            query = _ref.query,
            isServer = _ref.isServer,
            asPath = _ref.asPath;
        var route, parseParams;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                route = _routes2.default.routes.find(function (r) {
                  return r.page === pathname;
                });
                parseParams = {};

                // next doesn't evaluates null values, so we have to do it manually

                (0, _keys2.default)(query).forEach(function (k) {
                  parseParams[k] = query[k] === 'null' ? null : query[k];
                });

                return _context.abrupt('return', {
                  queryParams: (0, _extends3.default)({
                    route: route ? route.name : ''
                  }, parseParams),
                  url: {
                    pathname: asPath
                  },
                  isServer: isServer
                });

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return Page;
}(_react2.default.Component);

exports.default = Page;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL1BhZ2UuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJyb3V0ZXMiLCJQYWdlIiwicGF0aG5hbWUiLCJxdWVyeSIsImlzU2VydmVyIiwiYXNQYXRoIiwicm91dGUiLCJmaW5kIiwiciIsInBhZ2UiLCJwYXJzZVBhcmFtcyIsImZvckVhY2giLCJrIiwicXVlcnlQYXJhbXMiLCJuYW1lIiwidXJsIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7OztJQUVjLEE7Ozs7Ozs7Ozs7Ozs7WUFDWSxBLGdCQUFBLEE7WUFBVSxBLGFBQUEsQTtZQUFPLEEsZ0JBQUEsQTtZQUFVLEEsY0FBQSxBOzs7OzttQkFDbEQ7QSx5Q0FBUSxBQUFPLE9BQVAsQUFBYyxLQUFLLGFBQUE7eUJBQUssRUFBQSxBQUFFLFNBQVAsQUFBZ0I7QUFBbkMsQSxBQUVSLGlCQUZRO0EsOEJBRU0sQSxBQUVwQjs7QUFDQTs7b0NBQUEsQUFBWSxPQUFaLEFBQW1CLFFBQVEsVUFBQSxBQUFDLEdBQU0sQUFDaEM7OEJBQUEsQUFBWSxLQUFLLE1BQUEsQUFBTSxPQUFOLEFBQWEsU0FBYixBQUFzQixPQUFPLE1BQTlDLEFBQThDLEFBQU0sQUFDckQ7QUFGRDs7OzsyQkFNVyxRQUFRLE1BQVIsQUFBYyxPQUR2QixBQUM4QjtBQUE1QixxQkFGRyxBQUNMLEFBRUssQUFFTDs7OEJBTEssQUFLQSxBQUNPLEFBRVo7QUFISyxBQUNIOzRCQU5HLEE7QUFBQSxBQUNMOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBWjRCLGdCQUFNLEE7O2tCQUFuQixBIiwiZmlsZSI6IlBhZ2UuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=