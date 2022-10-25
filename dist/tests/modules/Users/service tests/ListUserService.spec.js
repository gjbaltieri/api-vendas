"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _ListUserService = _interopRequireDefault(require("../../../../modules/users/services/ListUserService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createUserService;
let listUserService;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    listUserService = new _ListUserService.default(fakeUserRepository);
    await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should a return all Users', async () => {
    const user = await listUserService.execute();
    expect(user.length >= 1);
  });
});