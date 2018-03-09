'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _typeof2 = require('next/node_modules/babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _modules = require('./modules');

var reducers = _interopRequireWildcard(_modules);

var _reduxPersist = require('redux-persist');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducer = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers));

/* Redux dev tool, install chrome extension in
 * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
var devToolsExtension = (typeof window === 'undefined' ? 'undefined' : (0, _typeof3.default)(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
  return f;
};

var builderTransform = (0, _reduxPersist.createTransform)(function (state, key) {
  return { "new": state.new, props: state.props };
}, function (state, key) {
  return state;
}, { whitelist: ['builder'] });

var store = function store() {
  var store = (0, _redux.createStore)(reducer, (0, _redux.compose)(
  /* The router middleware MUST be before thunk otherwise the URL changes
  * inside a thunk function won't work properly */
  (0, _redux.applyMiddleware)(_reduxThunk2.default), (0, _reduxPersist.autoRehydrate)(), devToolsExtension));

  if (process.browser) {
    (0, _reduxPersist.persistStore)(store, {
      whitelist: ['builder', 'auth'],
      transforms: [builderTransform]
    });
  }

  return store;
};

exports.store = store;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0b3JlLmpzIl0sIm5hbWVzIjpbImNyZWF0ZVN0b3JlIiwiY29tYmluZVJlZHVjZXJzIiwiYXBwbHlNaWRkbGV3YXJlIiwiY29tcG9zZSIsInRodW5rIiwicmVkdWNlcnMiLCJhdXRvUmVoeWRyYXRlIiwicGVyc2lzdFN0b3JlIiwiY3JlYXRlVHJhbnNmb3JtIiwicmVkdWNlciIsImRldlRvb2xzRXh0ZW5zaW9uIiwid2luZG93IiwiZiIsImJ1aWxkZXJUcmFuc2Zvcm0iLCJzdGF0ZSIsImtleSIsIm5ldyIsInByb3BzIiwid2hpdGVsaXN0Iiwic3RvcmUiLCJwcm9jZXNzIiwiYnJvd3NlciIsInRyYW5zZm9ybXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQVMsQUFBYSxBQUFpQixBQUFpQjs7QUFDeEQsQUFBTzs7OztBQUNQLEFBQU87O0lBQVAsQUFBWTs7QUFDWixBQUFTLEFBQWUsQUFBYzs7Ozs7O0FBR3RDLElBQU0sVUFBVSx1REFBaEIsQUFBZ0IsQUFDWDs7QUFHTDs7QUFFQSxJQUFNLG9CQUNILFFBQUEsQUFBTyw2REFBUCxBQUFPLGFBQVAsQUFBa0IsWUFBWSxPQUFPLE9BQVAsQUFBYyxzQkFBN0MsQUFBbUUsY0FDbkUsT0FEQSxBQUNBLEFBQU8sc0JBQ04sYUFBQTtTQUFBLEFBQUs7QUFIUjs7QUFNQSxJQUFNLHNEQUNKLFVBQUEsQUFBQyxPQUFELEFBQVEsS0FBUjtTQUFpQixFQUFFLE9BQU8sTUFBVCxBQUFlLEtBQUssT0FBTyxNQUE1QyxBQUFpQixBQUFpQztBQUQzQixDQUFBLEVBRXZCLFVBQUEsQUFBQyxPQUFELEFBQVEsS0FBUjtTQUFBLEFBQWdCO0FBRk8sR0FHdkIsRUFBRSxXQUFXLENBSGYsQUFBeUIsQUFHdkIsQUFBYSxBQUFDOztBQUdoQixJQUFNLFFBQVEsaUJBQU0sQUFDbEI7TUFBTSxRQUFRLHdCQUFBLEFBQ1osU0FDQSxBQUNFO0FBRUE7O0FBSEYsQUFHRSxBQUFnQixxREFIbEIsQUFLRSxvQ0FQSixBQUFjLEFBRVosQUFNRSxBQUlKOztNQUFJLFFBQUosQUFBWSxTQUFTLEFBQ25CO29DQUFBLEFBQ0U7aUJBRWEsQ0FBQSxBQUFDLFdBRGQsQUFDYSxBQUFZLEFBQ3ZCO2tCQUFZLENBSmhCLEFBRUUsQUFFYyxBQUFDLEFBR2xCO0FBTEcsQUFDRTtBQU1OOztTQUFBLEFBQU8sQUFDUjtBQXhCRCxBQTBCQTs7UUFBQSxBQUFTIiwiZmlsZSI6InN0b3JlLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9