"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _products = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/products.routes"));
var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));
var _session = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/session.routes"));
var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));
var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));
var _customer = _interopRequireDefault(require("../../../../modules/customers/infra/http/routes/customer.routes"));
var _orders = _interopRequireDefault(require("../../../../modules/orders/infra/http/routes/orders.routes"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swagger = _interopRequireDefault(require("../../../../../swagger.json"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const routes = (0, _express.Router)();
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _session.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/customers', _customer.default);
routes.use('/orders', _orders.default);
routes.use('/', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
var _default = routes;
exports.default = _default;