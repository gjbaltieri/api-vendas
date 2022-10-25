"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));
var _DeleteUserService = _interopRequireDefault(require("../../../services/DeleteUserService"));
var _ListUserService = _interopRequireDefault(require("../../../services/ListUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserController {
  async listAll(req, res) {
    const ListUsers = _tsyringe.container.resolve(_ListUserService.default);
    const users = await ListUsers.execute();
    return res.json(users);
  }
  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    const createUser = _tsyringe.container.resolve(_CreateUserService.default);
    const user = await createUser.execute({
      name,
      email,
      password
    });
    return res.json(user);
  }
  async delete(req, res) {
    const {
      id
    } = req.params;
    const deleteUser = _tsyringe.container.resolve(_DeleteUserService.default);
    await deleteUser.execute(id);
    return res.json([]);
  }
}
var _default = UserController;
exports.default = _default;