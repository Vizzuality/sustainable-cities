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

var _reactTether = require('react-tether');

var _reactTether2 = _interopRequireDefault(_reactTether);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _auth = require('../../modules/auth');

var _LogoApp = require('./LogoApp');

var _LogoApp2 = _interopRequireDefault(_LogoApp);

var _SubMenu = require('./SubMenu');

var _SubMenu2 = _interopRequireDefault(_SubMenu);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _SignUp = require('./SignUp');

var _SignUp2 = _interopRequireDefault(_SignUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/MainNav.js';

// modules


// components


var SOLUTION_MAP_ROUTES = ['explore-index', 'solution-detail', 'bme-detail', 'city-detail'];

var MainNav = function (_React$Component) {
  (0, _inherits3.default)(MainNav, _React$Component);

  function MainNav() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MainNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MainNav.__proto__ || (0, _getPrototypeOf2.default)(MainNav)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      section: '',
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

  (0, _createClass3.default)(MainNav, [{
    key: 'onSelectSection',
    value: function onSelectSection(e, section) {
      if (e) e.preventDefault();
      var currentSection = this.state.section;
      if (currentSection === section) return;

      this.setState({
        section: section
      });
    }
  }, {
    key: 'onCloseSubMenu',
    value: function onCloseSubMenu() {
      this.setState({
        section: ''
      });
    }
  }, {
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
    key: 'hideModals',
    value: function hideModals(name) {
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, (0, _defineProperty3.default)({}, name, { open: false }))
      });
    }
  }, {
    key: 'showLogin',
    value: function showLogin(e) {
      e.stopPropagation();
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, {
          login: { open: true },
          signup: { open: false }
        }),
        section: ''
      });
    }
  }, {
    key: 'showSignUp',
    value: function showSignUp() {
      this.setState({
        modal: (0, _extends3.default)({}, this.state.modal, {
          signup: { open: true }
        }),
        section: ''
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
      var section = this.state.section;

      var _ref2 = profile || {},
          name = _ref2.name;

      var toolsMenu = [{ id: (0, _v2.default)(), label: 'Explore', route: 'explore-index' }, { id: (0, _v2.default)(), label: 'Design', route: 'builder' }];

      var profileSubmenu = [{ id: (0, _v2.default)(), label: 'See profile' }, { id: (0, _v2.default)(), label: 'Log out', onClick: function onClick() {
          _this2.props.logout();
        } }];

      return _react2.default.createElement('div', { className: 'c-main-nav', __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 110
        }
      }, _react2.default.createElement('div', { className: 'column small-12', __source: {
          fileName: _jsxFileName,
          lineNumber: 111
        }
      }, _react2.default.createElement('div', { className: 'nav-container', __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, _react2.default.createElement(_LogoApp2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }), _react2.default.createElement('nav', { className: 'nav', __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, _react2.default.createElement('ul', { className: 'nav-list', role: 'menubar', __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'city-support' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'city-support', __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, 'City support'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'events' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'events', __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 126
        }
      }, 'Events'))), _react2.default.createElement('li', {
        className: (0, _classnames2.default)('nav-item', { '-current': route === 'about' }),
        role: 'menuitem',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }, _react2.default.createElement(_routes.Link, { prefetch: true, route: 'about', __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, _react2.default.createElement('a', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      }, 'About FSCI'))), _react2.default.createElement(_reactTether2.default, {
        attachment: 'top center',
        targetAttachment: 'top center',
        targetOffset: '-10px 0',
        key: (0, _v2.default)(),
        classPrefix: 'tab-wrap',
        constraints: [{
          to: 'target',
          attachment: 'together'
        }],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 150
        }
      }, _react2.default.createElement('li', {
        ref: function ref(node) {
          _this2.toolsTabNode = node;
        },
        className: (0, _classnames2.default)('nav-item -tool', { '-current': route === 'builder' }),
        role: 'menuitem',
        onClick: function onClick(e) {
          return _this2.onSelectSection(e, 'builder');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }, _react2.default.createElement('a', { href: '/builder', className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        }
      }, 'Tools')), section === 'builder' && _react2.default.createElement(_SubMenu2.default, {
        className: '-tab',
        parent: 'Tools',
        parentNode: this.toolsTabNode,
        items: toolsMenu,
        onCloseSubMenu: function onCloseSubMenu() {
          return _this2.onCloseSubMenu();
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        }
      }))))))), this.state.modal.login.open && _react2.default.createElement(_Modal2.default, {
        open: this.state.modal.login.open,
        toggleModal: function toggleModal(v) {
          return _this2.setState({ modal: (0, _extends3.default)({}, _this2.state.modal, {
              login: { open: v }
            }) });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 223
        }
      }, _react2.default.createElement(_Login2.default, {
        onClose: function onClose() {
          return _this2.hideModals('login');
        },
        onSignUp: function onSignUp() {
          return _this2.onSignUp();
        },
        onLogin: function onLogin() {
          return _this2.hideModals('login');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 230
        }
      })), this.state.modal.signup.open && _react2.default.createElement(_Modal2.default, {
        open: this.state.modal.signup.open,
        toggleModal: function toggleModal(v) {
          return _this2.setState({ modal: (0, _extends3.default)({}, _this2.state.modal, {
              signup: { open: v }
            }) });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 237
        }
      }, _react2.default.createElement(_SignUp2.default, {
        onClose: function onClose() {
          return _this2.hideModals('signup');
        },
        onLogin: function onLogin(e) {
          _this2.showLogin(e);
        },
        onSignUp: function onSignUp() {
          return _this2.hideModals('signup');
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 244
        }
      })));
    }
  }]);

  return MainNav;
}(_react2.default.Component);

