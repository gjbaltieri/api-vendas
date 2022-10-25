"use strict";

require("reflect-metadata");
var _fakeProductRepository = _interopRequireDefault(require("../fakeRepository/fakeProductRepository"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _UpdateProductService = _interopRequireDefault(require("../../../../modules/products/services/UpdateProductService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeProductRepository;
let updateProductService;
let createProductService;
let Product;
const fakeMockProduct = {
  id: '371e3939-7286-474c-a944-a7787eaba486',
  name: 'FakeProduct',
  price: 50,
  quantity: 10,
  created_At: '2022-10-21T13:10:39.563Z',
  updated_At: '2022-10-21T13:10:39.563Z'
};
describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new _fakeProductRepository.default();
    updateProductService = new _UpdateProductService.default(fakeProductRepository);
    createProductService = new _CreateProductService.default(fakeProductRepository);
    Product = await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20
    });
    await createProductService.execute({
      name: 'fake name',
      price: 30,
      quantity: 20
    });
  });
  it('should a find all Products', async () => {
    const product = {
      name: 'nome atualizado',
      price: 50,
      quantity: 20
    };
    const updatedProduct = await updateProductService.execute(Product.id, product);
    expect(product.name).toStrictEqual(updatedProduct?.name);
  });
  it('should return a product not found', async () => {
    const product = {
      name: 'nome atualizado',
      price: 50,
      quantity: 20
    };
    expect(updateProductService.execute(fakeMockProduct.id, product)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('there is already one product with this name', async () => {
    const product = {
      name: 'fake name',
      price: 50,
      quantity: 20
    };
    expect(updateProductService.execute(Product.id, product)).rejects.toBeInstanceOf(_AppError.default);
  });
});