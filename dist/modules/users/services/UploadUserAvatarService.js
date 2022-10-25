"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _fs = _interopRequireDefault(require("fs"));
var _Upload = _interopRequireDefault(require("../../../config/Upload"));
var _path = _interopRequireDefault(require("path"));
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UpdateAvatarService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateAvatarService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    user_id,
    avatar
  }) {
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    if (user.avatar) {
      const avatarPath = _path.default.join(_Upload.default.directory, user.avatar);
      const avatarExists = await _fs.default.promises.stat(avatarPath);
      if (avatarExists) {
        await _fs.default.promises.unlink(avatarPath);
      }
    }
    user.avatar = avatar;
    await this.userRepository.save(user);
    return user;
  }
}) || _class) || _class) || _class) || _class);
var _default = UpdateAvatarService;
exports.default = _default;