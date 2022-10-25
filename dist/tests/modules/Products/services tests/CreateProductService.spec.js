"use strict";

require("reflect-metadata");
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _fakeProductRepository = _interopRequireDefault(require("../fakeRepository/fakeProductRepository"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeProductRepository;
let createProductService;
describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new _fakeProductRepository.default();
    createProductService = new _CreateProductService.default(fakeProductRepository);
  });
  it('should a create a new Product', async () => {
    const product = await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20
    });
    expect(product).toHaveProperty('id');
  });
  it('should a create a new Product', async () => {
    await createProductService.execute({
      name: 'FAKE_PRODUCT',
      price: 30,
      quantity: 20
    });
    expect(createProductService.execute({
      name: 'FAKE_PRODUCT',
      price: 30,
      quantity: 20
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});