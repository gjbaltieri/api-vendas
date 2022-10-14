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
class UpdateProductService {
  async execute(id, {
    name,
    price,
    quantity
  }) {
    const productRepository = (0, _typeorm.getCustomRepository)(_ProductRepository.default);
    const product = await productRepository.findOne(id);
    if (!product) {
      throw new _AppError.default('Product not found!');
    }
    const productName = await productRepository.findByName(name);
    if (productName && name !== product.name) {
      throw new _AppError.default('There is already one product with this name');
    }
    await _RedisCache.default.invalidate('APIVENDAS_PRODUCT_LIST');
    product.name = name;
    product.price = price;
    product.quantity = quantity;
    const newProduct = await productRepository.save(product);
    return newProduct;
  }
}
var _default = UpdateProductService;
exports.default = _default;