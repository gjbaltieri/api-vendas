"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _products = _interopRequireDefault(require("../../../modules/products/routes/products.routes"));
var _users = _interopRequireDefault(require("../../../modules/users/routes/users.routes"));
var _session = _interopRequireDefault(require("../../../modules/users/routes/session.routes"));
var _password = _interopRequireDefault(require("../../../modules/users/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../modules/users/routes/profile.routes"));
var _customer = _interopRequireDefault(require("../../../modules/customers/routes/customer.routes"));
var _orders = _interopRequireDefault(require("../../../modules/orders/routes/orders.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _session.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/customers', _customer.default);
routes.use('/orders', _orders.default);
var _default = routes;
exports.default = _default;