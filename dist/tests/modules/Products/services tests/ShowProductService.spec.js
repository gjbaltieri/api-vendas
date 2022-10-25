"use strict";

require("reflect-metadata");
var _fakeProductRepository = _interopRequireDefault(require("../fakeRepository/fakeProductRepository"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _ShowProductService = _interopRequireDefault(require("../../../../modules/products/services/ShowProductService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeProductRepository;
let showProductService;
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
    showProductService = new _ShowProductService.default(fakeProductRepository);
    createProductService = new _CreateProductService.default(fakeProductRepository);
    Product = await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20
    });
    await createProductService.execute({
      name: 'teste2',
      price: 30,
      quantity: 20
    });
  });
  it('should a find and show one Product', async () => {
    const showProduct = await showProductService.execute(Product.id);
    expect(showProduct).toStrictEqual(Product);
  });
  it('should a find and show one Product', async () => {
    expect(showProductService.execute(fakeMockProduct.id)).rejects.toBeInstanceOf(_AppError.default);
  });
});