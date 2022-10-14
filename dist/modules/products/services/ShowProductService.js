"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _ProductRepository = _interopRequireDefault(require("../typeorm/repositories/ProductRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ShowProductService {
  async execute(id) {
    const productRepository = (0, _typeorm.getCustomRepository)(_ProductRepository.default);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new _AppError.default('Product not found!');
    }
    return product;
  }
}
var _default = ShowProductService;
exports.default = _default;