"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _celebrate = require("celebrate");
var _express = require("express");
var _joi = _interopRequireDefault(require("joi"));
var _sessionsController = _interopRequireDefault(require("../controller/sessionsController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const sessionRouter = (0, _express.Router)();
const sessionController = new _sessionsController.default();
sessionRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _joi.default.string().email().required(),
    password: _joi.default.string().required()
  }
}), sessionController.create);
var _default = sessionRouter;
exports.default = _default;