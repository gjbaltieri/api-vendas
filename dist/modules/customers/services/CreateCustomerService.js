"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repository/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateCustomerService {
  async execute({
    name,
    email
  }) {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email adress already used.');
    }
    const customerCreate = customerRepository.create({
      name,
      email
    });
    const customer = await customerRepository.save(customerCreate);
    return customer;
  }
}
var _default = CreateCustomerService;
exports.default = _default;