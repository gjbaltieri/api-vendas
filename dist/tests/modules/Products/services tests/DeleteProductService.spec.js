"use strict";

require("reflect-metadata");
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _DeleteProductService = _interopRequireDefault(require("../../../../modules/products/services/DeleteProductService"));
var _fakeProductRepository = _interopRequireDefault(require("../fakeRepository/fakeProductRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeProductRepository;
let deleteProductService;
let createProductService;
let product;
const fakeMockProduct = {
  id: '371e3939-7286-474c-a944-a7787eaba486',
  name: 'FakeProduct',
  price: 50,
  quantity: 10,
  created_At: '2022-10-21T13:10:39.563Z',
  updated_At: '2022-10-21T13:10:39.563Z'
};
describe('Delete Product Suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new _fakeProductRepository.default();
    deleteProductService = new _DeleteProductService.default(fakeProductRepository);
    createProductService = new _CreateProductService.default(fakeProductRepository);
    product = await createProductService.execute({
      name: 'FakeProduct',
      price: 50,
      quantity: 10
    });
  });
  it('should delete a product', async () => {
    await deleteProductService.execute(product.id);
    const allProducts = await fakeProductRepository.find();
    expect(allProducts).toEqual([]);
  });
  it('should return Product not found', async () => {
    expect(deleteProductService.execute(fakeMockProduct.id)).rejects.toBeInstanceOf(_AppError.default);
  });
});