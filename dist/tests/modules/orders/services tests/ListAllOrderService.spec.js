"use strict";

require("reflect-metadata");
var _CreateOrderService = _interopRequireDefault(require("../../../../modules/orders/services/CreateOrderService"));
var _CreateProductService = _interopRequireDefault(require("../../../../modules/products/services/CreateProductService"));
var _fakeProductRepository = _interopRequireDefault(require("../../Products/fakeRepository/fakeProductRepository"));
var _fakeOrderRepository = _interopRequireDefault(require("../fake repository/fakeOrderRepository"));
var _fakeCustomerRepository = _interopRequireDefault(require("../../customer/fakeRepository/fakeCustomerRepository"));
var _CreateCustomerService = _interopRequireDefault(require("../../../../modules/customers/services/CreateCustomerService"));
var _ListAllOrderService = _interopRequireDefault(require("../../../../modules/orders/services/ListAllOrderService"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let fakeOrdersRepository;
let fakeCustomerRepository;
let fakeProductRepository;
let createProductService;
let createCustomerService;
let createOrderService;
let listAllOrderService;
let MOCK_FAKE_PRODUCT;
let MOCK_SECOND_PRODUCT;
let MOCK_FAKE_CUSTOMER;
describe.only('List all orders suite tests', () => {
  beforeAll(async () => {
    fakeOrdersRepository = new _fakeOrderRepository.default();
    fakeProductRepository = new _fakeProductRepository.default();
    createProductService = new _CreateProductService.default(fakeProductRepository);
    listAllOrderService = new _ListAllOrderService.default(fakeOrdersRepository);
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
    await createOrderService.execute(productList);
  });
  it('should list all orders', async () => {
    const orders = await listAllOrderService.execute();
    expect(orders.length > 0);
  });
});