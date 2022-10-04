import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

interface ICustomer {
  id: string
}
class ListOneCustomerService {
  public async execute({ id }: ICustomer): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    return customer
  }
}

export default ListOneCustomerService
