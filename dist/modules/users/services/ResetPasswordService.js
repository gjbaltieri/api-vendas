"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _dateFns = require("date-fns");
var _bcryptjs = require("bcryptjs");
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _IUserTokenRepository = require("../domain/repository/IUserTokenRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _tsyringe.injectable)();
let ResetPasswordService = (_dec = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokenRepository.IUserTokenRepository === "undefined" ? Object : _IUserTokenRepository.IUserTokenRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ResetPasswordService {
  constructor(userRepository, userTokenRepository) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
  }
  async execute({
    token,
    password
  }) {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new _AppError.default('User Token does not exists or expired.');
    }
    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const tokenCreatedAt = userToken.created_At;
    const addedHour = (0, _dateFns.addHours)(tokenCreatedAt, 2);
    if ((0, _dateFns.isAfter)(Date.now(), addedHour)) {
      throw new _AppError.default('Token expired.');
    }
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await this.userRepository.save(user);
    await this.userTokenRepository.remove(userToken);
  }
}) || _class) || _class) || _class) || _class);
var _default = ResetPasswordService;
exports.default = _default;