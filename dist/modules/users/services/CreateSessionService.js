"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _AuthConfig = _interopRequireDefault(require("../../../config/AuthConfig"));
var _jsonwebtoken = require("jsonwebtoken");
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _IBCryptoHashProvider = require("../infra/providers/models/IBCryptoHashProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createSessionService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('BCryptoHashProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IBCryptoHashProvider.IBCryptoHashProvider === "undefined" ? Object : _IBCryptoHashProvider.IBCryptoHashProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class createSessionService {
  constructor(userRepository, bCryptoHashProvider) {
    this.userRepository = userRepository;
    this.bCryptoHashProvider = bCryptoHashProvider;
  }
  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('Invalid email or password.', 401);
    }
    const unhashPassword = this.bCryptoHashProvider.compareHash(password, user.password);
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
}) || _class) || _class) || _class) || _class) || _class);
var _default = createSessionService;
exports.default = _default;