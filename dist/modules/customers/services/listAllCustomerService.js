"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ICustomerRepository = require("../domain/interfaces/repository/ICustomerRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let ListAllCustomerService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('CustomerRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ICustomerRepository.ICustomerRepository === "undefined" ? Object : _ICustomerRepository.ICustomerRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllCustomerService {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
  }
  async execute() {
    const customers = await this.customerRepository.paginate();
    return customers;
  }
}) || _class) || _class) || _class) || _class);
var _default = ListAllCustomerService;
exports.default = _default;