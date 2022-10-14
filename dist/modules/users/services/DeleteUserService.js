"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class deleteUserService {
  async execute(id) {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const userExists = await userRepository.findOne(id);
    if (!userExists) {
      throw new _AppError.default('User not found.');
    }
    await userRepository.remove(userExists);
  }
}
var _default = deleteUserService;
exports.default = _default;