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

var _routes = require('../../../routes');

var _localStorageFallback = require('local-storage-fallback');

var _localStorageFallback2 = _interopRequireDefault(_localStorageFallback);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _store = require('../../../store');

var _signUp = require('../../../modules/sign-up');

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/disclaimer/DisclaimerSign-up.js';

// Redux


// modules


// components


var DisclaimerModal = function (_React$Component) {
  (0, _inherits3.default)(DisclaimerModal, _React$Component);

  function DisclaimerModal(props) {
    (0, _classCallCheck3.default)(this, DisclaimerModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DisclaimerModal.__proto__ || (0, _getPrototypeOf2.default)(DisclaimerModal)).call(this, props));

    _this.handleClose = function () {
      _localStorageFallback2.default.setItem('diclaimer.signUp', true);
      _this.props.onClose();
    };

    _this.submitForm = function (e) {
      e.preventDefault();
      _this.props.setEmail(_this.state.email);
      _this.handleClose();
    };

    _this.handleInput = function (e) {
      _this.setState({ email: e.target.value });
    };

    _this.state = {
      email: ''
    };
    return _this;
  }

  (0, _createClass3.default)(DisclaimerModal, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var disclaimer = nextProps.disclaimer;

      // prevent scrolling while the modal is open

      document.getElementsByTagName('body')[0].classList.toggle('no-overflow', !!disclaimer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onClose = _props.onClose,
          disclaimer = _props.disclaimer;

      return _react2.default.createElement('section', { className: 'disclaimer', __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, _react2.default.createElement('h1', { className: 'c-title -dark -fs-huge -fw-thin', __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, 'Welcome!'), _react2.default.createElement('p', { className: 'c-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, 'Welcome to the Beta version of the Financing Sustainable Cities Web Platform! Please feel free to explore the features that are currently available.'), _react2.default.createElement('p', { className: 'c-text', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, 'The full version of our platform will be up and running soon, but in the meantime we invite you to sign up to our mailing list to stay up-to-date with our progress.'), _react2.default.createElement('p', { className: 'c-text -fs-big', __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, 'Sign up for updates'), _react2.default.createElement('form', { className: 'c-form', action: '', onSubmit: this.submitForm, __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement('input', {
        className: 'c-input',
        type: 'text',
        placeholder: 'Your email address',
        defaultValue: this.state.email,
        onChange: this.handleInput,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }), _react2.default.createElement('input', { className: 'c-submit c-button -secondary', type: 'submit', value: 'send',

        __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      })), _react2.default.createElement('div', { className: 'actions', __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }, _react2.default.createElement(_Button2.default, { onClick: this.handleClose, __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, 'Ok')));
    }
  }]);

  return DisclaimerModal;
}(_react2.default.Component);

exports.default = (0, _nextReduxWrapper2.default)(_store.store, function (state) {
  return state;
}, function (dispatch) {
  return {
    setEmail: function setEmail(email) {
      dispatch((0, _signUp.setEmail)(email));
    }
  };
})(DisclaimerModal);


DisclaimerModal.propTypes = {
  onClose: _propTypes2.default.func.isRequired,
  disclaimer: _propTypes2.default.string,
  setEmail: _propTypes2.default.func
};

