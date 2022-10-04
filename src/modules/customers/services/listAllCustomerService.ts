import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

class ListAllCustomerService {
  public async execute(): Promise<Customer[] | undefined> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customers = await customerRepository.find()

    return customers
  }
}
export default ListAllCustomerService
