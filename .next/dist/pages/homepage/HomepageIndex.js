'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _routes = require('../../routes');

var _localStorageFallback = require('local-storage-fallback');

var _localStorageFallback2 = _interopRequireDefault(_localStorageFallback);

var _Page2 = require('../Page');

var _Page3 = _interopRequireDefault(_Page2);

var _layout = require('../../components/layout/layout');

var _layout2 = _interopRequireDefault(_layout);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _store = require('../../store');

var _withTracker = require('../../hoc/withTracker');

var _withTracker2 = _interopRequireDefault(_withTracker);

var _analytics = require('../../constants/analytics');

var _category = require('../../modules/category');

var _Solutions = require('../../components/home/Solutions');

var _Solutions2 = _interopRequireDefault(_Solutions);

var _Events = require('../../components/home/Events');

var _Events2 = _interopRequireDefault(_Events);

var _CitySupport = require('../../components/home/CitySupport');

var _CitySupport2 = _interopRequireDefault(_CitySupport);

var _Blogs = require('../../components/home/Blogs');

var _Blogs2 = _interopRequireDefault(_Blogs);

var _Modal = require('../../components/common/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _DisclaimerSignUp = require('../../components/common/disclaimer/DisclaimerSign-up');

var _DisclaimerSignUp2 = _interopRequireDefault(_DisclaimerSignUp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/claralinos/Sites/sustainable-cities/pages/homepage/HomepageIndex.js?entry';

// components


// constants


// modules


// content


var HomePage = function (_Page) {
  (0, _inherits3.default)(HomePage, _Page);

  function HomePage() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HomePage);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HomePage.__proto__ || (0, _getPrototypeOf2.default)(HomePage)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      modal: {

        disclaimer: {
          open: true
        }
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HomePage, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(_layout2.default, {
        title: 'Home',
        queryParams: this.props.queryParams,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 43
        }
      }, _react2.default.createElement('section', { className: 'l-home-header', __source: {
          fileName: _jsxFileName,
          lineNumber: 48
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        }
      }, _react2.default.createElement('div', { className: 'columns small-10 small-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 50
        }
      }, _react2.default.createElement('h1', { className: 'c-title -fs-super-huge -fw-regular -light -center', __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, 'FINANCING SUSTAINABLE CITIES INITIATIVE')), _react2.default.createElement('div', { className: 'column small-10 small-offset-1 medium-8 medium-offset-2', __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, _react2.default.createElement('h2', { className: 'c-title -fs-bigger -light -center -subtitle', __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, 'Helping cities accelerate and scale-up investments in sustainable urban solutions.'))), _react2.default.createElement('ul', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'bike-sharing-scheme' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 59
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-bike', __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }, 'Bike sharing systems')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'bus-rapid-transit-brt' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-rapidbus', __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 70
        }
      }, 'Bus rapid transit systems')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'low-and-zero-emission-buses' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-bus', __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, 'Low -and zero- emissions buses')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 82
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'efficient-new-buildings' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 83
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-buildings', __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, 'Efficient new buildings')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'municipal-building-retrofits' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 91
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 92
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-gov', __source: {
          fileName: _jsxFileName,
          lineNumber: 93
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, 'Municipal building retrofits')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }, _react2.default.createElement(_routes.Link, { route: 'explore-index', params: { category: 'solutions', subCategory: 'transit-oriented-development-tod' }, __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, _react2.default.createElement('a', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium', __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-city', __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 102
        }
      }, 'Transit-oriented development')))), _react2.default.createElement('li', { className: 'column small-10 small-offset-1 medium-5 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, _react2.default.createElement('svg', { className: 'icon -light -in-line-left -medium -short', __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, _react2.default.createElement('use', { xlinkHref: '#icon-home-about', __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      })), _react2.default.createElement('span', { className: 'c-text -fs-bigger -light', __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, 'more coming soon')))), _react2.default.createElement('section', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 112
        }
      }, _react2.default.createElement('div', { className: 'l-activities', __source: {
          fileName: _jsxFileName,
          lineNumber: 113
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        }
      }, _react2.default.createElement('div', { className: 'columns small-12', __source: {
          fileName: _jsxFileName,
          lineNumber: 115
        }
      }, _react2.default.createElement('h2', { className: 'c-title -dark -fs-huge -fw-thin', __source: {
          fileName: _jsxFileName,
          lineNumber: 116
        }
      }, 'FSCI Activities'))), _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 119
        }
      }, _react2.default.createElement('div', { className: 'columns small-12 medium-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 120
        }
      }, _react2.default.createElement('h3', { className: 'c-title -dark -fs-extrabig -fw-thin -title-margin-small', __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        }
      }, 'Events'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        }
      }, 'Events organised within the FSCI framework provide a platform for dialogue about financing sustainable urban solutions among city officials, investors, technical service providers and other stakeholders.'), _react2.default.createElement('a', { className: 'c-button -primary', href: '/events', __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        }
      }, 'More events')), _react2.default.createElement(_Events2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 125
        }
      })), _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 127
        }
      }, _react2.default.createElement('div', { className: 'columns small-12 medium-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 128
        }
      }, _react2.default.createElement('h3', { className: 'c-title -dark -fs-extrabig -fw-thin -title-margin-small', __source: {
          fileName: _jsxFileName,
          lineNumber: 129
        }
      }, 'City Support'), _react2.default.createElement('p', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        }
      }, 'The FSCI engages with cities around the world to provide technical assistance to accelerate and scale-up investments for their sustainable urban projects.'), _react2.default.createElement('a', { className: 'c-button -primary', href: '/city-support', __source: {
          fileName: _jsxFileName,
          lineNumber: 131
        }
      }, 'More City Support')), _react2.default.createElement(_CitySupport2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 133
        }
      })))), _react2.default.createElement('section', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 137
        }
      }, _react2.default.createElement('div', { className: 'l-blog', __source: {
          fileName: _jsxFileName,
          lineNumber: 138
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 139
        }
      }, _react2.default.createElement('div', { className: 'columns small-12 medium-9 large-10 -flex-vertical-centered', __source: {
          fileName: _jsxFileName,
          lineNumber: 140
        }
      }, _react2.default.createElement('h3', { className: 'c-title -dark -fs-huge -fw-thin', __source: {
          fileName: _jsxFileName,
          lineNumber: 141
        }
      }, 'Posts about FSCI')), _react2.default.createElement('div', { className: 'columns small-12 medium-3 large-2 -flex-vertical-centered', __source: {
          fileName: _jsxFileName,
          lineNumber: 143
        }
      }, _react2.default.createElement('a', { href: '/about/blogs', className: 'c-button -primary', __source: {
          fileName: _jsxFileName,
          lineNumber: 144
        }
      }, 'More blog posts'))), _react2.default.createElement(_Blogs2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 147
        }
      }))), _react2.default.createElement(_Solutions2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 151
        }
      }), _react2.default.createElement('section', { className: 'l-home-videos', __source: {
          fileName: _jsxFileName,
          lineNumber: 153
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 154
        }
      }, _react2.default.createElement('div', { className: 'columns small-12 -flex-vertical-centered', __source: {
          fileName: _jsxFileName,
          lineNumber: 155
        }
      }, _react2.default.createElement('h3', { className: 'c-title -dark -fs-huge -fw-thin', __source: {
          fileName: _jsxFileName,
          lineNumber: 156
        }
      }, 'About FSCI')), _react2.default.createElement('div', { className: 'columns small-12 medium-5', __source: {
          fileName: _jsxFileName,
          lineNumber: 158
        }
      }, _react2.default.createElement('p', { className: 'c-text -fw-light', __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, 'In 2015, ', _react2.default.createElement('a', { href: 'http://www.wrirosscities.org/', target: '_blank', __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, 'WRI Ross Center'), ' for Sustainable Cities and ', _react2.default.createElement('a', { href: 'www.c40.org', target: '_blank', __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, 'C40 Cities'), ' Climate Leadership Group, funded by the ', _react2.default.createElement('a', { href: 'http://www.citigroup.com/citi/foundation/', target: '_blank', __source: {
          fileName: _jsxFileName,
          lineNumber: 159
        }
      }, 'Citi Foundation'), ', teamed up for a new partnership to leverage the expertise of our three organizations \u2013 WRI\u2019s analytical and research competencies and long-term engagement with cities, the high-level connection with city leaders of C40 and the Citi Foundation\u2019s urban economic progress agenda.')), _react2.default.createElement('div', { className: 'columns samll-12 medium-6 medium-offset-1', __source: {
          fileName: _jsxFileName,
          lineNumber: 161
        }
      }, _react2.default.createElement('div', { className: 'video-wrapper', __source: {
          fileName: _jsxFileName,
          lineNumber: 162
        }
      }, _react2.default.createElement('iframe', { src: 'https://player.vimeo.com/video/210677339', height: '480', width: '853', allowFullScreen: 'allowfullscreen', frameBorder: '0', __source: {
          fileName: _jsxFileName,
          lineNumber: 163
        }
      })))), _react2.default.createElement('div', { className: 'l-video-row', __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        }
      }, _react2.default.createElement('div', { className: 'row', __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        }
      }, _react2.default.createElement('div', { className: 'columns small-12 medium-6 large-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 169
        }
      }, _react2.default.createElement('div', { className: 'video-wrapper', __source: {
          fileName: _jsxFileName,
          lineNumber: 170
        }
      }, _react2.default.createElement('iframe', { src: 'https://www.youtube.com/embed/4NVIToVDHTc', allowFullScreen: 'allowfullscreen', frameBorder: '0', __source: {
          fileName: _jsxFileName,
          lineNumber: 171
        }
      }))), _react2.default.createElement('div', { className: 'columns small-12 medium-6 large-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        }
      }, _react2.default.createElement('div', { className: 'video-wrapper', __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, _react2.default.createElement('iframe', { src: 'https://www.youtube.com/embed/0JvfYvBRo_o', allowFullScreen: 'allowfullscreen', frameBorder: '0', __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }))), _react2.default.createElement('div', { className: 'columns small-12 medium-6 large-4', __source: {
          fileName: _jsxFileName,
          lineNumber: 179
        }
      }, _react2.default.createElement('div', { className: 'video-wrapper', __source: {
          fileName: _jsxFileName,
          lineNumber: 180
        }
      }))))), this.state.modal.disclaimer.open && _react2.default.createElement(_Modal2.default, {
        open: this.state.modal.disclaimer.open,
        toggleModal: function toggleModal(v) {
          return _this2.setState({
            modal: (0, _extends3.default)({}, _this2.state.modal, { disclaimer: { open: v } })
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 186
        }
      }, _react2.default.createElement(_DisclaimerSignUp2.default, {
        onClose: function onClose() {
          return _this2.setState({
            modal: (0, _extends3.default)({}, _this2.state.modal, { disclaimer: { open: false } })
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 192
        }
      })));
    }
  }]);

  return HomePage;
}(_Page3.default);

