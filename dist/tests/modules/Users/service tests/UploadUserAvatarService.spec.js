"use strict";

require("reflect-metadata");
var _fakeUserRepository = _interopRequireDefault(require("../fakeRepository/fakeUserRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _CreateUserService = _interopRequireDefault(require("../../../../modules/users/services/CreateUserService"));
var _UploadUserAvatarService = _interopRequireDefault(require("../../../../modules/users/services/UploadUserAvatarService"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeUserRepository;
let createUserService;
let uploadUserAvatarService;
let User;
let UserWithAvatar;
describe('Create User suite tests', () => {
  beforeAll(async () => {
    fakeUserRepository = new _fakeUserRepository.default();
    createUserService = new _CreateUserService.default(fakeUserRepository);
    uploadUserAvatarService = new _UploadUserAvatarService.default(fakeUserRepository);
    User = await createUserService.execute({
      name: 'Fake User',
      email: 'fakeemail@email.com',
      password: 'fakePassword'
    });
    UserWithAvatar = await createUserService.execute({
      name: 'Fake User',
      email: 'anotherfake@email.com',
      password: 'fakePassword'
    });
    await uploadUserAvatarService.execute({
      user_id: UserWithAvatar.id,
      avatar: 'file_name.jpg'
    });
    _fs.default.promises.writeFile(_path.default.join(__dirname, '../../../../../uploads/file_name.jpg'), 'imageupload');
  });
  it('should a upload user Avatar', async () => {
    const profile = await uploadUserAvatarService.execute({
      user_id: User.id,
      avatar: 'file_name.jpg'
    });
    expect(profile.avatar).not.toEqual(null);
  });
  it('should reject upload user Avatar (user not found.)', async () => {
    expect(uploadUserAvatarService.execute({
      user_id: 'FakeID',
      avatar: 'file_name.jpg'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should change user Avatar', async () => {
    const changeUserAvatar = await uploadUserAvatarService.execute({
      user_id: UserWithAvatar.id,
      avatar: 'new_file_name.jpg'
    });
    expect(changeUserAvatar.avatar).toEqual('new_file_name.jpg');
  });
});