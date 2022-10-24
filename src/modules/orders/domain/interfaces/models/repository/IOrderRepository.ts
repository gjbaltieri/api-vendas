import { IOrder } from '@shared/interface/relationship/IOrder'
import { ICreateOrder } from '../ICreateOrder'
import { INewOrder } from '../INewOrder'

export interface IOrderRepository {
  find(): Promise<IOrder[]>
  findById(id: string): Promise<IOrder | undefined>
  createOrder({ customer, product }: ICreateOrder): Promise<IOrder>
}
