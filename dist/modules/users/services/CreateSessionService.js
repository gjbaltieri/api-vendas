"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _bcryptjs = require("bcryptjs");
var _AuthConfig = _interopRequireDefault(require("../../../config/AuthConfig"));
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
var _jsonwebtoken = require("jsonwebtoken");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class createSessionService {
  async execute({
    email,
    password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('Invalid email or password.', 401);
    }
    const unhashPassword = await (0, _bcryptjs.compare)(password, user.password);
    if (!unhashPassword) {
      throw new _AppError.default('Invalid email or password.', 401);
    }
    const token = (0, _jsonwebtoken.sign)({}, _AuthConfig.default.jwt.secret, {
      subject: user.id,
      expiresIn: _AuthConfig.default.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }
}
var _default = createSessionService;
exports.default = _default;