"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListUserService {
  async execute() {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const users = await userRepository.find();
    return users;
  }
}
var _default = ListUserService;
exports.default = _default;