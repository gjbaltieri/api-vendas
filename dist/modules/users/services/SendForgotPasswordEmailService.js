"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
var _UserTokenRepository = _interopRequireDefault(require("../typeorm/repository/UserTokenRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _EtheriumMail = _interopRequireDefault(require("../../../config/mail/EtheriumMail"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class SendForgotPasswordEmailService {
  async execute({
    email
  }) {
    const templatePath = _path.default.resolve(__dirname, '..', 'view', 'forgot_password.hbs');
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userTokenRepository = (0, _typeorm.getCustomRepository)(_UserTokenRepository.default);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new _AppError.default('User does not exists.');
    }
    const {
      token
    } = await userTokenRepository.generate(user.id);
    await _EtheriumMail.default.sendMail({
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
  }
}
var _default = SendForgotPasswordEmailService;
exports.default = _default;