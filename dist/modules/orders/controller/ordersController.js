"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateOrderService = _interopRequireDefault(require("../services/CreateOrderService"));
var _ListAllOrderService = _interopRequireDefault(require("../services/ListAllOrderService"));
var _ListOneOrderService = _interopRequireDefault(require("../services/ListOneOrderService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class OrdersController {
  async listAll(request, response) {
    const listOne = new _ListAllOrderService.default();
    const order = await listOne.execute();
    return response.json(order);
  }
  async listOne(request, response) {
    const {
      id
    } = request.params;
    const listAll = new _ListOneOrderService.default();
    const products = await listAll.execute(id);
    return response.json(products);
  }
  async create(request, response) {
    const {
      customer_id,
      products
    } = request.body;
    const createOrder = new _CreateOrderService.default();
    const order = await createOrder.execute({
      customer_id,
      products
    });
    return response.json(order);
  }
}
var _default = OrdersController;
exports.default = _default;