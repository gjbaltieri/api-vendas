"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Customer = _interopRequireDefault(require("../entities/Customer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CustomerRepository {
  constructor() {
    _defineProperty(this, "ORM", void 0);
    this.ORM = (0, _typeorm.getRepository)(_Customer.default);
  }
  async findByName(name) {
    const customer = await this.ORM.findOne({
      where: {
        name
      }
    });
    return customer;
  }
  async findByEmail(email) {
    const customer = await this.ORM.findOne({
      where: {
        email
      }
    });
    return customer;
  }
  async findById(id) {
    const customer = await this.ORM.findOne({
      where: {
        id
      }
    });
    return customer;
  }
  async create({
    name,
    email
  }) {
    const customer = this.ORM.create({
      name,
      email
    });
    await this.ORM.save({
      name,
      email
    });
    return customer;
  }
  async save(data) {
    const customer = await this.ORM.save(data);
    return customer;
  }
  async remove(data) {
    await this.ORM.remove(data);
  }
  async paginate() {
    const paginate = await this.ORM.createQueryBuilder().paginate();
    return paginate;
  }
  async delete(custumer) {
    await this.ORM.remove(custumer);
  }
}
var _default = CustomerRepository;
exports.default = _default;