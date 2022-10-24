import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IOrderRepository } from '../domain/interfaces/models/repository/IOrderRepository'
import { INewOrder } from '../domain/interfaces/models/INewOrder'
import { IOrder } from '@shared/interface/relationship/IOrder'

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository') private orderRepository: IOrderRepository,
    @inject('ProductRepository') private productRepository: IProductRepository,
    @inject('CustomerRepository') private customerRepository: ICustomerRepository,
  ) {}
  public async execute({ customer_id, products }: INewOrder): Promise<IOrder> {
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
      id: product.id,
      price: productsList.filter(p => p.id === product.id)[0].price,
      quantity: product.quantity,
    }))
    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      product: prepareProductsToSave,
    })
    const { order_products } = order
    const updatedQuantityProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity: productsList.filter(p => p.id === product.id)[0].quantity - product.quantity,
    }))
    await this.productRepository.save(updatedQuantityProductQuantity)
    return order
  }
}

export default CreateOrderService
