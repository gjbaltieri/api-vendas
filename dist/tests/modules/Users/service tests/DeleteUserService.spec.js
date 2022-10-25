"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _DeleteUserService = _interopRequireDefault(require("../../../../modules/users/services/DeleteUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let deleteUserService;
let createUserService;
let User;
const FakeUser = {
  created_At: '2022-10-21T14:06:34.289Z',
  email: 'fakeemail@email.com',
  id: '649e4bcd-5665-49c9-9c23-4b15118c724c',
  name: 'Fake User',
  password: '$2a$08$t2QzYCdrH2KUdJdu.Zk3h..rQuXcEl/KW2fi2UgDrXmadPtp2Ytvq',
  updated_At: '2022-10-21T14:06:34.289Z'
};
describe('Delete User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    deleteUserService = new _DeleteUserService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should a delete one User', async () => {
    await deleteUserService.execute(User.id);
    const findAll = await fakeUserRepository.find();
    expect(findAll).toStrictEqual([]);
  });
  it('should return user not found.', async () => {
    expect(deleteUserService.execute(FakeUser.id)).rejects.toBeInstanceOf(_AppError.default);
  });
});