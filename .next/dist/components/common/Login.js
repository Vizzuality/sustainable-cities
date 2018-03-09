'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _reactRedux = require('react-redux');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _auth = require('../../modules/auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/Login.js';


var Login = function (_React$Component) {
  (0, _inherits3.default)(Login, _React$Component);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      email: "",
      password: ""
    }, _this.defaultProps = {
      onLogin: function onLogin() {}
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Login, [{
    key: 'onLoginClick',
    value: function onLoginClick() {
      var _this2 = this;

      this.props.login(this.state.email, this.state.password).then(function (success) {
        if (success) {
          _this2.props.onLogin();
        }
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(field, value) {
      this.setState((0, _defineProperty3.default)({}, field, value));
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.clearErrors();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('section', { className: 'builder-help', __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, _react2.default.createElement('h1', { className: 'c-title -fw-thin -fs-huge', __source: {
          fileName: _jsxFileName,
          lineNumber: 42
        }
      }, 'Login'), this.props.errors.map(function (error, i) {
        return _react2.default.createElement('p', { key: i, __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        }, error.title);
      }), _react2.default.createElement('input', { className: 'u-block u-w-100 input-text', placeholder: 'Email', onChange: function onChange(e) {
          return _this3.onChange('email', e.target.value);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }), _react2.default.createElement('input', { className: 'u-block u-w-100 u-mt-1 input-text', type: 'password', placeholder: 'Password', onChange: function onChange(e) {
          return _this3.onChange('password', e.target.value);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }), _react2.default.createElement('div', { className: 'actions', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, _react2.default.createElement(_Button2.default, { secondary: true, onClick: this.props.onSignUp, __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, 'Sign up'), _react2.default.createElement(_Button2.default, { primary: true, onClick: function onClick() {
          return _this3.onLoginClick();
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, 'Login')));
    }
  }]);

  return Login;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return state.auth;
}, {
  clearErrors: _auth.clearErrors,
  login: _auth.login
})(Login);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL0xvZ2luLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiY29ubmVjdCIsIkJ1dHRvbiIsImNsZWFyRXJyb3JzIiwibG9naW4iLCJMb2dpbiIsInN0YXRlIiwiZW1haWwiLCJwYXNzd29yZCIsImRlZmF1bHRQcm9wcyIsIm9uTG9naW4iLCJwcm9wcyIsInRoZW4iLCJzdWNjZXNzIiwiZmllbGQiLCJ2YWx1ZSIsInNldFN0YXRlIiwiZXJyb3JzIiwibWFwIiwiZXJyb3IiLCJpIiwidGl0bGUiLCJlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJvblNpZ25VcCIsIm9uTG9naW5DbGljayIsIkNvbXBvbmVudCIsImF1dGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFTOztBQUVULEFBQU87Ozs7QUFFUCxBQUFTLEFBQWE7Ozs7Ozs7SUFHaEIsQTs7Ozs7Ozs7Ozs7Ozs7ME0sQUFDSjthQUFRLEFBQ0MsQUFDUDtnQkFGTSxBQUVJLEE7QUFGSixBQUNOLGFBSUYsQTtlQUNXLG1CQUFNLEFBQUUsQ0FESixBO0FBQUEsQUFDYjs7Ozs7bUNBR2E7bUJBQ2I7O1dBQUEsQUFBSyxNQUFMLEFBQ0UsTUFBTSxLQUFBLEFBQUssTUFEYixBQUNtQixPQUFPLEtBQUEsQUFBSyxNQUQvQixBQUNxQyxVQURyQyxBQUVFLEtBQUssbUJBQVcsQUFDZDtZQUFBLEFBQUksU0FBUyxBQUNYO2lCQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7QUFDRjtBQU5ILEFBUUQ7Ozs7NkJBRVEsQSxPQUFPLEEsT0FBTyxBQUNyQjtXQUFBLEFBQUssMkNBQUwsQUFBaUIsT0FBakIsQUFBeUIsQUFDMUI7Ozs7eUNBRW9CLEFBQ25CO1dBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjs7Ozs2QkFFUTttQkFDUDs7NkJBRUUsY0FBQSxhQUFTLFdBQVQsQUFBbUI7b0JBQW5CO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUEsUUFBSSxXQUFKLEFBQWM7b0JBQWQ7c0JBQUE7QUFBQTtTQURGLEFBQ0UsQUFFQyxlQUFBLEFBQUssTUFBTCxBQUFXLE9BQVgsQUFBa0IsSUFBSSxVQUFBLEFBQUMsT0FBRCxBQUFRLEdBQVI7K0JBQWMsY0FBQSxPQUFHLEtBQUgsQUFBUTtzQkFBUjt3QkFBQSxBQUFZO0FBQVo7U0FBQSxRQUFkLEFBQWMsQUFBa0I7QUFIekQsQUFHRyxBQUVELG1EQUFPLFdBQVAsQUFBaUIsOEJBQTZCLGFBQTlDLEFBQTBELFNBQVEsVUFBVSxrQkFBQSxBQUFDLEdBQUQ7aUJBQU8sT0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFTLEVBQUEsQUFBRSxPQUFoQyxBQUFPLEFBQWdDO0FBQW5IO29CQUFBO3NCQUxGLEFBS0UsQUFFQTtBQUZBO21EQUVPLFdBQVAsQUFBaUIscUNBQW9DLE1BQXJELEFBQTBELFlBQVcsYUFBckUsQUFBaUYsWUFBVyxVQUFVLGtCQUFBLEFBQUMsR0FBRDtpQkFBTyxPQUFBLEFBQUssU0FBTCxBQUFjLFlBQVksRUFBQSxBQUFFLE9BQW5DLEFBQU8sQUFBbUM7QUFBaEo7b0JBQUE7c0JBUEYsQUFPRSxBQUVBO0FBRkE7MEJBRUEsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsQUFBQyxrQ0FBTyxXQUFSLE1BQWtCLFNBQVMsS0FBQSxBQUFLLE1BQWhDLEFBQXNDO29CQUF0QztzQkFBQTtBQUFBO1NBREYsQUFDRSxBQUNBLDRCQUFBLEFBQUMsa0NBQU8sU0FBUixNQUFnQixTQUFTLG1CQUFBO2lCQUFNLE9BQU4sQUFBTSxBQUFLO0FBQXBDO29CQUFBO3NCQUFBO0FBQUE7U0FiTixBQUVFLEFBU0UsQUFFRSxBQUlQOzs7OztFQS9DaUIsZ0IsQUFBTSxBQWtEMUI7OzJDQUNFLGlCQUFBO1NBQVMsTUFBVCxBQUFlO0FBREYsQ0FBQTtBQUViLEFBRUU7QUFKVyxBQUViO0FBQUEsQUFDRSxHQUhKLEFBQWUsQUFNYiIsImZpbGUiOiJMb2dpbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==