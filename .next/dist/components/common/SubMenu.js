'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _routes = require('../../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/SubMenu.js';


var SubMenu = function (_React$Component) {
  (0, _inherits3.default)(SubMenu, _React$Component);

  function SubMenu(props) {
    (0, _classCallCheck3.default)(this, SubMenu);

    // bindings
    var _this = (0, _possibleConstructorReturn3.default)(this, (SubMenu.__proto__ || (0, _getPrototypeOf2.default)(SubMenu)).call(this, props));

    _this._onClickOutside = _this.onClickOutside.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SubMenu, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setEventListeners();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.removeEventListeners();
    }
  }, {
    key: 'onClickOutside',
    value: function onClickOutside(e) {
      var isClickOutside = this.subMenuNode && this.subMenuNode.contains && !this.subMenuNode.contains(e.target) && !this.props.parentNode.contains(e.target);

      if (isClickOutside) {
        this.props.onCloseSubMenu();
      }
    }
  }, {
    key: 'setEventListeners',
    value: function setEventListeners() {
      window.addEventListener('click', this._onClickOutside);
    }
  }, {
    key: 'removeEventListeners',
    value: function removeEventListeners() {
      window.removeEventListener('click', this._onClickOutside);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          items = _props.items,
          className = _props.className,
          parent = _props.parent,
          route = _props.route;

      var classNames = (0, _classnames2.default)('c-submenu', (0, _defineProperty3.default)({}, className, !!className));

      return _react2.default.createElement('div', { className: classNames, ref: function ref(node) {
          _this2.subMenuNode = node;
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, _react2.default.createElement('div', { className: 'parent-menu', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, _react2.default.createElement('span', { className: 'literal', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, parent)), _react2.default.createElement('ul', { className: 'menu-list', role: 'menubar', 'aria-label': 'Submenu for ' + parent + ' section', __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, items.map(function (item) {
        return _react2.default.createElement('li', { key: item.id, className: 'menu-item', role: 'menuitem', tabIndex: '-1', __source: {
            fileName: _jsxFileName,
            lineNumber: 52
          }
        }, item.onClick ? _react2.default.createElement('span', { className: 'literal', onClick: function onClick() {
            return item.onClick();
          }, __source: {
            fileName: _jsxFileName,
            lineNumber: 54
          }
        }, item.label) : _react2.default.createElement(_routes.Link, {
          route: route || item.route,
          params: item.query,
          prefetch: true,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 55
          }
        }, _react2.default.createElement('a', { className: 'literal', __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          }
        }, item.label)));
      })));
    }
  }]);

  return SubMenu;
}(_react2.default.Component);

exports.default = SubMenu;


