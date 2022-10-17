import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IUpdateCustomer } from '../domain/interfaces/models/IUpdateCustomer'
import { ICustomerRepository } from '../domain/interfaces/repository/ICustomerRepository'
import Customer from '../infra/typeorm/entities/Customer'

@injectable()
class UpdateCustomerService {
  constructor(@inject('CustomerRepository') private customerRepository: ICustomerRepository) {}
  public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer | undefined> {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    const emailExists = await this.customerRepository.findByEmail(email)
    if (emailExists && customer.email !== email) {
      throw new AppError('There is already one customer with this email.')
    }
    customer.email = email
    customer.name = name
    await this.customerRepository.save(customer)
    return customer
  }
}

export default UpdateCustomerService
