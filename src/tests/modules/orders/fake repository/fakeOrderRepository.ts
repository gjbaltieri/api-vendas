import { EntityRepository } from 'typeorm'
import { IOrder } from '@shared/interface/relationship/IOrder'
import { IOrderRepository } from '@modules/orders/domain/interfaces/models/repository/IOrderRepository'
import Order from '@modules/orders/infra/typeorm/entities/Order'
import { randomUUID } from 'crypto'
import { ICreateOrder } from '@modules/orders/domain/interfaces/models/ICreateOrder'

@EntityRepository(Order)
class FakeOrderRepository implements IOrderRepository {
  private orm: Order[] = []
  public async find(): Promise<IOrder[]> {
    return this.orm
  }
  public async findById(id: string): Promise<IOrder | undefined> {
    const order = this.orm.find(order => order.id === id)
    return order
  }
  public async createOrder({ customer, product }: any): Promise<IOrder> {
    const order = new Order()
    order.id = randomUUID()
    order.customer = customer
    order.created_At = new Date()
    order.updated_At = new Date()
    order.order_products = [...product]
    this.orm.push(order)
    return order
  }
}

export default FakeOrderRepository
