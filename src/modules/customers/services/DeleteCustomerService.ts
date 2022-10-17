import AppError from '@shared/errors/AppError'
import { injectable, inject } from 'tsyringe'
import { Iid } from '../domain/interfaces/models/Iid'
import { ICustomerRepository } from '../domain/interfaces/repository/ICustomerRepository'

@injectable()
class DeleteCustomerService {
  constructor(@inject('CustomerRepository') private customerRepository: ICustomerRepository) {}
  public async execute({ id }: Iid): Promise<void> {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new AppError('Customer not found.')
    }
    await this.customerRepository.delete(customer)
  }
}

export default DeleteCustomerService
