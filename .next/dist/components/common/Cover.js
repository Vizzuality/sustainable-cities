'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Cover;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/components/common/Cover.js';
function Cover(props) {
  return _react2.default.createElement('div', {
    className: (0, _classnames2.default)('c-cover', '-size-' + props.size, '-position-' + props.position, props.className),
    style: {
      backgroundImage: props.image ? 'url(' + props.image + ')' : undefined,
      backgroundColor: props.color || undefined
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, _react2.default.createElement('div', { className: 'c-cover-veil', __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement('div', { className: 'row align-bottom', __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, _react2.default.createElement('div', { className: 'column small-12 large-8', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, props.breadcrumbs && _react2.default.createElement('div', { className: 'breadcrumbs', __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, props.breadcrumbs), _react2.default.createElement('h1', { className: 'c-title -light -fs-huge -fw-thin', __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, props.titleIcon && _react2.default.createElement('svg', { viewBox: '0 0 32 32', __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, _react2.default.createElement('use', { height: '100%', xlinkHref: '#' + props.titleIcon, __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  })), props.title), props.description && _react2.default.createElement('p', { className: 'c-text -fs-medium -fw-light description', __source: {
      fileName: _jsxFileName,
      lineNumber: 29
    }
  }, props.description)), _react2.default.createElement('div', { className: 'column small-12 large-4', __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    }
  }, _react2.default.createElement('div', { className: (0, _classnames2.default)('actions', { '-margin': !props.description }), __source: {
      fileName: _jsxFileName,
      lineNumber: 32
    }
  }, props.children)))));
}

Cover.propTypes = {
  className: _propTypes2.default.string,
  image: _propTypes2.default.string,
  color: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['normal', 'short', 'shorter']),
  position: _propTypes2.default.oneOf(['top', 'bottom']),
  title: _propTypes2.default.string.isRequired,
  titleIcon: _propTypes2.default.string,
  description: _propTypes2.default.string,
  breadcrumbs: _propTypes2.default.PropTypes.element, // Breadcrumbs component expected
  children: _propTypes2.default.any
};

Cover.defaultProps = {
  size: 'normal',
  position: 'top'
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY29tbW9uL0NvdmVyLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwiY2xhc3NuYW1lcyIsIkNvdmVyIiwicHJvcHMiLCJzaXplIiwicG9zaXRpb24iLCJjbGFzc05hbWUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJpbWFnZSIsInVuZGVmaW5lZCIsImJhY2tncm91bmRDb2xvciIsImNvbG9yIiwiYnJlYWRjcnVtYnMiLCJ0aXRsZUljb24iLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiY2hpbGRyZW4iLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJvbmVPZiIsImlzUmVxdWlyZWQiLCJlbGVtZW50IiwiYW55IiwiZGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPLEFBRVA7Ozs7Ozs7QUFBZSxTQUFBLEFBQVMsTUFBVCxBQUFlLE9BQU8sQUFDbkM7eUJBQ0UsY0FBQTtlQUNhLDBCQUFBLEFBQ1Qsc0JBQ1MsTUFGQSxBQUVNLHFCQUNGLE1BSEosQUFHVSxVQUNuQixNQUxKLEFBQ2EsQUFJSCxBQUVSOzt1QkFDbUIsTUFBQSxBQUFNLGlCQUFlLE1BQXJCLEFBQTJCLGNBRHZDLEFBQ2tELEFBQ3ZEO3VCQUFpQixNQUFBLEFBQU0sU0FUM0IsQUFPUyxBQUUyQjtBQUYzQixBQUNMOztnQkFSSjtrQkFBQSxBQVlFO0FBWkY7QUFDRSxHQURGLGtCQVlFLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO3FCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO3FCQUNFLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDSTtBQURKO1dBQ0ksQUFBTSwrQkFBZSxjQUFBLFNBQUssV0FBTCxBQUFlO2dCQUFmO2tCQUFBLEFBQThCO0FBQTlCO0dBQUEsUUFEekIsQUFDeUIsQUFBb0MsQUFDM0QsOEJBQUEsY0FBQSxRQUFJLFdBQUosQUFBYztnQkFBZDtrQkFBQSxBQUNJO0FBREo7V0FDSSxBQUFNLDZCQUFhLGNBQUEsU0FBSyxTQUFMLEFBQWE7Z0JBQWI7a0JBQUEsQUFDbkI7QUFEbUI7R0FBQSx5Q0FDZCxRQUFMLEFBQVksUUFBTyxpQkFBZSxNQUFsQyxBQUF3QztnQkFBeEM7a0JBRkosQUFDdUIsQUFDbkIsQUFFRDtBQUZDO2FBSk4sQUFFRSxBQUlTLEFBRVAsY0FBQSxBQUFNLCtCQUFlLGNBQUEsT0FBRyxXQUFILEFBQWE7Z0JBQWI7a0JBQUEsQUFBd0Q7QUFBeEQ7R0FBQSxRQVQzQixBQUNFLEFBUXlCLEFBQThELEFBRXZGLCtCQUFBLGNBQUEsU0FBSyxXQUFMLEFBQWU7Z0JBQWY7a0JBQUEsQUFDRTtBQURGO3FCQUNFLGNBQUEsU0FBSyxXQUFXLDBCQUFBLEFBQVcsV0FBVyxFQUFFLFdBQVcsQ0FBQyxNQUFwRCxBQUFnQixBQUFzQixBQUFvQjtnQkFBMUQ7a0JBQUEsQUFDRztBQURIO1dBMUJWLEFBQ0UsQUFZRSxBQUNFLEFBV0UsQUFDRSxBQUNTLEFBT3BCOzs7QUFFRCxNQUFBLEFBQU07YUFDTyxvQkFESyxBQUNLLEFBQ3JCO1NBQU8sb0JBRlMsQUFFQyxBQUNqQjtTQUFPLG9CQUhTLEFBR0MsQUFDakI7UUFBTSxvQkFBQSxBQUFVLE1BQU0sQ0FBQSxBQUFDLFVBQUQsQUFBVyxTQUpqQixBQUlWLEFBQWdCLEFBQW9CLEFBQzFDO1lBQVUsb0JBQUEsQUFBVSxNQUFNLENBQUEsQUFBQyxPQUxYLEFBS04sQUFBZ0IsQUFBUSxBQUNsQztTQUFPLG9CQUFBLEFBQVUsT0FORCxBQU1RLEFBQ3hCO2FBQVcsb0JBUEssQUFPSyxBQUNyQjtlQUFhLG9CQVJHLEFBUU8sQUFDdkI7ZUFBYSxvQkFBQSxBQUFVLFVBVFAsQUFTaUIsU0FBUyxBQUMxQztZQUFVLG9CQVZaLEFBQWtCLEFBVUk7QUFWSixBQUNoQjs7QUFZRixNQUFBLEFBQU07UUFBZSxBQUNiLEFBQ047WUFGRixBQUFxQixBQUVUO0FBRlMsQUFDbkIiLCJmaWxlIjoiQ292ZXIuanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=