import { IOrder } from '@shared/interface/relationship/IOrder'
import { ICreateOrder } from '../ICreateOrder'

export interface IOrderRepository {
  find(): Promise<IOrder[]>
  findById(id: string): Promise<IOrder | undefined>
  createOrder({ customer, order_products }: ICreateOrder): Promise<IOrder>
}
