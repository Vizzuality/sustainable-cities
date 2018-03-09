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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Spinner = require('./Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/Modal.js';


var Modal = function (_React$Component) {
  (0, _inherits3.default)(Modal, _React$Component);

  function Modal() {
    (0, _classCallCheck3.default)(this, Modal);

    return (0, _possibleConstructorReturn3.default)(this, (Modal.__proto__ || (0, _getPrototypeOf2.default)(Modal)).apply(this, arguments));
  }

  (0, _createClass3.default)(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.getElementsByTagName('body')[0].classList.add('no-overflow');
    }

    // Close modal when esc key is pressed

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var open = _ref.open;

      function escKeyPressListener(evt) {
        document.removeEventListener('keydown', escKeyPressListener);
        return evt.keyCode === 27 && this.props.toggleModal(false);
      }

      // if opened property has changed
      if (this.props.open !== open) {
        document[open ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener.bind(this));
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.getElementsByTagName('body')[0].classList.remove('no-overflow');
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          open = _props.open,
          children = _props.children,
          loading = _props.loading,
          toggleModal = _props.toggleModal,
          className = _props.className;

      var modalClass = (0, _classnames3.default)('c-modal', (_classnames = {}, (0, _defineProperty3.default)(_classnames, className, !!className), (0, _defineProperty3.default)(_classnames, '-hidden', !open), _classnames));

      return _react2.default.createElement('section', { ref: function ref(node) {
          _this2.el = node;
        }, className: modalClass, __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, _react2.default.createElement('area', { className: 'modal-backdrop', onClick: function onClick() {
          return toggleModal(false);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      }), _react2.default.createElement('div', { className: 'modal-container', __source: {
          fileName: _jsxFileName,
          lineNumber: 39
        }
      }, _react2.default.createElement('button', { className: 'dismiss', onClick: function onClick() {
          return toggleModal(false);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 40
        }
      }, _react2.default.createElement('svg', { className: 'icon -close', __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-close', __source: {
          fileName: _jsxFileName,
          lineNumber: 41
        }
      }))), _react2.default.createElement('div', { className: 'content', __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, loading ? _react2.default.createElement(_Spinner2.default, { isLoading: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 44
        }
      }) : children)));
    }
  }]);

  return Modal;
}(_react2.default.Component);

exports.default = Modal;


Modal.propTypes = {
  open: _propTypes2.default.bool.isRequired,
  children: _propTypes2.default.node.isRequired,
  loading: _propTypes2.default.bool,
  toggleModal: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};

