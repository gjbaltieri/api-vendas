import { ICustomer } from './ICustomer'
import { IOrdersProducts } from './IOrdersProducts'

export interface IOrder {
  id: string
  customer: ICustomer
  order_products: IOrdersProducts[]
  created_At: Date
  updated_At: Date
}
