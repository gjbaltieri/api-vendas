import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Order from '../infra/typeorm/entities/Order'
import OrderRepository from '../infra/typeorm/repositories/OrderRepository'

class ListOneOrderService {
  public async execute(id: string): Promise<Order | undefined> {
    const userRepository = getCustomRepository(OrderRepository)
    const order = await userRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }

    return order
  }
}

export default ListOneOrderService
