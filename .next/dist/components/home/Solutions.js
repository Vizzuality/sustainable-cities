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

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _store = require('../../store');

var _category = require('../../modules/category');

var _Spinner = require('../common/Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _category2 = require('../../constants/category');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/home/Solutions.js';

// Redux


// modules


// components


// constants


var Solutions = function (_React$Component) {
  (0, _inherits3.default)(Solutions, _React$Component);

  function Solutions() {
    (0, _classCallCheck3.default)(this, Solutions);

    return (0, _possibleConstructorReturn3.default)(this, (Solutions.__proto__ || (0, _getPrototypeOf2.default)(Solutions)).apply(this, arguments));
  }

  (0, _createClass3.default)(Solutions, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.getSolutionPdfs();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      return !(0, _isEqual2.default)(this.props.solutions, nextProps.solutions) || !(0, _isEqual2.default)(this.props.loading, nextProps.loading);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { className: 'row home-solutions', __source: {
          fileName: _jsxFileName,
          lineNumber: 35
        }
      }, _react2.default.createElement('div', { className: 'column small-12', __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        }
      }, _react2.default.createElement('h3', { className: 'c-title -dark -fs-huge -fw-thin -title-margin', __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        }
      }, 'Documents')), this.props.solutions.filter(function (solution) {
        return solution.document;
      }).map(function (solution) {
        return _react2.default.createElement('div', { className: 'column small-12 medium-3', key: solution.id, __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          }
        }, _react2.default.createElement('div', { className: 'c-solution', __source: {
            fileName: _jsxFileName,
            lineNumber: 42
          }
        }, _react2.default.createElement('svg', { className: 'icon -huge -dark -in-line-left', __source: {
            fileName: _jsxFileName,
            lineNumber: 43
          }
        }, _react2.default.createElement('use', { xlinkHref: '#' + _category2.CATEGORY_ICONS[solution.slug], __source: {
            fileName: _jsxFileName,
            lineNumber: 44
          }
        })), _react2.default.createElement('h2', { className: 'c-title -fs-big -fw-light', __source: {
            fileName: _jsxFileName,
            lineNumber: 46
          }
        }, solution.name), solution.document && _react2.default.createElement('a', {
          className: 'c-button -secondary',
          href: Solutions._getPdfLink(solution.document),
          download: solution.slug + '.pdf',
          __source: {
            fileName: _jsxFileName,
            lineNumber: 47
          }
        }, 'Download')));
      }));
    }
  }], [{
    key: '_getPdfLink',
    value: function _getPdfLink() {
      var document = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var pdfUrl = document && document.attachment ? document.attachment.url : '';
      return process.env.API_URL + '/' + pdfUrl;
    }
  }]);

  return Solutions;
}(_react2.default.Component);

exports.default = (0, _nextReduxWrapper2.default)(_store.store, function (state) {
  return {
    solutions: state.category.solution.list,
    loading: state.category.solution.loading
  };
}, function (dispatch) {
  return {
    getSolutionPdfs: function getSolutionPdfs() {
      dispatch((0, _category.getSolutionPdfs)());
    }
  };
})(Solutions);


Solutions.propTypes = {
  solutions: _propTypes2.default.array,
  loading: _propTypes2.default.bool,
  getSolutionPdfs: _propTypes2.default.func
};

