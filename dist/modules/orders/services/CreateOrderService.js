"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CustomersRepository = _interopRequireDefault(require("../../customers/typeorm/repository/CustomersRepository"));
var _ProductRepository = _interopRequireDefault(require("../../products/typeorm/repositories/ProductRepository"));
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _OrderRepository = _interopRequireDefault(require("../typeorm/repositories/OrderRepository"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class CreateOrderService {
  async execute({
    customer_id,
    products
  }) {
    const orderRepository = (0, _typeorm.getCustomRepository)(_OrderRepository.default);
    const customerRepository = (0, _typeorm.getCustomRepository)(_CustomersRepository.default);
    const productRepository = (0, _typeorm.getCustomRepository)(_ProductRepository.default);
    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new _AppError.default('Could not find any customer with given id.');
    }
    const productsList = await productRepository.findAllByIds(products);
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
      product_id: product.id,
      price: productsList.filter(p => p.id === product.id)[0].price,
      quantity: product.quantity
    }));
    const order = await orderRepository.createOrder({
      customer: customerExists,
      products: prepareProductsToSave
    });
    const {
      order_products
    } = order;
    const updatedQuantityProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: productsList.filter(p => p.id === product.product_id)[0].quantity - product.quantity
    }));
    await productRepository.save(updatedQuantityProductQuantity);
    return order;
  }
}
var _default = CreateOrderService;
exports.default = _default;