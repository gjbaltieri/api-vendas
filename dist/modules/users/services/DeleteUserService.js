"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let deleteUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class deleteUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute(id) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new _AppError.default('User not found.');
    }
    await this.userRepository.remove(userExists);
  }
}) || _class) || _class) || _class) || _class);
var _default = deleteUserService;
exports.default = _default;