"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ICustomerRepository = require("../../customers/domain/interfaces/repository/ICustomerRepository");
var _IProductRepository = require("../../products/domain/interfaces/repository/IProductRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _tsyringe = require("tsyringe");
var _IOrderRepository = require("../domain/interfaces/models/repository/IOrderRepository");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CustomerRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrderRepository.IOrderRepository === "undefined" ? Object : _IOrderRepository.IOrderRepository, typeof _IProductRepository.IProductRepository === "undefined" ? Object : _IProductRepository.IProductRepository, typeof _ICustomerRepository.ICustomerRepository === "undefined" ? Object : _ICustomerRepository.ICustomerRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
  constructor(orderRepository, productRepository, customerRepository) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
  }
  async execute({
    customer_id,
    products
  }) {
    const customerExists = await this.customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new _AppError.default('Could not find any customer with given id.');
    }
    const productsList = await this.productRepository.findAllByIds(products);
    if (!productsList.length) {
      throw new _AppError.default('Could not find any products with given ids.');
    }
    const productIdExists = productsList.map(product => product.id);
    const checkInexistentId = products.filter(product => !productIdExists.includes(product.id));
    if (checkInexistentId.length) {
      throw new _AppError.default(`${checkInexistentId.length} product(s) not found: ${checkInexistentId}`);
    }
    const quantityAvailable = products.filter(product => productsList.filter(p => p.id === product.id)[0].quantity < product.quantity);
    // !!!!!!!!!!!!!! IMPORTANTE !!!!!!!!!!!!!!!!!!!!!!!!
    if (quantityAvailable.length) {
      throw new _AppError.default(`The quantity ${quantityAvailable[0].quantity} product(s) not found: ${quantityAvailable[0].id}`);
    }
    const prepareProductsToSave = products.map(product => ({
      id: product.id,
      price: productsList.filter(p => p.id === product.id)[0].price,
      quantity: product.quantity
    }));
    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      product: prepareProductsToSave
    });
    const {
      order_products
    } = order;
    const updatedQuantityProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity: productsList.filter(p => p.id === product.id)[0].quantity - product.quantity
    }));
    await this.productRepository.save(updatedQuantityProductQuantity);
    return order;
  }
}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateOrderService;
exports.default = _default;