"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _crypto = require("crypto");
var _Product = _interopRequireDefault(require("../../../../modules/products/infra/typeorm/entities/Product"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class FakeProductRepository {
  constructor() {
    _defineProperty(this, "orm", []);
  }
  async findById(id) {
    const Product = this.orm.find(product => product.id === id);
    return Product;
  }
  async findByName(name) {
    const Product = this.orm.find(product => product.name === name);
    return Product;
  }
  async find() {
    return this.orm;
  }
  async findAllByIds(products) {
    const productsIds = products.map(p => p.id);
    const Product = this.orm.filter(p => productsIds.includes(p.id));
    return Product;
  }
  async create(data) {
    const product = new _Product.default();
    product.id = (0, _crypto.randomUUID)();
    product.name = data.name;
    product.price = data.price;
    product.quantity = data.quantity;
    product.created_At = new Date();
    product.updated_At = new Date();
    this.orm.push(product);
    return product;
  }
  async save(data) {
    Object.assign(this.orm, data);
    return data;
  }
  async delete(data) {
    const product = this.orm.findIndex(p => p === data);
    this.orm.splice(product);
  }
}
var _default = FakeProductRepository;
exports.default = _default;