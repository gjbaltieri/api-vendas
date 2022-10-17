import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Customer from '../infra/typeorm/entities/Customer'
import CustomerRepository from '../infra/typeorm/repository/CustomersRepository'

interface IUpdateCustomer {
  id: string
  name: string
  email: string
}
class UpdateCustomerService {
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer | undefined> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    const emailExists = await customerRepository.findByEmail(email)
    if (emailExists && customer.email !== email) {
      throw new AppError('There is already one customer with this email.')
    }
    customer.email = email
    customer.name = name
    await customerRepository.save(customer)
    return customer
  }
}

export default UpdateCustomerService