Solutions.defaultProps = {
  solutions: []
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvaG9tZS9Tb2x1dGlvbnMuanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wdHlwZXMiLCJpc0VxdWFsIiwid2l0aFJlZHV4Iiwic3RvcmUiLCJnZXRTb2x1dGlvblBkZnMiLCJTcGlubmVyIiwiQ0FURUdPUllfSUNPTlMiLCJTb2x1dGlvbnMiLCJwcm9wcyIsIm5leHRQcm9wcyIsInNvbHV0aW9ucyIsImxvYWRpbmciLCJmaWx0ZXIiLCJzb2x1dGlvbiIsImRvY3VtZW50IiwibWFwIiwiaWQiLCJzbHVnIiwibmFtZSIsIl9nZXRQZGZMaW5rIiwicGRmVXJsIiwiYXR0YWNobWVudCIsInVybCIsInByb2Nlc3MiLCJlbnYiLCJBUElfVVJMIiwiQ29tcG9uZW50Iiwic3RhdGUiLCJjYXRlZ29yeSIsImxpc3QiLCJkaXNwYXRjaCIsInByb3BUeXBlcyIsImFycmF5IiwiYm9vbCIsImZ1bmMiLCJkZWZhdWx0UHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBR1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBR1QsQUFBUzs7QUFHVCxBQUFPOzs7O0FBR1AsQUFBUzs7Ozs7O0FBWFQ7OztBQUlBOzs7QUFHQTs7O0FBR0E7OztJQUdNLEE7Ozs7Ozs7Ozs7O3lDQU1pQixBQUNuQjtXQUFBLEFBQUssTUFBTCxBQUFXLEFBQ1o7Ozs7MEMsQUFFcUIsV0FBVyxBQUMvQjthQUFPLENBQUMsdUJBQVEsS0FBQSxBQUFLLE1BQWIsQUFBbUIsV0FBVyxVQUEvQixBQUFDLEFBQXdDLGNBQzlDLENBQUMsdUJBQVEsS0FBQSxBQUFLLE1BQWIsQUFBbUIsU0FBUyxVQUQvQixBQUNHLEFBQXNDLEFBQzFDOzs7OzZCQUVRLEFBQ1A7NkJBQ0EsY0FBQSxTQUFLLFdBQUwsQUFBZTtvQkFBZjtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRSxjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjt5QkFDRSxjQUFBLFFBQUksV0FBSixBQUFjO29CQUFkO3NCQUFBO0FBQUE7U0FGSixBQUNFLEFBQ0UsQUFFRCxvQkFBQSxBQUFLLE1BQUwsQUFBVyxVQUFYLEFBQXFCLE9BQU8sb0JBQUE7ZUFBWSxTQUFaLEFBQXFCO0FBQWpELFNBQUEsQUFBMkQsSUFBSSxvQkFBQTsrQkFFOUQsY0FBQSxTQUFLLFdBQUwsQUFBZSw0QkFBMkIsS0FBSyxTQUEvQyxBQUF3RDtzQkFBeEQ7d0JBQUEsQUFDRTtBQURGO1NBQUEsa0JBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtzQkFBZjt3QkFBQSxBQUNFO0FBREY7MkJBQ0UsY0FBQSxTQUFLLFdBQUwsQUFBZTtzQkFBZjt3QkFBQSxBQUNFO0FBREY7a0RBQ08saUJBQWUsMEJBQWUsU0FBbkMsQUFBb0IsQUFBd0I7c0JBQTVDO3dCQUZKLEFBQ0UsQUFDRSxBQUVGO0FBRkU7NkJBRUYsY0FBQSxRQUFJLFdBQUosQUFBYztzQkFBZDt3QkFBQSxBQUEyQztBQUEzQztvQkFKRixBQUlFLEFBQW9ELEFBQ25ELGdCQUFBLEFBQVMsNEJBQVksY0FBQTtxQkFBQSxBQUNWLEFBQ1Y7Z0JBQU0sVUFBQSxBQUFVLFlBQVksU0FGUixBQUVkLEFBQStCLEFBQ3JDO29CQUFhLFNBQWIsQUFBc0IsT0FIRjs7c0JBQUE7d0JBQUE7QUFBQTtBQUNwQixTQURvQixFQVJvQyxBQUU5RCxBQUNFLEFBS3dCO0FBYjlCLEFBQ0EsQUFJRyxBQW9CSjs7OztrQ0F4Q2lDO1VBQWYsQUFBZSwrRUFBSixBQUFJLEFBQ2hDOztVQUFNLFNBQVMsWUFBWSxTQUFaLEFBQXFCLGFBQWEsU0FBQSxBQUFTLFdBQTNDLEFBQXNELE1BQXJFLEFBQTJFLEFBQzNFO2FBQVUsUUFBQSxBQUFRLElBQWxCLEFBQXNCLGdCQUF0QixBQUFpQyxBQUNsQzs7Ozs7RUFKcUIsZ0JBQU0sQSxBQTRDOUI7O2dFQUVFLGlCQUFBOztlQUNhLE1BQUEsQUFBTSxTQUFOLEFBQWUsU0FEbEIsQUFDMkIsQUFDbkM7YUFBUyxNQUFBLEFBQU0sU0FBTixBQUFlLFNBRjFCLEFBQVUsQUFFeUI7QUFGekIsQUFDUjtBQUhXLENBQUEsQUFDYixFQUtBLG9CQUFBOztBQUFhLGdEQUNPLEFBQ2hCO2VBQUEsQUFBUyxBQUNWO0FBSEgsQUFBYTtBQUFBLEFBQ1g7QUFQVyxHQUFmLEFBQWUsQUFXYjs7O0FBRUYsVUFBQSxBQUFVO2FBQ0csb0JBRFMsQUFDQyxBQUNyQjtXQUFTLG9CQUZXLEFBRUQsQUFDbkI7bUJBQWlCLG9CQUhuQixBQUFzQixBQUdPO0FBSFAsQUFDcEI7O0FBS0YsVUFBQSxBQUFVO2FBQVYsQUFBeUIsQUFDWjtBQURZLEFBQ3ZCIiwiZmlsZSI6IlNvbHV0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY2xhcmFsaW5vcy9TaXRlcy9zdXN0YWluYWJsZS1jaXRpZXMifQ==