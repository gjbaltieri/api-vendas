import { getCustomRepository } from 'typeorm'
import Order from '../../typeorm/entities/Order'
import OrderRepository from '../../typeorm/repositories/OrderRepository'

class ListAllOrderService {
  public async execute(): Promise<Order[]> {
    const userRepository = getCustomRepository(OrderRepository)
    const orders = await userRepository.find({})

    return orders
  }
}

export default ListAllOrderService
