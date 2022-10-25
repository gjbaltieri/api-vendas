"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _tsyringe = require("tsyringe");
var _IProductRepository = require("../domain/interfaces/repository/IProductRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let DeleteProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductRepository.IProductRepository === "undefined" ? Object : _IProductRepository.IProductRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute(id) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new _AppError.default('Product not found.');
    }
    await _RedisCache.default.invalidate('APIVENDAS_PRODUCT_LIST');
    await this.productRepository.delete(product);
  }
}) || _class) || _class) || _class) || _class);
var _default = DeleteProductService;
exports.default = _default;