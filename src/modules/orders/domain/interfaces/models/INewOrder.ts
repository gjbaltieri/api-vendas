interface INewOrderProducts {
  id: string
  quantity: number
}
export interface INewOrder {
  customer_id: string
  products: INewOrderProducts[]
}
