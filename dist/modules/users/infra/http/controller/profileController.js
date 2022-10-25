"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));
var _UpdateUserService = _interopRequireDefault(require("../../../services/UpdateUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProfileController {
  async update(req, res) {
    const {
      id
    } = req.user;
    const {
      name,
      email,
      password,
      old_password
    } = req.body;
    const updateUser = _tsyringe.container.resolve(_UpdateUserService.default);
    const user = await updateUser.execute({
      id,
      name,
      email,
      password,
      old_password
    });
    return res.json(user);
  }
  async showProfile(req, res) {
    const {
      id
    } = req.user;
    const ListUser = _tsyringe.container.resolve(_ShowProfileService.default);
    const user = await ListUser.execute(id);
    return res.json(user);
  }
}
var _default = ProfileController;
exports.default = _default;