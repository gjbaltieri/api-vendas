import CustomerRepository from '@modules/customers/infra/typeorm/repository/CustomersRepository'
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Order from '../infra/typeorm/entities/Order'
import OrderRepository from '../infra/typeorm/repositories/OrderRepository'

interface IProduct {
  id: string
  price: number
  quantity: number
}

interface IRequest {
  customer_id: string
  products: IProduct[]
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository)
    const customerRepository = getCustomRepository(CustomerRepository)
    const productRepository = getCustomRepository(ProductRepository)
    const customerExists = await customerRepository.findById(customer_id)
    if (!customerExists) {
      throw new AppError('Could not find any customer with given id.')
    }

    const productsList = await productRepository.findAllByIds(products)
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
    const order = await orderRepository.createOrder({ customer: customerExists, products: prepareProductsToSave })

    const { order_products } = order
    const updatedQuantityProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: productsList.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }))
    await productRepository.save(updatedQuantityProductQuantity)

    return order
  }
}

export default CreateOrderService
