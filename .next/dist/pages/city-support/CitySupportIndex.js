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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _routes = require('../../routes');

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _store = require('../../store');

var _withTracker = require('../../hoc/withTracker');

var _withTracker2 = _interopRequireDefault(_withTracker);

var _Page2 = require('../Page');

var _Page3 = _interopRequireDefault(_Page2);

var _layout = require('../../components/layout/layout');

var _layout2 = _interopRequireDefault(_layout);

var _Cover = require('../../components/common/Cover');

var _Cover2 = _interopRequireDefault(_Cover);

var _CitySupport = require('../../components/about/CitySupport');

var _CitySupport2 = _interopRequireDefault(_CitySupport);

var _analytics = require('../../constants/analytics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/pages/city-support/CitySupportIndex.js?entry';

// components


// content


// constants


var CitySupportPage = function (_Page) {
  (0, _inherits3.default)(CitySupportPage, _Page);

  function CitySupportPage() {
    (0, _classCallCheck3.default)(this, CitySupportPage);

    return (0, _possibleConstructorReturn3.default)(this, (CitySupportPage.__proto__ || (0, _getPrototypeOf2.default)(CitySupportPage)).apply(this, arguments));
  }

  (0, _createClass3.default)(CitySupportPage, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_layout2.default, {
        title: 'About',
        queryParams: this.props.queryParams,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 27
        }
      }, _react2.default.createElement('div', { className: 'about-page', __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      }, _react2.default.createElement(_Cover2.default, {
        title: 'City Support',
        size: 'shorter',
        image: '/static/images/city-support-header.jpg',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 32
        }
      }), _react2.default.createElement(_CitySupport2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 38
        }
      })));
    }
  }]);

  return CitySupportPage;
}(_Page3.default);

CitySupportPage.propTypes = {
  queryParams: _propTypes2.default.object.isRequired
};

exports.default = (0, _nextReduxWrapper2.default)(_store.store)((0, _withTracker2.default)(CitySupportPage, _analytics.GA_ABOUT));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2NpdHktc3VwcG9ydC9DaXR5U3VwcG9ydEluZGV4LmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiY2xhc3NuYW1lcyIsIkxpbmsiLCJ3aXRoUmVkdXgiLCJ1dWlkdjEiLCJzdG9yZSIsIndpdGhUcmFja2VyIiwiUGFnZSIsIkxheW91dCIsIkNvdmVyIiwiQ2l0eVN1cHBvcnQiLCJHQV9BQk9VVCIsIkNpdHlTdXBwb3J0UGFnZSIsInByb3BzIiwicXVlcnlQYXJhbXMiLCJwcm9wVHlwZXMiLCJvYmplY3QiLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBQ1QsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFFUCxBQUFTOztBQUNULEFBQU87Ozs7QUFHUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFHUCxBQUFPOzs7O0FBSVAsQUFBUzs7Ozs7O0FBVlQ7OztBQUtBOzs7QUFJQTs7O0ksQUFHTTs7Ozs7Ozs7Ozs7NkJBRUssQUFDUDs2QkFDRSxBQUFDO2VBQUQsQUFDUSxBQUNOO3FCQUFhLEtBQUEsQUFBSyxNQUZwQixBQUUwQjs7b0JBRjFCO3NCQUFBLEFBSUU7QUFKRjtBQUNFLE9BREYsa0JBSUUsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7eUJBQ0UsQUFBQztlQUFELEFBQ1EsQUFDTjtjQUZGLEFBRU8sQUFDTDtlQUhGLEFBR1E7O29CQUhSO3NCQURGLEFBQ0UsQUFNQTtBQU5BO0FBQ0UsMEJBS0YsQUFBRTs7b0JBQUY7c0JBWk4sQUFDRSxBQUlFLEFBT0UsQUFJUDtBQUpPO0FBQUE7Ozs7O0FBZm9CLEE7O0FBc0I5QixnQkFBQSxBQUFnQjtlQUNELG9CQUFBLEFBQVUsT0FEekIsQUFBNEIsQUFDSSxBQUdoQztBQUo0QixBQUMxQjs7a0JBR2EsQUFBVSw4Q0FBTywyQkFBaEMsQUFBZSxBQUFpQixBQUFZLEFBQWlCIiwiZmlsZSI6IkNpdHlTdXBwb3J0SW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=