import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IOrderRepository } from '../domain/interfaces/models/repository/IOrderRepository'
import Order from '../infra/typeorm/entities/Order'

@injectable()
class ListOneOrderService {
  constructor(@inject('OrderRepository') private orderRepository: IOrderRepository) {}
  public async execute(id: string): Promise<Order | undefined> {
    const order = await this.orderRepository.findById(id)

    if (!order) {
      throw new AppError('Order not found.')
    }

    return order
  }
}

export default ListOneOrderService
