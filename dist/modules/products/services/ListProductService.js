"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProductRepository = _interopRequireDefault(require("../typeorm/repositories/ProductRepository"));
var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ListProductService {
  async execute() {
    const productRepository = (0, _typeorm.getCustomRepository)(_ProductRepository.default);
    let products = await _RedisCache.default.recover('APIVENDAS_PRODUCT_LIST');
    if (!products) {
      products = await productRepository.find();
      await _RedisCache.default.save('APIVENDAS_PRODUCT_LIST', products);
    }
    return products;
  }
}
var _default = ListProductService;
exports.default = _default;