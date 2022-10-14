"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateCustomerService = _interopRequireDefault(require("../services/CreateCustomerService"));
var _DeleteCustomerService = _interopRequireDefault(require("../services/DeleteCustomerService"));
var _listAllCustomerService = _interopRequireDefault(require("../services/listAllCustomerService"));
var _ListOneCustomerService = _interopRequireDefault(require("../services/ListOneCustomerService"));
var _UpdateCustomerService = _interopRequireDefault(require("../services/UpdateCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class customerController {
  async create(req, res) {
    const {
      name,
      email
    } = req.body;
    const customerService = new _CreateCustomerService.default();
    const customer = await customerService.execute({
      name,
      email
    });
    return res.json(customer);
  }
  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      name,
      email
    } = req.body;
    const customerService = new _UpdateCustomerService.default();
    const customer = await customerService.execute({
      id,
      name,
      email
    });
    return res.status(200).json(customer);
  }
  async listAll(req, res) {
    const customerService = new _listAllCustomerService.default();
    const customer = await customerService.execute();
    return res.status(200).json(customer);
  }
  async listOne(req, res) {
    const {
      id
    } = req.body;
    const customerService = new _ListOneCustomerService.default();
    const customer = await customerService.execute(id);
    return res.status(200).json(customer);
  }
  async delete(req, res) {
    const {
      id
    } = req.params;
    const customerService = new _DeleteCustomerService.default();
    await customerService.execute({
      id
    });
    return res.status(204).json([]);
  }
}
var _default = customerController;
exports.default = _default;