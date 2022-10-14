"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class createUserService {
  async execute({
    name,
    email,
    password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const emailExists = await userRepository.findByEmail(email);
    if (emailExists) {
      throw new _AppError.default('Email adress already used.');
    }
    const hashadPassword = await (0, _bcryptjs.hash)(password, 8);
    const createUser = userRepository.create({
      name,
      email,
      password: hashadPassword
    });
    const user = await userRepository.save(createUser);
    return user;
  }
}
var _default = createUserService;
exports.default = _default;