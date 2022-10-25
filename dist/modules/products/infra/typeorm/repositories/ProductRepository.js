"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Product = _interopRequireDefault(require("../entities/Product"));
var _typeorm = require("typeorm");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class ProductRepository {
  constructor() {
    _defineProperty(this, "orm", void 0);
    this.orm = (0, _typeorm.getRepository)(_Product.default);
  }
  async findById(id) {
    const product = await this.orm.findOne({
      where: {
        id: id
      }
    });
    return product;
  }
  async findByName(name) {
    const product = await this.orm.findOne({
      where: {
        name
      }
    });
    return product;
  }
  async find() {
    const product = await this.orm.find();
    return product;
  }
  async findAllByIds(products) {
    const productsIds = products.map(product => product.id);
    const productsList = await this.orm.find({
      where: {
        id: (0, _typeorm.In)(productsIds)
      }
    });
    return productsList;
  }
  async create(data) {
    const product = this.orm.create(data);
    await this.orm.save(product);
    return product;
  }
  async save(data) {
    const product = await this.orm.save(data);
    return product;
  }
  async delete(data) {
    await this.orm.remove(data);
    return;
  }
}
var _default = ProductRepository;
exports.default = _default;