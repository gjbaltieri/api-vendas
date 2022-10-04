import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

interface ICustomerCreate {
  name: string
  email: string
}
class CreateCustomerService {
  public async execute({ name, email }: ICustomerCreate): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const emailExists = await customerRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email adress already used.')
    }
    const customerCreate = customerRepository.create({ name, email })
    const customer = await customerRepository.save(customerCreate)
    return customer
  }
}

export default CreateCustomerService
