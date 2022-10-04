import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

interface ICustomerCreate {
  name: string
  email: string
}
class CreateCustomerService {
  public async execute({ name, email }: ICustomerCreate): Promise<Customer> {
    const customerRepository = new CustomerRepository()
    const customer = customerRepository.create({ name, email })
    await customerRepository.save(customer)
    return customer
  }
}

export default CreateCustomerService
