import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import { ICreateCustomer } from '@modules/customers/domain/interfaces/models/ICreateCustomer'
import { IPaginate } from '@modules/customers/domain/interfaces/repository/IPaginate'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'
import { randomUUID } from 'crypto'

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = []
  public async findByName(name: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(c => c.name === name)
    return customer
  }
  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(c => c.email === email)
    return customer
  }
  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(c => c.id === id)
    return customer
  }
  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = new Customer()
    customer.id = randomUUID()
    customer.name = name
    customer.email = email
    customer.created_At = new Date()
    customer.updated_At = new Date()
    this.customers.push(customer)
    return customer
  }
  public async save(data: ICustomer): Promise<ICustomer> {
    const customer = this.customers.findIndex(c => c.id === data.id)
    this.customers[customer] = data
    return data
  }
  public async remove(data: ICustomer): Promise<void> {
    const customer = this.customers.findIndex(c => c.id === data.id)
    this.customers.splice(customer)
  }
  public async paginate(): Promise<IPaginate> {
    const paginate = this.customers
    const response = {
      from: 1,
      to: 1,
      per_page: 10,
      total: paginate.length,
      current_page: 1,
      prev_page: undefined,
      next_page: undefined,
      last_page: undefined,
      data: paginate,
    }

    return response as IPaginate
  }
  public async delete(custumer: ICustomer): Promise<void> {
    const customer = this.customers.findIndex(c => c.id === custumer.id)
    this.customers.splice(customer)
  }
}

export default FakeCustomerRepository
