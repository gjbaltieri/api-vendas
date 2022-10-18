import { IOrder } from '@shared/interface/relationship/IOrder'
import { inject, injectable } from 'tsyringe'
import { IOrderRepository } from '../domain/interfaces/models/repository/IOrderRepository'

@injectable()
class ListAllOrderService {
  constructor(@inject('OrderRepository') private orderRepository: IOrderRepository) {}
  public async execute(): Promise<IOrder[]> {
    const orders = await this.orderRepository.find()

    return orders
  }
}

export default ListAllOrderService
