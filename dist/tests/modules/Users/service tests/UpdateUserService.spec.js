"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _UpdateUserService = _interopRequireDefault(require("../../../../modules/users/services/UpdateUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createUserService;
let updateUserService;
let User;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    updateUserService = new _UpdateUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
    await createUserService.execute({
      name: 'Fake User',
      email: 'fake@email.com',
      password: 'fakePassword'
    });
  });
  it('should a update one User', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: User.password,
      old_password: 'fakePassword'
    };
    const user = await updateUserService.execute(updateUser);
    expect(user.name).toEqual(User.name);
  });
  it('should a reject update one User (User not found)', async () => {
    const updateUser = {
      id: 'FakeID',
      name: 'New Name',
      email: User.email,
      password: User.password,
      old_password: 'fakePassword'
    };
    expect(updateUserService.execute(updateUser)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject update one User (old_password does not match)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: 'new Password',
      old_password: 'another_old_password'
    };
    const newUser = updateUserService.execute(updateUser);
    expect(newUser).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject update one User (email is already used)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: 'fake@email.com',
      password: User.password,
      old_password: 'fakePassword'
    };
    expect(updateUserService.execute(updateUser)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should a reject update one User (old_password not provid)', async () => {
    const updateUser = {
      id: User.id,
      name: 'New Name',
      email: User.email,
      password: User.password
    };
    expect(updateUserService.execute(updateUser)).rejects.toBeInstanceOf(_AppError.default);
  });
});