MainNav.propTypes = {
  route: _propTypes2.default.string.isRequired,
  logout: _propTypes2.default.func.isRequired,
  token: _propTypes2.default.string,
  profile: _propTypes2.default.object
};

MainNav.defaultProps = {
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
})(MainNav);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL01haW5OYXYuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiTGluayIsImNvbm5lY3QiLCJUZXRoZXJDb21wb25lbnQiLCJ1dWlkdjEiLCJsb2dvdXQiLCJMb2dvQXBwIiwiU3ViTWVudSIsIk1vZGFsIiwiTG9naW4iLCJTaWduVXAiLCJTT0xVVElPTl9NQVBfUk9VVEVTIiwiTWFpbk5hdiIsInN0YXRlIiwic2VjdGlvbiIsIm1vZGFsIiwibG9naW4iLCJvcGVuIiwic2lnbnVwIiwiZSIsInByZXZlbnREZWZhdWx0IiwiY3VycmVudFNlY3Rpb24iLCJzZXRTdGF0ZSIsIm5hbWUiLCJzdG9wUHJvcGFnYXRpb24iLCJwcm9wcyIsInJvdXRlIiwidG9rZW4iLCJwcm9maWxlIiwidG9vbHNNZW51IiwiaWQiLCJsYWJlbCIsInByb2ZpbGVTdWJtZW51Iiwib25DbGljayIsInRvIiwiYXR0YWNobWVudCIsIm5vZGUiLCJ0b29sc1RhYk5vZGUiLCJvblNlbGVjdFNlY3Rpb24iLCJvbkNsb3NlU3ViTWVudSIsInYiLCJoaWRlTW9kYWxzIiwib25TaWduVXAiLCJzaG93TG9naW4iLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIiwiZnVuYyIsIm9iamVjdCIsImRlZmF1bHRQcm9wcyIsImF1dGgiLCJkaXNwYXRjaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBUzs7QUFDVCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUdQLEFBQVM7O0FBR1QsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7Ozs7O0FBUlA7OztBQUdBOzs7QUFPQSxJQUFNLHNCQUFzQixDQUFBLEFB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QU4sQUFBTSxBQUFLO0FBRnZCLEFBR0U7aUJBQVMsbUJBQUE7aUJBQU0sT0FBQSxBQUFLLFdBQVgsQUFBTSxBQUFnQjtBQUhqQzs7b0JBQUE7c0JBekhKLEFBa0hrQyxBQU85QixBQU9EO0FBUEM7QUFDRSxnQkFNSCxBQUFLLE1BQUwsQUFBVyxNQUFYLEFBQWlCLE9BQWpCLEFBQXdCLHdCQUFRLEFBQUM7Y0FDMUIsS0FBQSxBQUFLLE1BQUwsQUFBVyxNQUFYLEFBQWlCLE9BRFEsQUFDRCxBQUM5QjtxQkFBYSx3QkFBQTt3QkFBSyxBQUFLLFdBQVcsa0NBQzdCLE9BQUEsQUFBSyxNQUR3QixBQUNsQjtzQkFDTixFQUFFLE1BRkMsQUFBSyxBQUFjLEFBQUUsQUFFeEIsQUFBUTtBQUFoQixjQUY4QixFQUFkO0FBRmE7O29CQUFBO3NCQUFBLEFBTy9CO0FBUCtCO0FBQy9CLE9BRCtCLGtCQU8vQixBQUFDO2lCQUNVLG1CQUFBO2lCQUFNLE9BQUEsQUFBSyxXQUFYLEFBQU0sQUFBZ0I7QUFEakMsQUFFRTtpQkFBUyxpQkFBQSxBQUFDLEdBQU0sQUFBRTtpQkFBQSxBQUFLLFVBQUwsQUFBZSxBQUFLO0FBRnhDLEFBR0U7a0JBQVUsb0JBQUE7aUJBQU0sT0FBQSxBQUFLLFdBQVgsQUFBTSxBQUFnQjtBQUhsQzs7b0JBQUE7c0JBeElOLEFBQ0UsQUFnSW1DLEFBTy9CLEFBUVA7QUFSTztBQUNFOzs7OztFQS9OVSxnQkFBTSxBOztBQXlPNUIsUUFBQSxBQUFRO1NBQ0Msb0JBQUEsQUFBVSxPQURDLEFBQ00sQUFDeEI7VUFBUSxvQkFBQSxBQUFVLEtBRkEsQUFFSyxBQUN2QjtTQUFPLG9CQUhXLEFBR0QsQUFDakI7V0FBUyxvQkFKWCxBQUFvQixBQUlDO0FBSkQsQUFDbEI7O0FBTUYsUUFBQSxBQUFRO1dBQVIsQUFBdUIsQUFDWixBQUdYO0FBSnVCLEFBQ3JCOzsyQ0FJQSxpQkFBQTs7V0FDUyxNQUFBLEFBQU0sS0FETCxBQUNVLEFBQ2xCO2FBQVMsTUFBQSxBQUFNLEtBRmpCLEFBQVUsQUFFWTtBQUZaLEFBQ1I7QUFGVyxDQUFBLEVBS2Isb0JBQUE7O0FBQWEsOEJBQ0YsQUFBRTtlQUFBLEFBQVMsQUFBWTtBQURsQyxBQUFhO0FBQUEsQUFDWDtBQU5XLEdBQWYsQUFBZSxBQVFiIiwiZmlsZSI6Ik1haW5OYXYuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=