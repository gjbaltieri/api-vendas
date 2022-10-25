"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _HandlebarsEmailTemplate = _interopRequireDefault(require("./HandlebarsEmailTemplate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class EtherealMail {
  static async sendMail({
    from,
    to,
    subject,
    templateData
  }) {
    const account = await _nodemailer.default.createTestAccount();
    const mailTemplate = new _HandlebarsEmailTemplate.default();
    const transporter = _nodemailer.default.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass
      }
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.address || 'suporte@apivendas.com.br'
      },
      to: {
        name: to.name,
        address: to.address
      },
      subject,
      html: await mailTemplate.parse(templateData)
    });
    const {
      messageId
    } = message;
    const messageLink = _nodemailer.default.getTestMessageUrl(message);
    return {
      messageId,
      messageLink
    };
  }
}
exports.default = EtherealMail;