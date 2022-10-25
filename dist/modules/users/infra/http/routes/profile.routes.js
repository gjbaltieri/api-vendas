"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _multer = _interopRequireDefault(require("multer"));
var _Upload = _interopRequireDefault(require("../../../../../config/Upload"));
var _isAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/isAuthenticated"));
var _userAvatarController = _interopRequireDefault(require("../controller/userAvatarController"));
var _profileController = _interopRequireDefault(require("../controller/profileController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const profileController = new _profileController.default();
const userAvatarController = new _userAvatarController.default();
const ProfileRoutes = (0, _express.Router)();
const avatar = (0, _multer.default)(_Upload.default);
ProfileRoutes.use(_isAuthenticated.default);
ProfileRoutes.get('/', profileController.showProfile);
ProfileRoutes.put('/update', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(3).max(30).required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().min(5).optional(),
    passwordConfirmation: _celebrate.Joi.string().min(5).valid(_celebrate.Joi.ref('password')).when('password', {
      is: _celebrate.Joi.exist(),
      then: _celebrate.Joi.required()
    }),
    old_password: _celebrate.Joi.string().required()
  }
}), profileController.update);
ProfileRoutes.patch('/avatar', avatar.single('avatar'), userAvatarController.update);
var _default = ProfileRoutes;
exports.default = _default;