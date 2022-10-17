import { inject, injectable } from 'tsyringe'
import { ICustomerRepository } from '../domain/interfaces/repository/ICustomerRepository'
import { IPaginate } from '../domain/interfaces/repository/IPaginate'

@injectable()
class ListAllCustomerService {
  constructor(@inject('CustomerRepository') private customerRepository: ICustomerRepository) {}
  public async execute(): Promise<IPaginate> {
    const customers = await this.customerRepository.paginate()
    return customers as IPaginate
  }
}
export default ListAllCustomerService
