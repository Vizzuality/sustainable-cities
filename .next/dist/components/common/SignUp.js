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

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/SignUp.js';


var SignUp = function (_React$Component) {
  (0, _inherits3.default)(SignUp, _React$Component);

  function SignUp() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SignUp);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SignUp.__proto__ || (0, _getPrototypeOf2.default)(SignUp)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      name: "",
      nickname: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    }, _this.defaultProps = {
      onLogin: function onLogin() {}
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SignUp, [{
    key: 'onSignUpClick',
    value: function onSignUpClick() {
      var _this2 = this;

      this.props.register(this.state.name, this.state.nickname, this.state.email, this.state.password, this.state.passwordConfirmation).then(function (success) {
        if (success) {
          _this2.props.onSignUp();
        }
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.clearErrors();
    }
  }, {
    key: 'onChange',
    value: function onChange(field, value) {
      this.setState((0, _defineProperty3.default)({}, field, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('section', { className: 'builder-help', __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, _react2.default.createElement('h1', { className: 'c-title -fw-thin -fs-huge', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, 'Sign up'), this.props.signupErrors.map(function (error, i) {
        return _react2.default.createElement('p', { key: i, __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          }
        }, error.title);
      }), _react2.default.createElement('input', {
        className: 'u-block u-w-100 u-mt-1 input-text',
        placeholder: 'Name',
        onChange: function onChange(e) {
          return _this3.onChange('name', e.target.value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }), _react2.default.createElement('input', {
        className: 'u-block u-w-100 u-mt-1 input-text',
        placeholder: 'Nickname',
        onChange: function onChange(e) {
          return _this3.onChange('nickname', e.target.value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      }), _react2.default.createElement('input', {
        className: 'u-block u-w-100 u-mt-1 input-text',
        placeholder: 'Email',
        onChange: function onChange(e) {
          return _this3.onChange('email', e.target.value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }), _react2.default.createElement('input', {
        className: 'u-block u-w-100 u-mt-1 input-text',
        type: 'password',
        placeholder: 'Password (minimum 8 characters)',
        onChange: function onChange(e) {
          return _this3.onChange('password', e.target.value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }), _react2.default.createElement('input', {
        className: 'u-block u-w-100 u-mt-1 input-text',
        type: 'password',
        placeholder: 'Repeat password',
        onChange: function onChange(e) {
          return _this3.onChange('passwordConfirmation', e.target.value);
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        }
      }), _react2.default.createElement('div', { className: 'actions', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, _react2.default.createElement(_Button2.default, { secondary: true, onClick: this.props.onLogin, __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, 'Login'), _react2.default.createElement(_Button2.default, { primary: true, onClick: function onClick() {
          return _this3.onSignUpClick();
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 88
        }
      }, 'Sign up')));
    }
  }]);

  return SignUp;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
  return state.auth;
}, {
  register: _auth.register,
  clearErrors: _auth.clearErrors
})(SignUp);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL1NpZ25VcC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsImNvbm5lY3QiLCJCdXR0b24iLCJyZWdpc3RlciIsImNsZWFyRXJyb3JzIiwiU2lnblVwIiwic3RhdGUiLCJuYW1lIiwibmlja25hbWUiLCJlbWFpbCIsInBhc3N3b3JkIiwicGFzc3dvcmRDb25maXJtYXRpb24iLCJkZWZhdWx0UHJvcHMiLCJvbkxvZ2luIiwicHJvcHMiLCJ0aGVuIiwic3VjY2VzcyIsIm9uU2lnblVwIiwiZmllbGQiLCJ2YWx1ZSIsInNldFN0YXRlIiwic2lnbnVwRXJyb3JzIiwibWFwIiwiZXJyb3IiLCJpIiwidGl0bGUiLCJlIiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJvblNpZ25VcENsaWNrIiwiQ29tcG9uZW50IiwiYXV0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQVM7O0FBRVQsQUFBTzs7OztBQUVQLEFBQVMsQUFBVTs7Ozs7OztJLEFBR2I7Ozs7Ozs7Ozs7Ozs7OzRNLEFBQ0o7WUFBUSxBQUNBLEFBQ047Z0JBRk0sQUFFSSxBQUNWO2FBSE0sQUFHQyxBQUNQO2dCQUpNLEFBSUksQUFDVjs0QixBQUxNLEFBS2dCO0FBTGhCLEFBQ04sYSxBQU9GO2VBQ1csbUJBQU0sQUFBRSxDQURKLEE7QUFBQSxBQUNiOzs7OztvQ0FHYzttQkFDZDs7V0FBQSxBQUFLLE1BQUwsQUFDRSxTQUNFLEtBQUEsQUFBSyxNQUZULEFBRWUsTUFDWCxLQUFBLEFBQUssTUFIVCxBQUdlLFVBQ1gsS0FBQSxBQUFLLE1BSlQsQUFJZSxPQUNYLEtBQUEsQUFBSyxNQUxULEFBS2UsVUFDWCxLQUFBLEFBQUssTUFOVCxBQU1lLHNCQU5mLEFBUUUsS0FBSyxtQkFBVyxBQUNkO1lBQUEsQUFBSSxTQUFTLEFBQ1g7aUJBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjtBQUNGO0FBWkgsQUFjRDs7Ozt5Q0FFb0IsQUFDbkI7V0FBQSxBQUFLLE1BQUwsQUFBVyxBQUNaOzs7OzZCQUVRLEEsT0FBTyxBLE9BQU8sQUFDckI7V0FBQSxBQUFLLDJDQUFMLEFBQWlCLE9BQWpCLEFBQXlCLEFBQzFCOzs7OzZCQUVRO21CQUNQOzs2QkFDRSxjQUFBLGFBQVMsV0FBVCxBQUFtQjtvQkFBbkI7c0JBQUEsQUFDRTtBQURGO09BQUEsa0JBQ0UsY0FBQSxRQUFJLFdBQUosQUFBYztvQkFBZDtzQkFBQTtBQUFBO1NBREYsQUFDRSxBQUVDLGlCQUFBLEFBQUssTUFBTCxBQUFXLGFBQVgsQUFBd0IsSUFBSSxVQUFBLEFBQUMsT0FBRCxBQUFRLEdBQVI7K0JBQWMsY0FBQSxPQUFHLEtBQUgsQUFBUTtzQkFBUjt3QkFBQSxBQUFZO0FBQVo7U0FBQSxRQUFkLEFBQWMsQUFBa0I7QUFIL0QsQUFHRyxBQUVEO21CQUFBLEFBQ1ksQUFDVjtxQkFGRixBQUVjLEFBQ1o7a0JBQVUsa0JBQUEsQUFBQyxHQUFEO2lCQUFPLE9BQUEsQUFBSyxTQUFMLEFBQWMsUUFBUSxFQUFBLEFBQUUsT0FBL0IsQUFBTyxBQUErQjtBQUhsRDs7b0JBQUE7c0JBTEYsQUFLRSxBQU1BO0FBTkE7QUFDRTttQkFLRixBQUNZLEFBQ1Y7cUJBRkYsQUFFYyxBQUNaO2tCQUFVLGtCQUFBLEFBQUMsR0FBRDtpQkFBTyxPQUFBLEFBQUssU0FBTCxBQUFjLFlBQVksRUFBQSxBQUFFLE9BQW5DLEFBQU8sQUFBbUM7QUFIdEQ7O29CQUFBO3NCQVhGLEFBV0UsQUFNQTtBQU5BO0FBQ0U7bUJBS0YsQUFDWSxBQUNWO3FCQUZGLEFBRWMsQUFDWjtrQkFBVSxrQkFBQSxBQUFDLEdBQUQ7aUJBQU8sT0FBQSxBQUFLLFNBQUwsQUFBYyxTQUFTLEVBQUEsQUFBRSxPQUFoQyxBQUFPLEFBQWdDO0FBSG5EOztvQkFBQTtzQkFqQkYsQUFpQkUsQUFNQTtBQU5BO0FBQ0U7bUJBS0YsQUFDWSxBQUNWO2NBRkYsQUFFTyxBQUNMO3FCQUhGLEFBR2MsQUFDWjtrQkFBVSxrQkFBQSxBQUFDLEdBQUQ7aUJBQU8sT0FBQSxBQUFLLFNBQUwsQUFBYyxZQUFZLEVBQUEsQUFBRSxPQUFuQyxBQUFPLEFBQW1DO0FBSnREOztvQkFBQTtzQkF2QkYsQUF1QkUsQUFPQTtBQVBBO0FBQ0U7bUJBTUYsQUFDWSxBQUNWO2NBRkYsQUFFTyxBQUNMO3FCQUhGLEFBR2MsQUFDWjtrQkFBVSxrQkFBQSxBQUFDLEdBQUQ7aUJBQU8sT0FBQSxBQUFLLFNBQUwsQUFBYyx3QkFBd0IsRUFBQSxBQUFFLE9BQS9DLEFBQU8sQUFBK0M7QUFKbEU7O29CQUFBO3NCQTlCRixBQThCRSxBQU9BO0FBUEE7QUFDRSwwQkFNRixjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjt5QkFDRSxBQUFDLGtDQUFPLFdBQVIsTUFBa0IsU0FBUyxLQUFBLEFBQUssTUFBaEMsQUFBc0M7b0JBQXRDO3NCQUFBO0FBQUE7U0FERixBQUNFLEFBQ0EsMEJBQUEsQUFBQyxrQ0FBTyxTQUFSLE1BQWdCLFNBQVMsbUJBQUE7aUJBQU0sT0FBTixBQUFNLEFBQUs7QUFBcEM7b0JBQUE7c0JBQUE7QUFBQTtTQXhDTixBQUNFLEFBcUNFLEFBRUUsQUFJUDs7Ozs7RUFuRmtCLGdCQUFNLEEsQUFzRjNCOzsyQ0FDRSxpQkFBQTtTQUFTLE1BQVQsQUFBZTtBQURGLENBQUE7QUFFYixBQUVFO0FBSlcsQUFFYjtBQUFBLEFBQ0UsR0FISixBQUFlLEFBTWIiLCJmaWxlIjoiU2lnblVwLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9