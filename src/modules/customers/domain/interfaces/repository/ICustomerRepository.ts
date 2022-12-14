import { ICreateCustomer } from '../models/ICreateCustomer'
import { ICustomer } from '../../../../../shared/interface/relationship/ICustomer'
import { IPaginate } from './IPaginate'

export interface ICustomerRepository {
  paginate(): Promise<IPaginate>
  findByName(name: string): Promise<ICustomer | undefined>
  findByEmail(email: string): Promise<ICustomer | undefined>
  findById(id: string): Promise<ICustomer | undefined>
  create(data: ICreateCustomer): Promise<ICustomer>
  save(data: ICustomer): Promise<ICustomer>
  delete(data: ICustomer): Promise<void>
}
