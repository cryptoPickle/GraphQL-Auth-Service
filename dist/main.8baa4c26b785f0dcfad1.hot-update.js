exports.id = "main";
exports.modules = {

/***/ "./src/Services/Auth/Strategies/FacebookStrategy.js":
/*!**********************************************************!*\
  !*** ./src/Services/Auth/Strategies/FacebookStrategy.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });var _passport = __webpack_require__(/*! passport */ "passport");var _passport2 = _interopRequireDefault(_passport);
var _passportFacebook = __webpack_require__(/*! passport-facebook */ "passport-facebook");
var _Auth = __webpack_require__(/*! ./Auth */ "./src/Services/Auth/Strategies/Auth.js");var _Auth2 = _interopRequireDefault(_Auth);
var _config = __webpack_require__(/*! ../../../config */ "./src/config/index.js");var _config2 = _interopRequireDefault(_config);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _asyncToGenerator(fn) {return function () {var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {function step(key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {return Promise.resolve(value).then(function (value) {step("next", value);}, function (err) {step("throw", err);});}}return step("next");});};}


const defaultPermissions = ['user_friends', 'emails', 'public_profile'];
const fields = ['id', 'displayName', 'emails', 'first_name', 'middle_name', 'last_name'];




class FacebookStrategy extends _Auth2.default {
  constructor(clientID, clientSecret, callbackURL, permissions) {
    super();

    this.clientID = clientID || _config2.default.facebookClientID;
    this.clientSecret = clientSecret || _config2.default.facebookAppSecret;
    this.callbackURL = callbackURL || 'http://localhost:9090/v1/auth/facebook/return';
    this.permissions = permissions || defaultPermissions;
    this._strategy();
  }


  _strategy() {var _this = this;
    _passport2.default.use(new _passportFacebook.Strategy({
      clientID: this.clientID,
      clientSecret: this.clientSecret,
      callbackURL: this.callbackURL,
      enableProof: true,
      profileFields: fields }, (() => {var _ref = _asyncToGenerator(
      function* (accessToken, refreshToken, profile, cb) {

        const { id, name: { familyName, givenName }, email } = profile;
        const userinfo = { id, name: givenName, surname: familyName, email: email, accessToken };

        yield _this._createUserEntry(userinfo, 'facebook', cb);

      });return function (_x, _x2, _x3, _x4) {return _ref.apply(this, arguments);};})()));
  }


  returnAuthenticate() {
    return _passport2.default.authenticate('facebook', {
      session: false,
      authType: 'rerequest',
      scope: this.permissions });

  }



  authenticate() {
    return _passport2.default.authenticate('facebook', { session: false });
  }}exports.default =



FacebookStrategy;

/***/ })

};