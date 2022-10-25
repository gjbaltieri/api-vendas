"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UpdateUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({
    id,
    name,
    email,
    password,
    old_password
  }) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new _AppError.default('User not found.');
    }
    const emailExists = await this.userRepository.findByEmail(email);
    if (emailExists && emailExists.id !== id) {
      throw new _AppError.default('There is already one user with this email');
    }
    if (password && !old_password) {
      throw new _AppError.default('Current password is required');
    }
    if (password && old_password) {
      const checkPassword = (0, _bcryptjs.compareSync)(old_password, user.password);
      if (!checkPassword) {
        throw new _AppError.default('Current password does not match.');
      }
      user.password = await (0, _bcryptjs.hash)(password, 8);
    }
    user.name = name;
    user.email = email;
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
}) || _class) || _class) || _class) || _class);
var _default = UpdateUserService;
exports.default = _default;