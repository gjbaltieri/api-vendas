"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Order = _interopRequireDefault(require("../entities/Order"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let OrderRepository = (_dec = (0, _typeorm.EntityRepository)(_Order.default), _dec(_class = class OrderRepository extends _typeorm.Repository {
  async findById(id) {
    const order = this.findOne(id, {
      relations: ['customer', 'order_products']
    });
    return order;
  }
  async createOrder({
    customer,
    products
  }) {
    const order = this.create({
      customer,
      order_products: products
    });
    await this.save(order);
    return order;
  }
}) || _class);
var _default = OrderRepository;
exports.default = _default;