DisclaimerModal.defaultProps = {};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL2Rpc2NsYWltZXIvRGlzY2xhaW1lclNpZ24tdXAuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaW5rIiwic3RvcmFnZSIsIndpdGhSZWR1eCIsInN0b3JlIiwic2V0RW1haWwiLCJCdXR0b24iLCJEaXNjbGFpbWVyTW9kYWwiLCJwcm9wcyIsImhhbmRsZUNsb3NlIiwic2V0SXRlbSIsIm9uQ2xvc2UiLCJzdWJtaXRGb3JtIiwiZSIsInByZXZlbnREZWZhdWx0Iiwic3RhdGUiLCJlbWFpbCIsImhhbmRsZUlucHV0Iiwic2V0U3RhdGUiLCJ0YXJnZXQiLCJ2YWx1ZSIsIm5leHRQcm9wcyIsImRpc2NsYWltZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiQ29tcG9uZW50IiwiZGlzcGF0Y2giLCJwcm9wVHlwZXMiLCJmdW5jIiwiaXNSZXF1aXJlZCIsInN0cmluZyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBTzs7OztBQUdQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUdULEFBQVM7O0FBR1QsQUFBTzs7Ozs7Ozs7QUFSUDs7O0FBSUE7OztBQUdBOzs7SSxBQUdNOzJDQUNKOzsyQkFBQSxBQUFZLE9BQU87d0NBQUE7O3dKQUFBLEFBQ1g7O1VBRFcsQUFlbkIsY0FBYyxZQUFNLEFBQ2xCO3FDQUFBLEFBQVEsUUFBUixBQUFnQixvQkFBaEIsQUFBb0MsQUFDcEM7WUFBQSxBQUFLLE1BQUwsQUFBVyxBQUNaO0FBbEJrQjs7VUFBQSxBQW9CbkIsYUFBYSxVQUFBLEFBQUMsR0FBTSxBQUNsQjtRQUFBLEFBQUUsQUFDRjtZQUFBLEFBQUssTUFBTCxBQUFXLFNBQVMsTUFBQSxBQUFLLE1BQXpCLEFBQStCLEFBQy9CO1lBQUEsQUFBSyxBQUNOO0FBeEJrQjs7VUFBQSxBQTBCbkIsY0FBYyxVQUFBLEFBQUMsR0FBTSxBQUNuQjtZQUFBLEFBQUssU0FBUyxFQUFFLE9BQU8sRUFBQSxBQUFFLE9BQXpCLEFBQWMsQUFBa0IsQUFDakM7QUE1QmtCLEFBR2pCOztVQUFBLEFBQUs7YUFIWSxBQUdqQixBQUFhLEFBQ0o7QUFESSxBQUNYO1dBRUg7Ozs7OzhDLEFBRXlCLFdBQVc7VUFBQSxBQUMzQixhQUQyQixBQUNaLFVBRFksQUFDM0IsQUFFUjs7QUFDQTs7ZUFBQSxBQUFTLHFCQUFULEFBQThCLFFBQTlCLEFBQXNDLEdBQXRDLEFBQXlDLFVBQXpDLEFBQW1ELE9BQW5ELEFBQTBELGVBQWUsQ0FBQyxDQUExRSxBQUEyRSxBQUM1RTs7Ozs2QkFpQlE7bUJBQ3lCLEtBRHpCLEFBQzhCO1VBRDlCLEFBQ0MsaUJBREQsQUFDQztVQURELEFBQ1Usb0JBRFYsQUFDVSxBQUVqQjs7NkJBQ0UsY0FBQSxhQUFTLFdBQVQsQUFBbUI7b0JBQW5CO3NCQUFBLEFBQ0U7QUFERjtPQUFBLGtCQUNFLGNBQUEsUUFBSSxXQUFKLEFBQWM7b0JBQWQ7c0JBQUE7QUFBQTtTQURGLEFBQ0UsQUFDQSw2QkFBQSxjQUFBLE9BQUcsV0FBSCxBQUFhO29CQUFiO3NCQUFBO0FBQUE7U0FGRixBQUVFLEFBQ0EseUtBQUEsY0FBQSxPQUFHLFdBQUgsQUFBYTtvQkFBYjtzQkFBQTtBQUFBO1NBSEYsQUFHRSxBQUVBLHlMQUFBLGNBQUEsT0FBRyxXQUFILEFBQWE7b0JBQWI7c0JBQUE7QUFBQTtTQUxGLEFBS0UsQUFFQSx3Q0FBQSxjQUFBLFVBQU0sV0FBTixBQUFnQixVQUFTLFFBQXpCLEFBQWdDLElBQUcsVUFBVSxLQUE3QyxBQUFrRDtvQkFBbEQ7c0JBQUEsQUFDRTtBQURGOzttQkFDRSxBQUNZLEFBQ1Y7Y0FGRixBQUVPLEFBQ0w7cUJBSEYsQUFHYyxBQUNaO3NCQUFjLEtBQUEsQUFBSyxNQUpyQixBQUkyQixBQUN6QjtrQkFBVSxLQUxaLEFBS2lCOztvQkFMakI7c0JBREYsQUFDRSxBQU9BO0FBUEE7QUFDRSxtREFNSyxXQUFQLEFBQWlCLGdDQUErQixNQUFoRCxBQUFxRCxVQUFTLE9BQTlELEFBQW9FOzs7b0JBQXBFO3NCQWZKLEFBT0UsQUFRRSxBQUtGO0FBTEU7MkJBS0YsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsQUFBQyxrQ0FBTyxTQUFTLEtBQWpCLEFBQXNCO29CQUF0QjtzQkFBQTtBQUFBO1NBdEJOLEFBQ0UsQUFvQkUsQUFDRSxBQUlQOzs7OztFQTVEMkIsZ0IsQUFBTSxBQStEcEM7O2dFQUVFLGlCQUFBO1NBQUEsQUFBUztBQUZJLENBQUEsQUFDYixFQUVBLG9CQUFBOztBQUFhLGdDQUFBLEFBQ0YsT0FBTyxBQUNkO2VBQVMsc0JBQVQsQUFBUyxBQUFTLEFBQ25CO0FBSEgsQUFBYTtBQUFBLEFBQ1g7QUFKVyxHQUFmLEFBQWUsQUFRYjs7O0FBRUYsZ0JBQUEsQUFBZ0I7V0FDTCxvQkFBQSxBQUFVLEtBRE8sQUFDRixBQUN4QjtjQUFZLG9CQUZjLEFBRUosQUFDdEI7WUFBVSxvQkFIWixBQUE0QixBQUdOO0FBSE0sQUFDMUI7O0FBS0YsZ0JBQUEsQUFBZ0IsZUFBaEIsQUFBK0IiLCJmaWxlIjoiRGlzY2xhaW1lclNpZ24tdXAuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=