HomePage.propTypes = {
  queryParams: _propTypes2.default.object.isRequired
};

exports.default = (0, _nextReduxWrapper2.default)(_store.store)((0, _withTracker2.default)(HomePage, _analytics.GA_HOMEPAGE));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2hvbWVwYWdlL0hvbWVwYWdlSW5kZXguanMiXSwibmFtZXMiOlsiUmVhY3QiLCJQcm9wVHlwZXMiLCJMaW5rIiwic3RvcmFnZSIsIlBhZ2UiLCJMYXlvdXQiLCJ3aXRoUmVkdXgiLCJzdG9yZSIsIndpdGhUcmFja2VyIiwiR0FfSE9NRVBBR0UiLCJnZXRTb2x1dGlvblBkZnMiLCJTb2x1dGlvbnMiLCJFdmVudHMiLCJDaXR5U3VwcG9ydCIsIkJsb2dzIiwiTW9kYWwiLCJEaXNjbGFpbWVyTW9kYWwiLCJIb21lUGFnZSIsInN0YXRlIiwibW9kYWwiLCJkaXNjbGFpbWVyIiwib3BlbiIsInByb3BzIiwicXVlcnlQYXJhbXMiLCJjYXRlZ29yeSIsInN1YkNhdGVnb3J5Iiwic2V0U3RhdGUiLCJ2IiwicHJvcFR5cGVzIiwib2JqZWN0IiwiaXNSZXF1aXJlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQU87Ozs7QUFHUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUVQLEFBQU87Ozs7QUFDUCxBQUFTOztBQUNULEFBQU87Ozs7QUFHUCxBQUFTOztBQUdULEFBQVM7O0FBR1QsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFDUCxBQUFPOzs7Ozs7OztBQXBCUDs7O0FBUUE7OztBQUdBOzs7QUFHQTs7O0ksQUFVTTs7Ozs7Ozs7Ozs7Ozs7Z05BRUosQTs7OztnQkFBUSxBQUNDLEFBR0csQSxBQURJO0FBQUEsQUFDVjtBQUhHLEFBRUw7QUFISSxBQUNOOzs7Ozs2QkFRTzttQkFDUDs7NkJBQ0UsQUFBQztlQUFELEFBQ1EsQUFDTjtxQkFBYSxLQUFBLEFBQUssTUFGcEIsQUFFMEI7O29CQUYxQjtzQkFBQSxBQUtFO0FBTEY7QUFDRSxPQURGLGtCQUtFLGNBQUEsYUFBUyxXQUFULEFB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RCxBQUF3RSxtQkFBa0IsYUFBMUYsQUFBc0c7b0JBQXRHO3NCQVJOLEFBTUUsQUFDRSxBQUNFLEFBR0o7QUFISTs0QkFHSixjQUFBLFNBQUssV0FBTCxBQUFlO29CQUFmO3NCQUFBLEFBQ0U7QUFERjtnREFDTyxXQUFMLEFBQWU7b0JBQWY7c0JBeklWLEFBOEdFLEFBY0UsQUFDRSxBQVdFLEFBQ0UsQUFNUDtBQU5PO21CQU1QLEFBQUssTUFBTCxBQUFXLE1BQVgsQUFBaUIsV0FBakIsQUFBNEIsd0JBQVEsQUFBQztjQUM5QixLQUFBLEFBQUssTUFBTCxBQUFXLE1BQVgsQUFBaUIsV0FEWSxBQUNELEFBQ2xDO3FCQUFhLHdCQUFBO3dCQUFLLEFBQUs7OENBQ1QsT0FBQSxBQUFLLE1BQWpCLEFBQXVCLFNBQU8sWUFBWSxFQUFFLE1BRGpDLEFBQUssQUFBYyxBQUM5QixBQUEwQyxBQUFRO0FBRHBCLEFBQzlCLFdBRGdCO0FBRmlCOztvQkFBQTtzQkFBQSxBQU1uQztBQU5tQztBQUNuQyxPQURtQyxrQkFNbkMsQUFBQztpQkFDVSxtQkFBQTt3QkFBTSxBQUFLOzhDQUNOLE9BQUEsQUFBSyxNQUFqQixBQUF1QixTQUFPLFlBQVksRUFBRSxNQURyQyxBQUFNLEFBQWMsQUFDM0IsQUFBMEMsQUFBUTtBQUR2QixBQUMzQixXQURhO0FBRGpCOztvQkFBQTtzQkF0Sk4sQUFDRSxBQStJdUMsQUFNbkMsQUFTUDtBQVRPO0FBQ0U7Ozs7O0EsQUFuS1c7O0FBOEt2QixTQUFBLEFBQVM7ZUFDTSxvQkFBQSxBQUFVLE9BRHpCLEFBQXFCLEFBQ1csQUFHaEM7QUFKcUIsQUFDbkI7O2tCQUdhLEFBQVUsOENBQU8sMkJBQWhDLEFBQWUsQUFBaUIsQUFBWSxBQUFVIiwiZmlsZSI6IkhvbWVwYWdlSW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2NsYXJhbGlub3MvU2l0ZXMvc3VzdGFpbmFibGUtY2l0aWVzIn0=