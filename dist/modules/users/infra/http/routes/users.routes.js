"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _userController = _interopRequireDefault(require("../controller/userController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../../../shared/infra/http/middlewares/isAuthenticated"));
var _profileController = _interopRequireDefault(require("../controller/profileController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const profileController = new _profileController.default();
const userController = new _userController.default();
const UserRoutes = (0, _express.Router)();
UserRoutes.get('/', _isAuthenticated.default, userController.listAll);
UserRoutes.get('/profile', _isAuthenticated.default, profileController.showProfile);
UserRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(3).max(30).required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().min(5).required()
  }
}), userController.create);
UserRoutes.put('/update', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().min(3).max(30).required(),
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().min(5).required(),
    passwordConfirmation: _celebrate.Joi.string().min(5).required().valid(_celebrate.Joi.ref('password')),
    old_password: _celebrate.Joi.string().required()
  }
}), profileController.update);
UserRoutes.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), userController.delete);
var _default = UserRoutes;
exports.default = _default;