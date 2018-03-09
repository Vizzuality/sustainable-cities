'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiRequest = undefined;

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiRequest = exports.apiRequest = function apiRequest(url, options) {
  return fetch(process.env.API_URL + '/' + url, (0, _extends3.default)({}, options, {
    headers: (0, _extends3.default)({
      'Content-Type': 'application/json',
      'SC-API-KEY': process.env.SC_API_KEY
    }, options.headers || {})
  }));
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvaGVscGVycy5qcyJdLCJuYW1lcyI6WyJhcGlSZXF1ZXN0IiwidXJsIiwib3B0aW9ucyIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIkFQSV9VUkwiLCJoZWFkZXJzIiwiU0NfQVBJX0tFWSJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7Ozs7QUFBTyxJQUFNLGtDQUFhLFNBQWIsQUFBYSxXQUFBLEFBQUMsS0FBRCxBQUFNLFNBQU47ZUFFbkIsUUFBQSxBQUFRLElBRGIsQUFDaUIsZ0JBRGpCLEFBQzRCLGdDQUQ1QixBQUdPOztzQkFDSCxBQUNrQixBQUNoQjtvQkFBYyxRQUFBLEFBQVEsSUFGeEIsQUFFNEI7QUFEMUIsT0FFSSxRQUFBLEFBQVEsV0FSTSxBQUN4QixBQUlJLEFBR3lCO0FBSHpCLElBSko7QUFESyIsImZpbGUiOiJoZWxwZXJzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9jbGFyYWxpbm9zL1NpdGVzL3N1c3RhaW5hYmxlLWNpdGllcyJ9