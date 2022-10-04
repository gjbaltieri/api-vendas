import AppError from '@shared/errors/AppError'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

interface IUpdateCustomer {
  id: string
  name: string
  email: string
}
class UpdateCustomerService {
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer | undefined> {
    const customerRepository = new CustomerRepository()
    const customer = await customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    const emailExists = await customerRepository.findByEmail(email)
    if (emailExists && customer.email !== email) {
      throw new AppError('Email adress already used.')
    }
    customer.email = email
    customer.name = name
    await customerRepository.save(customer)
    return customer
  }
}

export default UpdateCustomerService
