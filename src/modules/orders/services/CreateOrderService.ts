import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IOrderRepository } from '../domain/interfaces/models/repository/IOrderRepository'
import { teste } from '../domain/interfaces/models/teste'
import Order from '../infra/typeorm/entities/Order'

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductRepository,
    @inject('CustomerRepository') private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ customer_id, products }: teste): Promise<Order> {
    const customerExists = await this.customerRepository.findById(customer_id)
    if (!customerExists) {
      throw new AppError('Could not find any customer with given id.')
    }
    const productsList = await this.productRepository.findAllByIds(products)
    if (!productsList.length) {
      throw new AppError('Could not find any products with given ids.')
    }
    const productIdExists = productsList.map(product => product.id)
    const checkInexistentId = products.filter(product => !productIdExists.includes(product.id))
    if (checkInexistentId.length) {
      throw new AppError(`${checkInexistentId.length} product(s) not found: ${checkInexistentId}`)
    }
    const quantityAvailable = products.filter(
      product => productsList.filter(p => p.id === product.id)[0].quantity < product.quantity,
    )
    // !!!!!!!!!!!!!! IMPORTANTE !!!!!!!!!!!!!!!!!!!!!!!!
    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} product(s) not found: ${quantityAvailable[0].id}`,
      )
    }
    const prepareProductsToSave = products.map(product => ({
      product_id: product.id,
      price: productsList.filter(p => p.id === product.id)[0].price,
      quantity: product.quantity,
    }))
    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      order_products: prepareProductsToSave,
    })
    const { order_products } = order
    const updatedQuantityProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: productsList.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }))
    console.log('updatedQuantityProductQuantity', updatedQuantityProductQuantity)
    await this.productRepository.save(updatedQuantityProductQuantity)
    return order
  }
}

export default CreateOrderService
