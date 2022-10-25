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
let UpdateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductRepository.IProductRepository === "undefined" ? Object : _IProductRepository.IProductRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class UpdateProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute(id, data) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new _AppError.default('Product not found', 404);
    }
    const productName = await this.productRepository.findByName(data.name);
    if (productName && data.name !== product.name) {
      throw new _AppError.default('There is already one product with this name');
    }
    await _RedisCache.default.invalidate('APIVENDAS_PRODUCT_LIST');
    product.name = data.name;
    product.price = data.price;
    product.quantity = data.quantity;
    const newProduct = await this.productRepository.create(product);
    return newProduct;
  }
}) || _class) || _class) || _class) || _class);
var _default = UpdateProductService;
exports.default = _default;