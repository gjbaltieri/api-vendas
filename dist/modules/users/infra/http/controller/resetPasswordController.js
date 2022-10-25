"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));
var _tsyringe = require("tsyringe");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class resetPasswordController {
  async create(req, res) {
    const {
      token,
      password
    } = req.body;
    const resetPasswordService = _tsyringe.container.resolve(_ResetPasswordService.default);
    await resetPasswordService.execute({
      token,
      password
    });
    return res.status(204).json();
  }
}
var _default = resetPasswordController;
exports.default = _default;