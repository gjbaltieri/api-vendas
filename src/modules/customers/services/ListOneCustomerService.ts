import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Iid } from '../domain/interfaces/models/Iid'
import { ICustomerRepository } from '../domain/interfaces/repository/ICustomerRepository'
import Customer from '../infra/typeorm/entities/Customer'

@injectable()
class ListOneCustomerService {
  constructor(@inject('CustomerRepository') private customerRepository: ICustomerRepository) {}
  public async execute({ id }: Iid): Promise<Customer> {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    return customer
  }
}

export default ListOneCustomerService
