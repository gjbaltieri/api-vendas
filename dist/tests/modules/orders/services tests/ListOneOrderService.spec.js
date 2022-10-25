"use strict";

require("reflect-metadata");
var _CreateOrderService = _interopRequireDefault(require("../../../../modules/orders/services/CreateOrderService"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _fakeProductRepository = _interopRequireDefault(require("../../Products/fakeRepository/fakeProductRepository"));
var _fakeOrderRepository = _interopRequireDefault(require("../fake repository/fakeOrderRepository"));
var _fakeCustomerRepository = _interopRequireDefault(require("../../customer/fakeRepository/fakeCustomerRepository"));
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _AppError = _interopRequireDefault(require("../../../../shared/errors/AppError"));
var _ListOneOrderService = _interopRequireDefault(require("../../../../modules/orders/services/ListOneOrderService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeOrdersRepository;
let fakeCustomerRepository;
let fakeProductRepository;
let createProductService;
let createCustomerService;
let createOrderService;
let listOneOrderService;
let MOCK_FAKE_PRODUCT;
let MOCK_SECOND_PRODUCT;
let MOCK_FAKE_CUSTOMER;
let MOCK_ORDER;
describe.only('List one orders suite tests', () => {
  beforeAll(async () => {
    fakeOrdersRepository = new _fakeOrderRepository.default();
    fakeProductRepository = new _fakeProductRepository.default();
    createProductService = new _CreateProductService.default(fakeProductRepository);
    listOneOrderService = new _ListOneOrderService.default(fakeOrdersRepository);
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
    createOrderService = new _CreateOrderService.default(fakeOrdersRepository, fakeProductRepository, fakeCustomerRepository);
    const productList = {
      customer_id: MOCK_FAKE_CUSTOMER.id,
      products: [{
        id: MOCK_FAKE_PRODUCT.id,
        quantity: 1
      }]
    };
    MOCK_ORDER = await createOrderService.execute(productList);
  });
  it('should list one order', async () => {
    const orders = await listOneOrderService.execute(MOCK_ORDER.id);
    expect(orders).toHaveProperty('order_products');
  });
  it('should reject list one order - (order not found)', async () => {
    expect(listOneOrderService.execute('INVALID_ORDER_ID')).rejects.toBeInstanceOf(_AppError.default);
  });
});