"use strict";

require("reflect-metadata");
require("dotenv/config");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateSessionService = _interopRequireDefault(require("../../../../modules/users/services/CreateSessionService"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createSessionService;
let createUserService;
let User;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createSessionService = new _CreateSessionService.default(fakeUserRepository);
    createUserService = new _CreateUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should a create a Session', async () => {
    const user = await createSessionService.execute({
      email: User.email,
      password: 'fakePassword'
    });
    expect(user).toHaveProperty('token');
  });
  it('should a reject create a Session (email invalid)', async () => {
    expect(createSessionService.execute({
      email: 'another_fake@email.com',
      password: 'fakePassword'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject create a Session (password invalid)', async () => {
    const response = createSessionService.execute({
      email: 'fakeemail@email.com',
      password: 'another_fakePassword'
    });
    expect(response).rejects.toBeInstanceOf(_AppError.default);
  });
});