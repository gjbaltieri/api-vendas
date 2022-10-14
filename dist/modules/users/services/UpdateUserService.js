"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class UpdateUserService {
  async execute({
    id,
    name,
    email,
    password,
    old_password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findById(id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      throw new _AppError.default('There is already one user with this email');
    }
    if (password && !old_password) {
      throw new _AppError.default('Current password is required');
    }
    if (password === old_password) {
      throw new _AppError.default('The new password must be different from the current one.');
    }
    if (password && old_password) {
      const checkPassword = await (0, _bcryptjs.compare)(old_password, user.password);
      if (!checkPassword) {
        throw new _AppError.default('Current password does not match.');
      }
      user.password = await (0, _bcryptjs.hash)(password, 8);
    }
    user.name = name;
    user.email = email;
    const newUser = await userRepository.save(user);
    return newUser;
  }
}
var _default = UpdateUserService;
exports.default = _default;