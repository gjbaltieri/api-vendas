"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _celebrate = require("celebrate");
var _express = require("express");
var _joi = _interopRequireDefault(require("joi"));
var _forgotPasswordController = _interopRequireDefault(require("../controller/forgotPasswordController"));
var _resetPasswordController = _interopRequireDefault(require("../controller/resetPasswordController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const passwordRouter = (0, _express.Router)();
const forgotPassword = new _forgotPasswordController.default();
const resetPassword = new _resetPasswordController.default();
passwordRouter.post('/forgot', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _joi.default.string().email().required()
  }
}), forgotPassword.create);
passwordRouter.post('/reset', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    token: _joi.default.string().uuid().required(),
    password: _joi.default.string().required(),
    passwordConfirmation: _joi.default.string().required().valid(_joi.default.ref('password'))
  }
}), resetPassword.create);
var _default = passwordRouter;
exports.default = _default;