"use strict";

require("reflect-metadata");
var _CreateOrderService = _interopRequireDefault(require("../../../../modules/orders/services/CreateOrderService"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _fakeProductRepository = _interopRequireDefault(require("../../Products/fakeRepository/fakeProductRepository"));
var _fakeOrderRepository = _interopRequireDefault(require("../fake repository/fakeOrderRepository"));
var _fakeCustomerRepository = _interopRequireDefault(require("../../customer/fakeRepository/fakeCustomerRepository"));
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeOrdersRepository;
let fakeCustomerRepository;
let fakeProductRepository;
let createProductService;
let createCustomerService;
let createOrderService;
let MOCK_FAKE_PRODUCT;
let MOCK_SECOND_PRODUCT;
let MOCK_FAKE_CUSTOMER;
describe.only('Create order suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new _fakeProductRepository.default();
    createProductService = new _CreateProductService.default(fakeProductRepository);
    MOCK_FAKE_PRODUCT = await createProductService.execute({
      name: 'FAKE_PRODUCT',
      price: 10,
      quantity: 5
    });
    MOCK_SECOND_PRODUCT = await createProductService.execute({
      name: 'ANOTHER_FAKE_PRODUCT',
      price: 100,
      quantity: 50
    });
    fakeCustomerRepository = new _fakeCustomerRepository.default();
    createCustomerService = new _CreateCustomerService.default(fakeCustomerRepository);
    MOCK_FAKE_CUSTOMER = await createCustomerService.execute({
      name: 'Fake_Customer',
      email: 'fake@mail.com'
    });
    fakeOrdersRepository = new _fakeOrderRepository.default();
    createOrderService = new _CreateOrderService.default(fakeOrdersRepository, fakeProductRepository, fakeCustomerRepository);
  });
  it('should create order', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{
        id: MOCK_FAKE_PRODUCT.id,
        quantity: 1
      }]
    };
    const order = await createOrderService.execute(productList);
    expect(order).toHaveProperty('order_products');
  });
  it('should reject create order - (user not found)', async () => {
    const productList = {
      customer_id: 'INVALID_ID',
      products: [{
        id: MOCK_FAKE_PRODUCT.id,
        quantity: 1
      }]
    };
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should reject create order - ( 0 products found)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{
        id: 'INVALID_PRODUCT_ID',
        quantity: 1
      }]
    };
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should reject create order - (One product not found)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{
        id: MOCK_FAKE_PRODUCT.id,
        quantity: 1
      }, {
        id: 'INVALID_PRODUCT_ID',
        quantity: 1
      }]
    };
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should reject create order - (product quantity unvailable)', async () => {
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{
        id: MOCK_FAKE_PRODUCT.id,
        quantity: 1
      }, {
        id: MOCK_SECOND_PRODUCT.id,
        quantity: MOCK_SECOND_PRODUCT.quantity + 1
      }]
    };
    expect(createOrderService.execute(productList)).rejects.toBeInstanceOf(_AppError.default);
  });
});