"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UserToken = _interopRequireDefault(require("../entities/UserToken"));
var _dec, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let UserTokenRepository = (_dec = (0, _typeorm.EntityRepository)(_UserToken.default), _dec(_class = class UserTokenRepository extends _typeorm.Repository {
  async findByToken(token) {
    const userToken = await this.findOne({
      where: {
        token
      }
    });
    return userToken;
  }
  async generate(user_id) {
    const userToken = this.create({
      user_id
    });
    await this.save(userToken);
    return userToken;
  }
}) || _class);
var _default = UserTokenRepository;
exports.default = _default;