import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import CustomerRepository from '@modules/customers/infra/typeorm/repository/CustomersRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository)
