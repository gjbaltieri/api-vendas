import { ICustomer } from '@shared/interface/relationship/ICustomer'
import { IProductsOrders } from './IProductsOrders'

export interface ICreateOrder {
  customer: ICustomer
  order_products: IProductsOrders[]
}
