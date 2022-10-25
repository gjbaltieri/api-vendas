"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tsyringe = require("tsyringe");
var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));
var _DeleteProductService = _interopRequireDefault(require("../../../services/DeleteProductService"));
var _ListProductService = _interopRequireDefault(require("../../../services/ListProductService"));
var _ShowProductService = _interopRequireDefault(require("../../../services/ShowProductService"));
var _UpdateProductService = _interopRequireDefault(require("../../../services/UpdateProductService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ProductController {
  async listAll(request, response) {
    const listAll = _tsyringe.container.resolve(_ListProductService.default);
    const product = await listAll.execute();
    return response.json(product);
  }
  async listOne(request, response) {
    const {
      id
    } = request.params;
    const listOne = _tsyringe.container.resolve(_ShowProductService.default);
    const products = await listOne.execute(id);
    return response.json(products);
  }
  async create(request, response) {
    const {
      name,
      price,
      quantity
    } = request.body;
    const createProduct = _tsyringe.container.resolve(_CreateProductService.default);
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
    const updateProduct = _tsyringe.container.resolve(_UpdateProductService.default);
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
    const deleteProduct = _tsyringe.container.resolve(_DeleteProductService.default);
    await deleteProduct.execute(id);
    return response.json([]);
  }
}
var _default = ProductController;
exports.default = _default;