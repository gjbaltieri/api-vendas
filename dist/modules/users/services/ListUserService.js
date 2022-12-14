"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _IUserRepository = require("../domain/repository/IUserRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let ListUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UserRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUserRepository.IUserRepository === "undefined" ? Object : _IUserRepository.IUserRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute() {
    const users = await this.userRepository.find();
    return users;
  }
}) || _class) || _class) || _class) || _class);
var _default = ListUserService;
exports.default = _default;