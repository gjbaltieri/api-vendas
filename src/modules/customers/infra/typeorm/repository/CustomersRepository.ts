import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import { ICreateCustomer } from '@modules/customers/domain/interfaces/models/ICreateCustomer'
import { getRepository, Repository } from 'typeorm'
import Customer from '../entities/Customer'
import { IPaginate } from '@modules/customers/domain/interfaces/repository/IPaginate'

class CustomerRepository implements ICustomerRepository {
  private ORM: Repository<Customer>
  constructor() {
    this.ORM = getRepository(Customer)
  }
  public async findByName(name: string): Promise<ICustomer | undefined> {
    const customer = await this.ORM.findOne({
      where: {
        name,
      },
    })
    return customer
  }
  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = await this.ORM.findOne({
      where: {
        email,
      },
    })
    return customer
  }
  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = await this.ORM.findOne({
      where: {
        id,
      },
    })
    return customer
  }
  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ORM.create({ name, email })
    await this.ORM.save({ name, email })
    return customer
  }
  public async save(data: ICustomer): Promise<ICustomer> {
    const customer = await this.ORM.save(data)
    return customer
  }
  public async remove(data: ICustomer): Promise<void> {
    await this.ORM.remove(data)
  }
  public async paginate(): Promise<IPaginate> {
    const paginate = await this.ORM.createQueryBuilder().paginate()
    return paginate as IPaginate
  }
  public async delete(custumer: ICustomer): Promise<void> {
    await this.ORM.remove(custumer)
  }
}

export default CustomerRepository
