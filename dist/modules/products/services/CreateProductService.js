"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _ProductRepository = _interopRequireDefault(require("../typeorm/repositories/ProductRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateProductService {
  async execute({
    name,
    price,
    quantity
  }) {
    const productRepository = (0, _typeorm.getCustomRepository)(_ProductRepository.default);
    const productName = await productRepository.findByName(name);
    if (productName) {
      throw new _AppError.default('There is already one product with this name');
    }
    await _RedisCache.default.invalidate('APIVENDAS_PRODUCT_LIST');
    const product = productRepository.create({
      name,
      price,
      quantity
    });
    await productRepository.save(product);
    return product;
  }
}
var _default = CreateProductService;
exports.default = _default;