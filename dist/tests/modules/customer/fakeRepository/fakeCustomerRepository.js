"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Customer = _interopRequireDefault(require("../../../../modules/customers/infra/typeorm/entities/Customer"));
var _crypto = require("crypto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class FakeCustomerRepository {
  constructor() {
    _defineProperty(this, "customers", []);
  }
  async findByName(name) {
    const customer = this.customers.find(c => c.name === name);
    return customer;
  }
  async findByEmail(email) {
    const customer = this.customers.find(c => c.email === email);
    return customer;
  }
  async findById(id) {
    const customer = this.customers.find(c => c.id === id);
    return customer;
  }
  async create({
    name,
    email
  }) {
    const customer = new _Customer.default();
    customer.id = (0, _crypto.randomUUID)();
    customer.name = name;
    customer.email = email;
    customer.created_At = new Date();
    customer.updated_At = new Date();
    this.customers.push(customer);
    return customer;
  }
  async save(data) {
    const customer = this.customers.findIndex(c => c.id === data.id);
    this.customers[customer] = data;
    return data;
  }
  async remove(data) {
    const customer = this.customers.findIndex(c => c.id === data.id);
    this.customers.splice(customer);
  }
  async paginate() {
    const paginate = this.customers;
    const response = {
      from: 1,
      to: 1,
      per_page: 10,
      total: paginate.length,
      current_page: 1,
      prev_page: undefined,
      next_page: undefined,
      last_page: undefined,
      data: paginate
    };
    return response;
  }
  async delete(custumer) {
    const customer = this.customers.findIndex(c => c.id === custumer.id);
    this.customers.splice(customer);
  }
}
var _default = FakeCustomerRepository;
exports.default = _default;