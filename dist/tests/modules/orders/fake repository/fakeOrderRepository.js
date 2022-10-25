"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Order = _interopRequireDefault(require("../../../../modules/orders/infra/typeorm/entities/Order"));
var _crypto = require("crypto");
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
let FakeOrderRepository = (_dec = (0, _typeorm.EntityRepository)(_Order.default), _dec(_class = class FakeOrderRepository {
  constructor() {
    _defineProperty(this, "orm", []);
  }
  async find() {
    return this.orm;
  }
  async findById(id) {
    const order = this.orm.find(order => order.id === id);
    return order;
  }
  async createOrder({
    customer,
    product
  }) {
    const order = new _Order.default();
    order.id = (0, _crypto.randomUUID)();
    order.customer = customer;
    order.created_At = new Date();
    order.updated_At = new Date();
    order.order_products = [...product];
    this.orm.push(order);
    return order;
  }
}) || _class);
var _default = FakeOrderRepository;
exports.default = _default;