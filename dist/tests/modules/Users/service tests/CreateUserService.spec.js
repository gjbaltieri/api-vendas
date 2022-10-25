"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createUserService;
let User;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should a create one User', async () => {
    const user = await createUserService.execute({
      name: 'Fake User',
      email: 'email@email.com',
      password: 'fake password'
    });
    expect(user).toHaveProperty('id');
  });
  it('should return email adress already used.', async () => {
    expect(createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fake password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});