"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UsersRepository = _interopRequireDefault(require("../typeorm/repository/UsersRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class deleteAllUserService {
  async execute() {
    const userRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.default);
    const deleteAll = await userRepository.delete({});
    return deleteAll;
  }
}
var _default = deleteAllUserService;
exports.default = _default;