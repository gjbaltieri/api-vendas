import { getCustomRepository } from 'typeorm'
import Customer from '../typeorm/entities/Customer'
import CustomerRepository from '../typeorm/repository/CustomersRepository'

interface IPaginate {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: number | null
  next_page: number | null
  last_page: number
  data: Customer[]
}

class ListAllCustomerService {
  public async execute(): Promise<IPaginate> {
    const customerRepository = getCustomRepository(CustomerRepository)
    const customers = await customerRepository.createQueryBuilder().paginate(10)

    return customers as IPaginate
  }
}
export default ListAllCustomerService
