"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _OrderRepository = _interopRequireDefault(require("../typeorm/repositories/OrderRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListOneOrderService {
  async execute(id) {
    const userRepository = (0, _typeorm.getCustomRepository)(_OrderRepository.default);
    const order = await userRepository.findById(id);
    if (!order) {
      throw new _AppError.default('Order not found.');
    }
    return order;
  }
}
var _default = ListOneOrderService;
exports.default = _default;