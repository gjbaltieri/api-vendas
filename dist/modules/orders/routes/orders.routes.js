"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _celebrate = require("celebrate");
var _express = require("express");
var _joi = _interopRequireDefault(require("joi"));
var _ordersController = _interopRequireDefault(require("../controller/ordersController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OrderRoutes = (0, _express.Router)();
const ordersController = new _ordersController.default();
OrderRoutes.use(_isAuthenticated.default);
OrderRoutes.get('/', ordersController.listAll);
OrderRoutes.get('/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _joi.default.string().uuid().required()
  }
}), ordersController.listOne);
OrderRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    customer_id: _joi.default.string().uuid().required(),
    products: _joi.default.required()
  }
}), ordersController.create);
var _default = OrderRoutes;
exports.default = _default;