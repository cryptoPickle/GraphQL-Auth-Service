exports.id = "main";
exports.modules = {

/***/ "./src/graphql/Queries/index.js":
/*!**************************************!*\
  !*** ./src/graphql/Queries/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _fs = __webpack_require__(/*! fs */ "fs");var _fs2 = _interopRequireDefault(_fs);
var _path = __webpack_require__(/*! path */ "path");var _path2 = _interopRequireDefault(_path);
var _resolvers = __webpack_require__(/*! ./resolvers */ "./src/graphql/Queries/resolvers.js");var _resolvers2 = _interopRequireDefault(_resolvers);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}exports.default =

{
  schema: _fs2.default.readFileSync(_path2.default.resolve(__dirname, './queries.graphql'), 'utf8'),
  resolvers: _resolvers2.default };

/***/ })

};