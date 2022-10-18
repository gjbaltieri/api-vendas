import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import CustomerRepository from '@modules/customers/infra/typeorm/repository/CustomersRepository'
import { IOrderRepository } from '@modules/orders/domain/interfaces/models/repository/IOrderRepository'
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository)
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository)
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository)
