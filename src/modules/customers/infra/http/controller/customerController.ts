import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import CreateCustomerService from '../../../services/CreateCustomerService'
import DeleteCustomerService from '../../../services/DeleteCustomerService'
import ListAllCustomerService from '../../../services/listAllCustomerService'
import ListOneCustomerService from '../../../services/ListOneCustomerService'

class customerController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body
    const customerRepository = container.resolve(CreateCustomerService)
    const customer = await customerRepository.execute({ name, email })
    return res.json(customer)
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { name, email } = req.body
    const customerRepository = container.resolve(UpdateCustomerService)
    const customer = await customerRepository.execute({ id, name, email })
    return res.status(200).json(customer)
  }
  public async listAll(req: Request, res: Response): Promise<Response> {
    const customerRepository = container.resolve(ListAllCustomerService)
    const customer = await customerRepository.execute()
    return res.status(200).json(customer)
  }
  public async listOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const customerRepository = container.resolve(ListOneCustomerService)

    const customer = await customerRepository.execute({ id })

    return res.status(200).json(customer)
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const customerRepository = container.resolve(DeleteCustomerService)
    await customerRepository.execute({ id })
    return res.status(204).json([])
  }
}

export default customerController
