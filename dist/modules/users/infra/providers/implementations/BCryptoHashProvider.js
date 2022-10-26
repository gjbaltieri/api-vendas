"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptjs = require("bcryptjs");
class BCryptoHashProvider {
  async generateHash(payload) {
    return await (0, _bcryptjs.hash)(payload, 8);
  }
  async compareHash(payload, hash) {
    return await (0, _bcryptjs.compare)(payload, hash);
  }
}
var _default = BCryptoHashProvider;
exports.default = _default;