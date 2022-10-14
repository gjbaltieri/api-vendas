"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repository/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DeleteCustomerService {
  async execute({
    id
  }) {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customer = await customerRepository.findById(id);
    if (!customer) {
      throw new _AppError.default('Customer not found.');
    }
    await customerRepository.remove(customer);
  }
}
var _default = DeleteCustomerService;
exports.default = _default;