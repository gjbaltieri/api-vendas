"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _UserToken = _interopRequireDefault(require("../../../../modules/users/infra/typeorm/entities/UserToken"));
var _crypto = require("crypto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class FakeUserTokenRepository {
  constructor() {
    _defineProperty(this, "orm", []);
  }
  async findByToken(token) {
    const userToken = this.orm.find(uToken => uToken.token === token);
    return userToken;
  }
  async generate(user_id) {
    const userToken = new _UserToken.default();
    userToken.id = (0, _crypto.randomUUID)();
    userToken.token = (0, _crypto.randomUUID)();
    userToken.user_id = user_id;
    userToken.created_At = new Date();
    userToken.updated_At = new Date();
    this.orm.push(userToken);
    return userToken;
  }
  async remove(userToken) {
    const token = this.orm.findIndex(uToken => uToken === userToken);
    this.orm.splice(token);
  }
}
var _default = FakeUserTokenRepository;
exports.default = _default;