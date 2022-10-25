"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _EtheriumMail = _interopRequireDefault(require("../../../config/mail/EtheriumMail"));
var _path = _interopRequireDefault(require("path"));
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _IUserTokenRepository = require("../domain/repository/IUserTokenRepository");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let SendForgotPasswordEmailService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokenRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository, typeof _IUserTokenRepository.IUserTokenRepository === "undefined" ? Object : _IUserTokenRepository.IUserTokenRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class SendForgotPasswordEmailService {
  constructor(userRepository, userTokenRepository) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
  }
  async execute({
    email
  }) {
    const templatePath = _path.default.resolve(__dirname, '..', 'view', 'forgot_password.hbs');
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const {
      token
    } = await this.userTokenRepository.generate(user.id);
    const message = await _EtheriumMail.default.sendMail({
      to: {
        name: user.name,
        address: email
      },
      subject: 'Troca de senha',
      templateData: {
        file: templatePath,
        variables: {
          name: user.name,
          link: `${process.env.API_WEB_URL}/reset_password?token=${token}`
        }
      }
    });
    return message;
  }
}) || _class) || _class) || _class) || _class) || _class);
var _default = SendForgotPasswordEmailService;
exports.default = _default;