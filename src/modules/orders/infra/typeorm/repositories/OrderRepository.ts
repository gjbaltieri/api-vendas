import { EntityRepository, getRepository, Repository } from 'typeorm'
import Order from '../entities/Order'
import { ICreateOrder } from '@modules/orders/domain/interfaces/models/ICreateOrder'
import { IOrder } from '@shared/interface/relationship/IOrder'
import { IOrderRepository } from '@modules/orders/domain/interfaces/models/repository/IOrderRepository'
import { IOrdersProducts } from '@shared/interface/relationship/IOrdersProducts'

@EntityRepository(Order)
class OrderRepository implements IOrderRepository {
  private orm: Repository<Order>
  constructor() {
    this.orm = getRepository(Order)
  }
  public async find(): Promise<IOrder[]> {
    const order = this.orm.find({})
    return order
  }
  public async findById(id: string): Promise<IOrder | undefined> {
    const order = this.orm.findOne(id, { relations: ['customer', 'order_products'] })
    return order
  }
  public async createOrder({ customer, order_products }: ICreateOrder): Promise<IOrder> {
    const order = this.orm.create({
      customer,
      order_products,
    })

    await this.orm.save(order)
    return order
  }
}

export default OrderRepository
