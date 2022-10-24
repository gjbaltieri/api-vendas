import { ICustomer } from '@shared/interface/relationship/ICustomer'

interface IProductsList {
  id: string
  quantity: number
}

export interface ICreateOrder {
  customer: ICustomer
  product: IProductsList[]
}
