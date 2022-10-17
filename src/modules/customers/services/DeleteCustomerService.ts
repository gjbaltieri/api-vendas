import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import CustomerRepository from '../infra/typeorm/repository/CustomersRepository'

interface ICustomer {
  id: string
}
class DeleteCustomerService {
  public async execute({ id }: ICustomer): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    await customerRepository.remove(customer)
  }
}

export default DeleteCustomerService
