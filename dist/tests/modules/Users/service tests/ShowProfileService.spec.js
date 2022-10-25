"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _ShowProfileService = _interopRequireDefault(require("../../../../modules/users/services/ShowProfileService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createUserService;
let showProfileService;
let User;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    showProfileService = new _ShowProfileService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
  });
  it('should a show user Profile', async () => {
    const profile = await showProfileService.execute(User.id);
    expect(profile.id).toMatch(User.id);
  });
  it('should reject show user Profile (user not found.)', async () => {
    expect(showProfileService.execute('fakeID')).rejects.toBeInstanceOf(_AppError.default);
  });
});