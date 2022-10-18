import { IOrder } from './IOrder'
import { ICustomer } from './ICustomer'
import { IProduct } from './IProduct'

export interface IOrdersProducts {
  id: string
  order: IOrder
  product: IProduct
  order_id: string
  product_id: string
  price: number
  quantity: number
  created_At: Date
  updated_At: Date
}
