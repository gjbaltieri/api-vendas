"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _SendForgotPasswordEmailService = _interopRequireDefault(require("../services/SendForgotPasswordEmailService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class forgotPasswordController {
  async create(req, res) {
    const {
      email
    } = req.body;
    const sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default();
    await sendForgotPasswordEmail.execute({
      email
    });
    return res.status(204).json();
  }
}
var _default = forgotPasswordController;
exports.default = _default;