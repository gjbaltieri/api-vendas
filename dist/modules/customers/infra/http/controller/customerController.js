"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UpdateCustomerService = _interopRequireDefault(require("../../../services/UpdateCustomerService"));
var _tsyringe = require("tsyringe");
var _CreateCustomerService = _interopRequireDefault(require("../../../services/CreateCustomerService"));
var _DeleteCustomerService = _interopRequireDefault(require("../../../services/DeleteCustomerService"));
var _listAllCustomerService = _interopRequireDefault(require("../../../services/listAllCustomerService"));
var _ListOneCustomerService = _interopRequireDefault(require("../../../services/ListOneCustomerService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class customerController {
  async create(req, res) {
    const {
      name,
      email
    } = req.body;
    const customerRepository = _tsyringe.container.resolve(_CreateCustomerService.default);
    const customer = await customerRepository.execute({
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
    const customerRepository = _tsyringe.container.resolve(_UpdateCustomerService.default);
    const customer = await customerRepository.execute({
      id,
      name,
      email
    });
    return res.status(200).json(customer);
  }
  async listAll(req, res) {
    const customerRepository = _tsyringe.container.resolve(_listAllCustomerService.default);
    const customer = await customerRepository.execute();
    return res.status(200).json(customer);
  }
  async listOne(req, res) {
    const {
      id
    } = req.params;
    const customerRepository = _tsyringe.container.resolve(_ListOneCustomerService.default);
    const customer = await customerRepository.execute({
      id
    });
    return res.status(200).json(customer);
  }
  async delete(req, res) {
    const {
      id
    } = req.params;
    const customerRepository = _tsyringe.container.resolve(_DeleteCustomerService.default);
    await customerRepository.execute({
      id
    });
    return res.status(204).json([]);
  }
}
var _default = customerController;
exports.default = _default;