"use strict";

var _CustomersRepository = _interopRequireDefault(require("../../modules/customers/infra/typeorm/repository/CustomersRepository"));
var _OrderRepository = _interopRequireDefault(require("../../modules/orders/infra/typeorm/repositories/OrderRepository"));
var _ProductRepository = _interopRequireDefault(require("../../modules/products/infra/typeorm/repositories/ProductRepository"));
var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repository/UsersRepository"));
var _UserTokenRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repository/UserTokenRepository"));
var _tsyringe = require("tsyringe");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_tsyringe.container.registerSingleton('CustomerRepository', _CustomersRepository.default);
_tsyringe.container.registerSingleton('ProductRepository', _ProductRepository.default);
_tsyringe.container.registerSingleton('OrderRepository', _OrderRepository.default);
_tsyringe.container.registerSingleton('UserRepository', _UsersRepository.default);
_tsyringe.container.registerSingleton('UserTokenRepository', _UserTokenRepository.default);