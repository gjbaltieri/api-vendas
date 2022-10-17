import { Request, Response } from 'express'
import CreateCustomerService from '../../../services/CreateCustomerService'
import DeleteCustomerService from '../../../services/DeleteCustomerService'
import ListAllCustomerService from '../../../services/listAllCustomerService'
import ListOneCustomerService from '../../../services/ListOneCustomerService'
import UpdateCustomerService from '../../../services/UpdateCustomerService'

class customerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const customerService = new CreateCustomerService()
    const customer = await customerService.execute({ name, email })
    return res.json(customer)
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email } = req.body
    const customerService = new UpdateCustomerService()
    const customer = await customerService.execute({ id, name, email })

    return res.status(200).json(customer)
  }
  public async listAll(req: Request, res: Response): Promise<Response> {
    const customerService = new ListAllCustomerService()
    const customer = await customerService.execute()

    return res.status(200).json(customer)
  }
  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.body
    const customerService = new ListOneCustomerService()
    const customer = await customerService.execute(id)

    return res.status(200).json(customer)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const customerService = new DeleteCustomerService()
    await customerService.execute({ id })
    return res.status(204).json([])
  }
}

export default customerController
