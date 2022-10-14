"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UploadUserAvatarService = _interopRequireDefault(require("../services/UploadUserAvatarService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UserAvatarController {
  async update(req, res) {
    const avatarService = new _UploadUserAvatarService.default();
    const user = await avatarService.execute({
      user_id: req.user.id,
      avatar: req.file.filename
    });
    return res.json(user);
  }
}
var _default = UserAvatarController;
exports.default = _default;