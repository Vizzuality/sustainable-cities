'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('next/node_modules/babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _routes = require('../../routes');

var _reactRedux = require('react-redux');

var _auth = require('../../modules/auth');

var _LogoApp = require('./LogoApp');

var _LogoApp2 = _interopRequireDefault(_LogoApp);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _SignUp = require('./SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/MobileHeader.js';

// modules


// components


var SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];

var MobileHeader = function (_React$Component) {
  (0, _inherits3.default)(MobileHeader, _React$Component);

  function MobileHeader() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MobileHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MobileHeader.__proto__ || (0, _getPrototypeOf2.default)(MobileHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      modal: {
        login: {
          open: false
        },
        signup: {
          open: false
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MobileHeader, [{
    key: 'onSignUp',
    value: function onSignUp() {
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, {
          login: { open: false },
          signup: { open: true }
        })
      });
    }
  }, {
    key: 'onLogin',
    value: function onLogin() {
      this.hideModals('login');
      this.toggleMenu();
    }
  }, {
    key: 'onLogout',
    value: function onLogout(e) {
      if (e) e.preventDefault();
      this.props.logout();
      this.toggleMenu();
    }
  }, {
    key: 'toggleMenu',
    value: function toggleMenu() {
      this.setState({
        open: !this.state.open
      });
    }
  }, {
    key: 'showSignUp',
    value: function showSignUp() {
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, {
          signup: { open: true }
        })
      });
    }
  }, {
    key: 'showLogin',
    value: function showLogin(e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, {
          login: { open: true }
        })
      });
    }
  }, {
    key: 'hideModals',
    value: function hideModals(name) {
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, (0, _defineProperty3.default)({}, name, { open: false }))
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          route = _props.route,
          token = _props.token,
          profile = _props.profile;
      var _state = this.state,
          modal = _state.modal,
          open = _state.open;

      var _ref2 = profile || {},
          name = _ref2.name;

      var mobileHeaderClass = (0, _classnames2.default)('c-mobile-header', {
        '-open': open
      });

      return _react2.default.createElement('div', { className: mobileHeaderClass, __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, _react2.default.createElement('div', { className: 'column small-12', __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, _react2.default.createElement('div', { className: 'nav-container', __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, _react2.default.createElement(_LogoApp2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }), !open ? _react2.default.createElement('button', { className: 'hamburguer', onClick: function onClick() {
          return _this2.toggleMenu();
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 105
        }
      }, _react2.default.createElement('span', { className: 'ingredient', __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }), _react2.default.createElement('span', { className: 'ingredient', __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }), _react2.default.createElement('span', { className: 'ingredient', __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      })) : _react2.default.createElement('button', { className: 'cross', onClick: function onClick() {
          return _this2.toggleMenu();
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement('svg', { className: 'icon icon-close', __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-close', __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }))), _react2.default.createElement('div', { className: 'slider', __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, _react2.default.createElement('nav', { className: 'nav', __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, _react2.default.createElement('ul', { className: 'nav-list', role: 'menubar', __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'city-support' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 117
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'city-support', __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, 'City support'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'events' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'events', __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, 'Events'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'about' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'about', __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 134
        }
      }, 'About FSCI'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': SOLUTION_MAP_ROUTES.indexOf(route) !== -1 }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 136
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'explore-index', __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, 'Explore'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'builder' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'builder', __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 146
        }
      }, 'Design'))))))))), modal.login.open && _react2.default.createElement(_Modal2.default, {
        open: modal.login.open,
        toggleModal: function toggleModal(v) {
          return _this2.setState({ modal: (0, _extends3.default)({}, modal, {
              login: { open: v }
            }) });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }, _react2.default.createElement(_Login2.default, {
        onClose: function onClose() {
          return _this2.hideModals('login');
        },
        onSignUp: function onSignUp() {
          return _this2.onSignUp();
        },
        onLogin: function onLogin() {
          return _this2.onLogin();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 187
        }
      })), modal.signup.open && _react2.default.createElement(_Modal2.default, {
        open: modal.signup.open,
        toggleModal: function toggleModal(v) {
          return _this2.setState({ modal: (0, _extends3.default)({}, modal, {
              signup: { open: v }
            }) });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 194
        }
      }, _react2.default.createElement(_SignUp2.default, {
        onClose: function onClose() {
          return _this2.hideModals('signup');
        },
        onLogin: function onLogin() {
          return _this2.showLogin();
        },
        onSignUp: function onSignUp() {
          return _this2.hideModals('signup');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 201
        }
      })));
    }
  }]);

  return MobileHeader;
}(_react2.default.Component);

MobileHeader.propTypes = {
  route: _propTypes2.default.string.isRequired,
  logout: _propTypes2.default.func.isRequired,
  token: _propTypes2.default.string,
  profile: _propTypes2.default.object
};

MobileHeader.defaultProps = {
  profile: {}
};

exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    token: state.auth.token,
    profile: state.auth.profile
  };
}, function (dispatch) {
  return {
    logout: function logout() {
      dispatch((0, _auth.logout)());
    }
  };
})(MobileHeader);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL01vYmlsZUhlYWRlci5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIlByb3BUeXBlcyIsImNsYXNzbmFtZXMiLCJMaW5rIiwiY29ubmVjdCIsImxvZ291dCIsIkxvZ29BcHAiLCJNb2RhbCIsIkxvZ2luIiwiU2lnblVwIiwiU09MVVRJT05fTUFQX1JPVVRFUyIsIk1vYmlsZUhlYWRlciIsInN0YXRlIiwibW9kYWwiLCJsb2dpbiIsIm9wZW4iLCJzaWdudXAiLCJzZXRTdGF0ZSIsImhpZGVNb2RhbHMiLCJ0b2dnbGVNZW51IiwiZSIsInByZXZlbnREZWZhdWx0IiwicHJvcHMiLCJzdG9wUHJvcGFnYXRpb24iLCJuYW1lIiwicm91dGUiLCJ0b2tlbiIsInByb2ZpbGUiLCJtb2JpbGVIZWFkZXJDbGFzcyIsImluZGV4T2YiLCJ2Iiwib25TaWduVXAiLCJvbkxvZ2luIiwic2hvd0xvZ2luIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwic3RyaW5nIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJvYmplY3QiLCJkZWZhdWx0UHJvcHMiLCJhdXRoIiwiZGlzcGF0Y2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQVM7O0FBR1QsQUFBUzs7QUFHVCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7OztBQVBQOzs7QUFHQTs7O0FBTUEsSUFBTSxzQkFBc0IsQ0FBQSxBQUFDLGlCQUFELEFBQWtCLG1CQUFsQixBQUFxQyxjQUFqRSxBQUE0QixBQUFtRDs7SUFFekUsQTs7Ozs7Ozs7Ozs7Ozs7d04sQUFDSjs7O2dCQUNTLEFBQ0UsQUFDQyxBQUVSO0FBSE8sQUFDTDs7Z0IsQUFIRSxBQUNDLEFBSUcsQUFDQTtBQURBLEFBQ047QUFMRyxBQUNMO0FBRkksQUFDTjs7Ozs7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TUFBQSxBQUFNLE9BRFEsQUFDRCxBQUNuQjtxQkFBYSx3QkFBQTt3QkFBSyxBQUFLLFdBQVcsa0NBQUEsQUFDN0I7c0JBQ0ssRUFBRSxNQUZDLEFBQUssQUFBYyxBQUFFLEFBRXhCLEFBQVE7QUFBaEIsY0FGOEIsRUFBZDtBQUZFOztvQkFBQTtzQkFBQSxBQU9wQjtBQVBvQjtBQUNwQixPQURvQixrQkFPcEIsQUFBQztpQkFDVSxtQkFBQTtpQkFBTSxPQUFBLEFBQUssV0FBWCxBQUFNLEFBQWdCO0FBRGpDLEFBRUU7aUJBQVMsbUJBQUE7aUJBQU0sT0FBTixBQUFNLEFBQUs7QUFGdEIsQUFHRTtrQkFBVSxvQkFBQTtpQkFBTSxPQUFBLEFBQUssV0FBWCxBQUFNLEFBQWdCO0FBSGxDOztvQkFBQTtzQkF4R04sQUFDRSxBQWdHd0IsQUFPcEIsQUFTUDtBQVRPO0FBQ0U7Ozs7O0VBeExlLGdCQUFNLEE7O0FBbU1qQyxhQUFBLEFBQWE7U0FDSixvQkFBQSxBQUFVLE9BRE0sQUFDQyxBQUN4QjtVQUFRLG9CQUFBLEFBQVUsS0FGSyxBQUVBLEFBQ3ZCO1NBQU8sb0JBSGdCLEFBR04sQUFDakI7V0FBUyxvQkFKWCxBQUF5QixBQUlKO0FBSkksQUFDdkI7O0FBTUYsYUFBQSxBQUFhO1dBQWIsQUFBNEIsQUFDakIsQUFHWDtBQUo0QixBQUMxQjs7MkNBSUEsaUJBQUE7O1dBQ1MsTUFBQSxBQUFNLEtBREwsQUFDVSxBQUNsQjthQUFTLE1BQUEsQUFBTSxLQUZqQixBQUFVLEFBRVk7QUFGWixBQUNSO0FBRlcsQ0FBQSxFQUtiLG9CQUFBOztBQUFhLDhCQUNGLEFBQUU7ZUFBQSxBQUFTLEFBQVk7QUFEbEMsQUFBYTtBQUFBLEFBQ1g7QUFOVyxHQUFmLEFBQWUsQUFRYiIsImZpbGUiOiJNb2JpbGVIZWFkZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=