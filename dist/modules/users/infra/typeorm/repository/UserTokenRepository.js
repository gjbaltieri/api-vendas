"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UserToken = _interopRequireDefault(require("../entities/UserToken"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class UserTokenRepository {
  constructor() {
    _defineProperty(this, "orm", void 0);
    this.orm = (0, _typeorm.getRepository)(_UserToken.default);
  }
  async findByToken(token) {
    const userToken = await this.orm.findOne({
      where: {
        token
      }
    });
    return userToken;
  }
  async generate(user_id) {
    const userToken = this.orm.create({
      user_id
    });
    await this.orm.save(userToken);
    return userToken;
  }
  async remove(userToken) {
    await this.orm.remove(userToken);
  }
}
var _default = UserTokenRepository;
exports.default = _default;