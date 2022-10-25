"use strict";

require("reflect-metadata");
require("dotenv/config");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _SendForgotPasswordEmailService = _interopRequireDefault(require("../../../../modules/users/services/SendForgotPasswordEmailService"));
var _fakeUserTokenRepository = _interopRequireDefault(require("../fakeRepository/fakeUserTokenRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let sendForgotPasswordEmailService;
let createUserService;
let userTokenRepository;
let User;
describe('Send forgot Password Email suite tests', () => {
  jest.setTimeout(60000);
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    userTokenRepository = new _fakeUserTokenRepository.default();
    sendForgotPasswordEmailService = new _SendForgotPasswordEmailService.default(fakeUserRepository, userTokenRepository);
    createUserService = new _CreateUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should send a email', async () => {
    const sendEmail = await sendForgotPasswordEmailService.execute({
      email: User.email
    });
    expect(sendEmail).toHaveProperty('messageLink');
  });
  it('should a reject create a send Email (user not found.)', async () => {
    expect(sendForgotPasswordEmailService.execute({
      email: 'Fake_email'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});