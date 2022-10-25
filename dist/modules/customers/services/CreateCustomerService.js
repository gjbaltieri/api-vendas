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
let CreateCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomerRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomerRepository.ICustomerRepository === "undefined" ? Object : _ICustomerRepository.ICustomerRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateCustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  async execute({
    name,
    email
  }) {
    const emailExists = await this.customerRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email adress already used.');
    }
    const customer = await this.customerRepository.create({
      name,
      email
    });
    return customer;
  }
}) || _class) || _class) || _class) || _class);
var _default = CreateCustomerService;
exports.default = _default;