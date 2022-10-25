"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _User = _interopRequireDefault(require("../entities/User"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class UsersRepository {
  constructor() {
    _defineProperty(this, "orm", void 0);
    this.orm = (0, _typeorm.getRepository)(_User.default);
  }
  async find() {
    const user = await this.orm.find();
    return user;
  }
  async findByName(name) {
    const user = await this.orm.findOne({
      where: {
        name
      }
    });
    return user;
  }
  async findById(id) {
    const user = await this.orm.findOne({
      where: {
        id
      }
    });
    return user;
  }
  async findByEmail(email) {
    const user = await this.orm.findOne({
      where: {
        email
      }
    });
    return user;
  }
  async create({
    name,
    email,
    password
  }) {
    const user = this.orm.create({
      name,
      email,
      password
    });
    await this.orm.save(user);
    return user;
  }
  async save(user) {
    await this.orm.save(user);
    return user;
  }
  async remove(user) {
    this.orm.remove(user);
  }
}
var _default = UsersRepository;
exports.default = _default;