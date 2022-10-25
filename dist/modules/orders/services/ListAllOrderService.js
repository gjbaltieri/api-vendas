"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _IOrderRepository = require("../domain/interfaces/models/repository/IOrderRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let ListAllOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrderRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IOrderRepository.IOrderRepository === "undefined" ? Object : _IOrderRepository.IOrderRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListAllOrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute() {
    const orders = await this.orderRepository.find();
    return orders;
  }
}) || _class) || _class) || _class) || _class);
var _default = ListAllOrderService;
exports.default = _default;