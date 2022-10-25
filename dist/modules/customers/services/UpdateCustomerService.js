"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _tsyringe = require("tsyringe");
var _ICustomerRepository = require("../domain/interfaces/repository/ICustomerRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UpdateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomerRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomerRepository.ICustomerRepository === "undefined" ? Object : _ICustomerRepository.ICustomerRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateCustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  async execute({
    id,
    name,
    email
  }) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) {
      throw new _AppError.default('Customer not found.');
    }
    const emailExists = await this.customerRepository.findByEmail(email);
    if (emailExists && customer.email !== email) {
      throw new _AppError.default('There is already one customer with this email.');
    }
    customer.email = email;
    customer.name = name;
    await this.customerRepository.save(customer);
    return customer;
  }
}) || _class) || _class) || _class) || _class);
var _default = UpdateCustomerService;
exports.default = _default;