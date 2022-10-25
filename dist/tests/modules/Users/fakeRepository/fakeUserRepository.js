"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _User = _interopRequireDefault(require("../../../../modules/users/infra/typeorm/entities/User"));
var _crypto = require("crypto");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class FakeUsersRepository {
  constructor() {
    _defineProperty(this, "Users", []);
  }
  async find() {
    const user = this.Users;
    return user;
  }
  async findByName(name) {
    const user = this.Users.find(user => user.name === name);
    return user;
  }
  async findById(id) {
    const user = this.Users.find(user => user.id === id);
    return user;
  }
  async findByEmail(email) {
    const user = this.Users.find(user => user.email === email);
    return user;
  }
  async create({
    name,
    email,
    password
  }) {
    const user = new _User.default();
    user.id = (0, _crypto.randomUUID)();
    user.name = name;
    user.email = email;
    user.password = password;
    user.created_At = new Date();
    user.updated_At = new Date();
    this.Users.push(user);
    return user;
  }
  async save(user) {
    this.Users.push(user);
    return user;
  }
  async remove(user) {
    const userIndex = this.Users.findIndex(u => u === user);
    this.Users.splice(userIndex);
  }
}
var _default = FakeUsersRepository;
exports.default = _default;