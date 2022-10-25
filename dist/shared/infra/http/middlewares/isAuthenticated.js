"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAuthenticated;
var _AppError = _interopRequireDefault(require("../../../errors/AppError"));
var _jsonwebtoken = require("jsonwebtoken");
var _AuthConfig = _interopRequireDefault(require("../../../../config/AuthConfig"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new _AppError.default('JWT Token is missing.');
  }
  const [, token] = authHeader.split(' ');
  try {
    const isValidToken = (0, _jsonwebtoken.verify)(token, _AuthConfig.default.jwt.secret);
    const {
      sub
    } = isValidToken;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token.');
  }
}