"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../errors/AppError"));
var _ioredis = _interopRequireDefault(require("ioredis"));
var _rateLimiterFlexible = require("rate-limiter-flexible");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
async function rateLimiter(req, res, next) {
  try {
    const redisClient = new _ioredis.default({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: String(process.env.REDIS_PASS || undefined)
    });
    const limiter = new _rateLimiterFlexible.RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1
    });
    await limiter.consume(req.ip);
    return next();
  } catch (error) {
    throw new _AppError.default('Too many requests.', 429);
  }
}
var _default = rateLimiter;
exports.default = _default;