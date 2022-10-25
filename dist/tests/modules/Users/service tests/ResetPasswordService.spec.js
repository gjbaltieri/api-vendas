"use strict";

require("reflect-metadata");
require("dotenv/config");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _fakeUserTokenRepository = _interopRequireDefault(require("../fakeRepository/fakeUserTokenRepository"));
var _ResetPasswordService = _interopRequireDefault(require("../../../../modules/users/services/ResetPasswordService"));
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let resetPasswordService;
let createUserService;
let userTokenRepository;
let User;
let UserToken;
describe.only('Send forgot Password Email suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    userTokenRepository = new _fakeUserTokenRepository.default();
    resetPasswordService = new _ResetPasswordService.default(fakeUserRepository, userTokenRepository);
    createUserService = new _CreateUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake user',
      email: 'fakeemail@email.com',
      password: 'fakepassword'
    });
  });
  it('should reset a password', async () => {
    const UserToken = await userTokenRepository.generate(User.id);
    const resetPassword = await resetPasswordService.execute({
      token: UserToken.token,
      password: 'NewPassword'
    });
    expect(resetPassword).toBe(void 0);
  });
  it('should a reject reset password (invalid Token)', async () => {
    expect(resetPasswordService.execute({
      token: 'Invalid_Token',
      password: 'NewPassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject reset password (invalid user_id)', async () => {
    const UserToken = await userTokenRepository.generate(User.id);
    UserToken.user_id = 'Invalid_user_id';
    expect(resetPasswordService.execute({
      token: UserToken.token,
      password: 'NewPassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject reset password (token expires)', async () => {
    const UserToken = await userTokenRepository.generate(User.id);
    UserToken.created_At = (0, _dateFns.subHours)(Date.now(), 10);
    expect(resetPasswordService.execute({
      token: UserToken.token,
      password: 'NewPassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});