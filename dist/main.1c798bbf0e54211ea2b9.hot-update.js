exports.id = "main";
exports.modules = {

/***/ "./src/graphql/User/index.js":
/*!***********************************!*\
  !*** ./src/graphql/User/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =
{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './user.schema.graphql'), 'utf8') };

/***/ })

};