Modal.defaultProps = {
  loading: false
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL01vZGFsLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiY2xhc3NuYW1lcyIsIlByb3BUeXBlcyIsIlNwaW5uZXIiLCJNb2RhbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJvcGVuIiwiZXNjS2V5UHJlc3NMaXN0ZW5lciIsImV2dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJrZXlDb2RlIiwicHJvcHMiLCJ0b2dnbGVNb2RhbCIsImJpbmQiLCJyZW1vdmUiLCJjaGlsZHJlbiIsImxvYWRpbmciLCJjbGFzc05hbWUiLCJtb2RhbENsYXNzIiwibm9kZSIsImVsIiwiQ29tcG9uZW50IiwicHJvcFR5cGVzIiwiYm9vbCIsImlzUmVxdWlyZWQiLCJmdW5jIiwic3RyaW5nIiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7O0lBRWMsQTs7Ozs7Ozs7Ozs7d0NBRUMsQUFDbEI7ZUFBQSxBQUFTLHFCQUFULEFBQThCLFFBQTlCLEFBQXNDLEdBQXRDLEFBQXlDLFVBQXpDLEFBQW1ELElBQW5ELEFBQXVELEFBQ3hEO0FBRUQ7Ozs7OztvREFDb0M7VUFBUixBQUFRLFlBQVIsQUFBUSxBQUNsQzs7ZUFBQSxBQUFTLG9CQUFULEFBQTZCLEtBQUssQUFDaEM7aUJBQUEsQUFBUyxvQkFBVCxBQUE2QixXQUE3QixBQUF3QyxBQUN4QztlQUFPLElBQUEsQUFBSSxZQUFKLEFBQWdCLE1BQU0sS0FBQSxBQUFLLE1BQUwsQUFBVyxZQUF4QyxBQUE2QixBQUF1QixBQUNyRDtBQUVEOztBQUNBO1VBQUksS0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFmLEFBQXdCLE1BQU0sQUFDNUI7aUJBQVMsT0FBQSxBQUFPLHFCQUFoQixBQUFxQyx1QkFBckMsQUFBNEQsV0FBVyxvQkFBQSxBQUFvQixLQUEzRixBQUF1RSxBQUF5QixBQUNqRztBQUNGOzs7OzJDQUVzQixBQUNyQjtlQUFBLEFBQVMscUJBQVQsQUFBOEIsUUFBOUIsQUFBc0MsR0FBdEMsQUFBeUMsVUFBekMsQUFBbUQsT0FBbkQsQUFBMEQsQUFDM0Q7Ozs7NkJBRVE7VUFBQTttQkFBQTs7bUJBQ3FELEtBRHJELEFBQzBEO1VBRDFELEFBQ0MsY0FERCxBQUNDO1VBREQsQUFDTyxrQkFEUCxBQUNPO1VBRFAsQUFDaUIsaUJBRGpCLEFBQ2lCO1VBRGpCLEFBQzBCLHFCQUQxQixBQUMwQjtVQUQxQixBQUN1QyxtQkFEdkMsQUFDdUMsQUFDOUM7O1VBQU0sYUFBYSwwQkFBQSxBQUFXLHlFQUFYLEFBQ2hCLFdBQVksQ0FBQyxDQURHLEFBQ0YsdURBREUsQUFFakIsV0FBVyxDQUZNLEFBRUwsT0FGZCxBQUtBOzs2QkFDRSxjQUFBLGFBQVMsS0FBSyxhQUFBLEFBQUMsTUFBUyxBQUFFO2lCQUFBLEFBQUssS0FBTCxBQUFVLEFBQU87QUFBM0MsV0FBNkMsV0FBN0MsQUFBd0Q7b0JBQXhEO3NCQUFBLEFBQ0U7QUFERjtPQUFBLDBDQUNRLFdBQU4sQUFBZ0Isa0JBQWlCLFNBQVMsbUJBQUE7aUJBQU0sWUFBTixBQUFNLEFBQVk7QUFBNUQ7b0JBQUE7c0JBREYsQUFDRSxBQUNBO0FBREE7MEJBQ0EsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsY0FBQSxZQUFRLFdBQVIsQUFBa0IsV0FBVSxTQUFTLG1CQUFBO2lCQUFNLFlBQU4sQUFBTSxBQUFZO0FBQXZEO29CQUFBO3NCQUFBLEFBQ0U7QUFERjt5QkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQTZCO0FBQTdCO2dEQUFrQyxXQUFMLEFBQWU7b0JBQWY7c0JBRmpDLEFBQ0UsQUFDRSxBQUE2QixBQUUvQjtBQUYrQjs0QkFFL0IsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNHO0FBREg7bUNBQ2EsQUFBQyxtQ0FBUSxXQUFUO29CQUFBO3NCQUFWLEFBQVU7QUFBQTtPQUFBLElBUm5CLEFBQ0UsQUFFRSxBQUlFLEFBQ3FDLEFBSzVDOzs7OztFQTNDZ0MsZ0JBQU0sQTs7a0JBQXBCLEE7OztBQThDckIsTUFBQSxBQUFNO1FBQ0Usb0JBQUEsQUFBVSxLQURBLEFBQ0ssQUFDckI7WUFBVSxvQkFBQSxBQUFVLEtBRkosQUFFUyxBQUN6QjtXQUFTLG9CQUhPLEFBR0csQUFDbkI7ZUFBYSxvQkFBQSxBQUFVLEtBSlAsQUFJWSxBQUM1QjthQUFXLG9CQUxiLEFBQWtCLEFBS0s7QUFMTCxBQUNoQjs7QUFPRixNQUFBLEFBQU07V0FBTixBQUFxQixBQUNWO0FBRFUsQUFDbkIiLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=