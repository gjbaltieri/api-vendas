"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _joi = _interopRequireDefault(require("joi"));
var _celebrate = require("celebrate");
var _customerController = _interopRequireDefault(require("../controller/customerController"));
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const CustomerRoutes = (0, _express.Router)();
const customer = new _customerController.default();
CustomerRoutes.use(_isAuthenticated.default);
CustomerRoutes.get('/', customer.listAll);
CustomerRoutes.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _joi.default.string().uuid().required()
  }
}), customer.listOne);
CustomerRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _joi.default.string().required(),
    email: _joi.default.string().email().required()
  }
}), customer.create);
CustomerRoutes.put('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _joi.default.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    name: _joi.default.string().required(),
    email: _joi.default.string().email().required()
  }
}), customer.update);
CustomerRoutes.delete('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _joi.default.string().uuid().required()
  }
}), customer.delete);
var _default = CustomerRoutes;
exports.default = _default;