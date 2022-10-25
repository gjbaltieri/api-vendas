"use strict";

require("reflect-metadata");
var _fakeProductRepository = _interopRequireDefault(require("../fakeRepository/fakeProductRepository"));
var _ListProductService = _interopRequireDefault(require("../../../../modules/products/services/ListProductService"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeProductRepository;
let listProductService;
let createProductService;
describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new _fakeProductRepository.default();
    listProductService = new _ListProductService.default(fakeProductRepository);
    createProductService = new _CreateProductService.default(fakeProductRepository);
    await createProductService.execute({
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
  it('should a find all Products', async () => {
    const product = await listProductService.execute();
    expect(product.length >= 2);
  });
});