"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _OrderRepository = _interopRequireDefault(require("../typeorm/repositories/OrderRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListAllOrderService {
  async execute() {
    const userRepository = (0, _typeorm.getCustomRepository)(_OrderRepository.default);
    const orders = await userRepository.find({});
    return orders;
  }
}
var _default = ListAllOrderService;
exports.default = _default;