"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cache = _interopRequireDefault(require("../../config/cache"));
var _ioredis = _interopRequireDefault(require("ioredis"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class RedisCache {
  constructor() {
    _defineProperty(this, "client", void 0);
    _defineProperty(this, "connected", false);
    if (!this.connected) {
      this.client = new _ioredis.default(_cache.default.config.redis);
      this.connected = true;
    }
  }
  async save(key, value) {
    await this.client.set(key, JSON.stringify(value));
  }
  async recover(key) {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const ParsedData = JSON.parse(data);
    return ParsedData;
  }
  async quit() {
    return await this.client.quit();
  }
  async invalidate(key) {
    await this.client.del(key);
  }
}
var _default = new RedisCache();
exports.default = _default;