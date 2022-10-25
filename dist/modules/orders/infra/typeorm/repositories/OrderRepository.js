"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Order = _interopRequireDefault(require("../entities/Order"));
var _dec, _dec2, _dec3, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
let OrderRepository = (_dec = (0, _typeorm.EntityRepository)(_Order.default), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class OrderRepository {
  constructor() {
    _defineProperty(this, "orm", void 0);
    this.orm = (0, _typeorm.getRepository)(_Order.default);
  }
  async find() {
    const order = this.orm.find({});
    return order;
  }
  async findById(id) {
    const order = this.orm.findOne(id, {
      relations: ['customer', 'order_products']
    });
    return order;
  }
  async createOrder({
    customer,
    product
  }) {
    const order = this.orm.create({
      customer,
      order_products: product
    });
    await this.orm.save(order);
    return order;
  }
}) || _class) || _class) || _class);
var _default = OrderRepository;
exports.default = _default;