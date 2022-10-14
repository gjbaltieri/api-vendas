"use strict";

require("reflect-metadata");
require("dotenv/config");
var _AppError = _interopRequireDefault(require("../errors/AppError"));
var _express = _interopRequireDefault(require("express"));
require("express-async-errors");
var _cors = _interopRequireDefault(require("cors"));
var _routes = _interopRequireDefault(require("./routes"));
require("../typeorm");
var _celebrate = require("celebrate");
var _Upload = _interopRequireDefault(require("../../config/Upload"));
var _typeormPagination = require("typeorm-pagination");
var _rateLimiter = _interopRequireDefault(require("./middlewares/rateLimiter"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_rateLimiter.default);
app.use(_typeormPagination.pagination);
app.use('/files', _express.default.static(_Upload.default.directory));
app.use(_routes.default);
app.use((0, _celebrate.errors)());
app.use((error, req, res, next) => {
  if (error instanceof _AppError.default) {
    return res.status(error.statusCode).json({
      status: 'Error',
      message: error.message
    });
  }
  return res.status(500).json({
    status: 'Error',
    message: 'Internal server error'
  });
});
app.listen(process.env.PORT || 8000, () => {
  console.log(`server started in localhost:${process.env.PORT || 8000}`);
});