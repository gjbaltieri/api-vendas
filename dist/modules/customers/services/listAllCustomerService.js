"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CustomersRepository = _interopRequireDefault(require("../typeorm/repository/CustomersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListAllCustomerService {
  async execute() {
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const customers = await customerRepository.createQueryBuilder().paginate(10);
    return customers;
  }
}
var _default = ListAllCustomerService;
exports.default = _default;