SubMenu.propTypes = {
  className: _propTypes2.default.string,
  items: _propTypes2.default.array.isRequired,
  onCloseSubMenu: _propTypes2.default.func,
  parent: _propTypes2.default.string,
  parentNode: _propTypes2.default.object.isRequired,
  route: _propTypes2.default.string
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL1N1Yk1lbnUuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJjbGFzc25hbWVzIiwiTGluayIsIlN1Yk1lbnUiLCJwcm9wcyIsIl9vbkNsaWNrT3V0c2lkZSIsIm9uQ2xpY2tPdXRzaWRlIiwiYmluZCIsInNldEV2ZW50TGlzdGVuZXJzIiwicmVtb3ZlRXZlbnRMaXN0ZW5lcnMiLCJlIiwiaXNDbGlja091dHNpZGUiLCJzdWJNZW51Tm9kZSIsImNvbnRhaW5zIiwidGFyZ2V0IiwicGFyZW50Tm9kZSIsIm9uQ2xvc2VTdWJNZW51Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJpdGVtcyIsImNsYXNzTmFtZSIsInBhcmVudCIsInJvdXRlIiwiY2xhc3NOYW1lcyIsIm5vZGUiLCJtYXAiLCJpdGVtIiwiaWQiLCJvbkNsaWNrIiwibGFiZWwiLCJxdWVyeSIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsInN0cmluZyIsImFycmF5IiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTOzs7Ozs7O0lBRVksQTttQ0FFbkI7O21CQUFBLEFBQVksT0FBTzt3Q0FHakI7O0FBSGlCO3dJQUFBLEFBQ1gsQUFHTjs7VUFBQSxBQUFLLGtCQUFrQixNQUFBLEFBQUssZUFBTCxBQUFvQixLQUoxQixBQUlqQjtXQUNEOzs7Ozt3Q0FFbUIsQUFDbEI7V0FBQSxBQUFLLEFBQ047Ozs7MkNBRXNCLEFBQ3JCO1dBQUEsQUFBSyxBQUNOOzs7O21DQUVjLEEsR0FBRyxBQUNoQjtVQUFNLGlCQUFpQixLQUFBLEFBQUssZUFDMUIsS0FBQSxBQUFLLFlBRGdCLEFBQ0osWUFDakIsQ0FBQyxLQUFBLEFBQUssWUFBTCxBQUFpQixTQUFTLEVBRk4sQUFFcEIsQUFBNEIsV0FDN0IsQ0FBQyxLQUFBLEFBQUssTUFBTCxBQUFXLFdBQVgsQUFBc0IsU0FBUyxFQUhsQyxBQUdHLEFBQWlDLEFBRXBDOztVQUFBLEFBQUksZ0JBQWdCLEFBQ2xCO2FBQUEsQUFBSyxNQUFMLEFBQVcsQUFDWjtBQUNGOzs7O3dDQUVtQixBQUNsQjthQUFBLEFBQU8saUJBQVAsQUFBd0IsU0FBUyxLQUFqQyxBQUFzQyxBQUN2Qzs7OzsyQ0FFc0IsQUFDckI7YUFBQSxBQUFPLG9CQUFQLEFBQTJCLFNBQVMsS0FBcEMsQUFBeUMsQUFDMUM7Ozs7NkJBRVE7bUJBQUE7O21CQUNxQyxLQURyQyxBQUMwQztVQUQxQyxBQUNDLGVBREQsQUFDQztVQURELEFBQ1EsbUJBRFIsQUFDUTtVQURSLEFBQ21CLGdCQURuQixBQUNtQjtVQURuQixBQUMyQixlQUQzQixBQUMyQixBQUNsQzs7VUFBTSxhQUFhLDBCQUFBLEFBQVcsK0NBQVgsQUFDaEIsV0FBWSxDQUFDLENBRGhCLEFBQW1CLEFBQ0YsQUFHakI7OzZCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWdCLFlBQVksS0FBSyxhQUFBLEFBQUMsTUFBUyxBQUFFO2lCQUFBLEFBQUssY0FBTCxBQUFtQixBQUFPO0FBQXZFO29CQUFBO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFBNkI7QUFBN0I7eUJBQTZCLGNBQUEsVUFBTSxXQUFOLEFBQWdCO29CQUFoQjtzQkFBQSxBQUEyQjtBQUEzQjtTQUQvQixBQUNFLEFBQTZCLEFBQzdCLDBCQUFBLGNBQUEsUUFBSSxXQUFKLEFBQWMsYUFBWSxNQUExQixBQUErQixXQUFVLCtCQUFBLEFBQTJCLFNBQXBFO29CQUFBO3NCQUFBLEFBQ0c7QUFESDtlQUNHLEFBQU0sSUFBSSxnQkFBQTsrQkFBUSxjQUFBLFFBQUksS0FBSyxLQUFULEFBQWMsSUFBSSxXQUFsQixBQUE0QixhQUFZLE1BQXhDLEFBQTZDLFlBQVcsVUFBeEQsQUFBaUU7c0JBQWpFO3dCQUFBLEFBQ2hCO0FBRGdCO1NBQUEsT0FDaEIsQUFBSywwQkFDSixjQUFBLFVBQU0sV0FBTixBQUFnQixXQUFVLFNBQVMsbUJBQUE7bUJBQU0sS0FBTixBQUFNLEFBQUs7QUFBOUM7c0JBQUE7d0JBQUEsQUFBMEQ7QUFBMUQ7U0FBQSxPQURELEFBQ0MsQUFBK0QseUJBQy9ELEFBQUM7aUJBQ00sU0FBUyxLQURoQixBQUNxQixBQUNyQjtrQkFBUSxLQUZSLEFBRWEsQUFDYjtvQkFIQTs7c0JBQUE7d0JBQUEsQUFLQTtBQUxBO0FBQ0EsU0FEQSxrQkFLQSxjQUFBLE9BQUcsV0FBSCxBQUFhO3NCQUFiO3dCQUFBLEFBQXdCO0FBQXhCO2dCQVJPLEFBQVEsQUFHZixBQUtBLEFBQTZCO0FBWnZDLEFBQ0UsQUFFRSxBQUNHLEFBY1I7Ozs7O0VBNURrQyxnQkFBTSxBOztrQixBQUF0Qjs7O0FBK0RyQixRQUFBLEFBQVE7YUFDSyxvQkFETyxBQUNHLEFBQ3JCO1NBQU8sb0JBQUEsQUFBVSxNQUZDLEFBRUssQUFDdkI7a0JBQWdCLG9CQUhFLEFBR1EsQUFDMUI7VUFBUSxvQkFKVSxBQUlBLEFBQ2xCO2NBQVksb0JBQUEsQUFBVSxPQUxKLEFBS1csQUFDN0I7U0FBTyxvQkFOVCxBQUFvQixBQU1EO0FBTkMsQUFDbEIiLCJmaWxlIjoiU3ViTWVudS5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==