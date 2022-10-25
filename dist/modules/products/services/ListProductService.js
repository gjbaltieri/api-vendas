"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _RedisCache = _interopRequireDefault(require("../../../shared/cache/RedisCache"));
var _tsyringe = require("tsyringe");
var _IProductRepository = require("../domain/interfaces/repository/IProductRepository");
var _dec, _dec2, _dec3, _dec4, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let ListProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductRepository.IProductRepository === "undefined" ? Object : _IProductRepository.IProductRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }
  async execute() {
    let products = await _RedisCache.default.recover('APIVENDAS_PRODUCT_LIST');
    if (!products) {
      products = await this.productRepository.find();
      await _RedisCache.default.save('APIVENDAS_PRODUCT_LIST', products);
    }
    return products;
  }
}) || _class) || _class) || _class) || _class);
var _default = ListProductService;
exports.default = _default;