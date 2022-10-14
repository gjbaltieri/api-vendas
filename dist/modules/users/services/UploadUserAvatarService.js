"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _fs = _interopRequireDefault(require("fs"));
var _Upload = _interopRequireDefault(require("../../../config/Upload"));
var _path = _interopRequireDefault(require("path"));
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateAvatarService {
  async execute({
    user_id,
    avatar
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    if (user.avatar) {
      console.log('aqui', _Upload.default.directory);
      const avatarPath = _path.default.join(_Upload.default.directory, user.avatar);
      console.log('completo', avatarPath);
      const avatarExists = await _fs.default.promises.stat(avatarPath);
      if (avatarExists) {
        await _fs.default.promises.unlink(avatarPath);
      }
    }
    user.avatar = avatar;
    await userRepository.save(user);
    return user;
  }
}
var _default = UpdateAvatarService;
exports.default = _default;