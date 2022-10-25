"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _tsyringe = require("tsyringe");
var _IOrderRepository = require("../domain/interfaces/models/repository/IOrderRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ListOneOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrderRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IOrderRepository.IOrderRepository === "undefined" ? Object : _IOrderRepository.IOrderRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListOneOrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(id) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new _AppError.default('Order not found.');
    }
    return order;
  }
}) || _class) || _class) || _class) || _class);
var _default = ListOneOrderService;
exports.default = _default;