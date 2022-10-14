"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateUserService = _interopRequireDefault(require("../services/CreateUserService"));
var _DeleteAll = _interopRequireDefault(require("../services/DeleteAll"));
var _DeleteUserService = _interopRequireDefault(require("../services/DeleteUserService"));
var _ListUserService = _interopRequireDefault(require("../services/ListUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserController {
  async listAll(req, res) {
    const ListUsers = new _ListUserService.default();
    const users = await ListUsers.execute();
    return res.json(users);
  }
  async create(req, res) {
    const {
      name,
      email,
      password
    } = req.body;
    const createUser = new _CreateUserService.default();
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
    const deleteUser = new _DeleteUserService.default();
    await deleteUser.execute(id);
    return res.json([]);
  }
  async deleteAll(req, res) {
    const deleteUser = new _DeleteAll.default();
    const deleteAll = await deleteUser.execute();
    return res.json(deleteAll);
  }
}
var _default = UserController;
exports.default = _default;