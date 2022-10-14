"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateProductService = _interopRequireDefault(require("../services/CreateProductService"));
var _DeleteProductService = _interopRequireDefault(require("../services/DeleteProductService"));
var _ListProductService = _interopRequireDefault(require("../services/ListProductService"));
var _ShowProductService = _interopRequireDefault(require("../services/ShowProductService"));
var _UpdateProductService = _interopRequireDefault(require("../services/UpdateProductService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProductController {
  async listAll(request, response) {
    const listOne = new _ListProductService.default();
    const product = await listOne.execute();
    return response.json(product);
  }
  async listOne(request, response) {
    const {
      id
    } = request.params;
    const listAll = new _ShowProductService.default();
    const products = await listAll.execute(id);
    return response.json(products);
  }
  async create(request, response) {
    const {
      name,
      price,
      quantity
    } = request.body;
    const createProduct = new _CreateProductService.default();
    const product = await createProduct.execute({
      name,
      price,
      quantity
    });
    return response.json(product);
  }
  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      name,
      price,
      quantity
    } = request.body;
    const updateProduct = new _UpdateProductService.default();
    const product = await updateProduct.execute(id, {
      name,
      price,
      quantity
    });
    return response.json(product);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteProduct = new _DeleteProductService.default();
    await deleteProduct.execute({
      id
    });
    return response.json([]);
  }
}
var _default = ProductController;
exports.default = _default;