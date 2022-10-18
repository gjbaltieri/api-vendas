import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateOrderService from '../../../services/CreateOrderService'
import ListAllOrderService from '../../../services/ListAllOrderService'
import ListOneOrderService from '../../../services/ListOneOrderService'

class OrdersController {
  public async listAll(request: Request, response: Response): Promise<Response> {
    const listOne = container.resolve(ListAllOrderService)
    const order = await listOne.execute()

    return response.json(order)
  }

  public async listOne(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const listAll = container.resolve(ListOneOrderService)
    const products = await listAll.execute(id)

    return response.json(products)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body
    const createOrder = container.resolve(CreateOrderService)
    const order = await createOrder.execute({ customer_id, products })

    return response.json(order)
  }
}

export default OrdersController
