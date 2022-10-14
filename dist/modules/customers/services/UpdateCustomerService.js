"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repository/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateCustomerService {
  async execute({
    id,
    name,
    email
  }) {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new _AppError.default('Customer not found.');
    }
    const emailExists = await customerRepository.findByEmail(email);
    if (emailExists && customer.email !== email) {
      throw new _AppError.default('There is already one customer with this email.');
    }
    customer.email = email;
    customer.name = name;
    await customerRepository.save(customer);
    return customer;
  }
}
var _default = UpdateCustomerService;
exports.default = _default;