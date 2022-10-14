"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
var _UserTokenRepository = _interopRequireDefault(require("../typeorm/repository/UserTokenRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _dateFns = require("date-fns");
var _bcryptjs = require("bcryptjs");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ResetPasswordService {
  async execute({
    token,
    password
  }) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokenRepository.default);
    const userToken = await userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new _AppError.default('User Token does not exists or expired.');
    }
    const user = await userRepository.findById(userToken.user_id);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const tokenCreatedAt = userToken.created_At;
    const addedHour = (0, _dateFns.addHours)(tokenCreatedAt, 2);
    if ((0, _dateFns.isAfter)(Date.now(), addedHour)) {
      throw new _AppError.default('Token expired.');
    }
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await userRepository.save(user);
    await userTokenRepository.remove(userToken);
  }
}
var _default = ResetPasswordService;
exports.default = _default;