import { ICustomerRepository } from '@modules/customers/domain/interfaces/repository/ICustomerRepository'
import CustomerRepository from '@modules/customers/infra/typeorm/repository/CustomersRepository'
import { IOrderRepository } from '@modules/orders/domain/interfaces/models/repository/IOrderRepository'
import OrderRepository from '@modules/orders/infra/typeorm/repositories/OrderRepository'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository'
import { IUserRepository } from '@modules/users/domain/repository/IUserRepository'
import { IUserTokenRepository } from '@modules/users/domain/repository/IUserTokenRepository'
import BCryptoHashProvider from '@modules/users/infra/providers/implementations/BCryptoHashProvider'
import { IBCryptoHashProvider } from '@modules/users/infra/providers/models/IBCryptoHashProvider'
import UsersRepository from '@modules/users/infra/typeorm/repository/UsersRepository'
import UserTokenRepository from '@modules/users/infra/typeorm/repository/UserTokenRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository)
container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository)
container.registerSingleton<IOrderRepository>('OrderRepository', OrderRepository)
container.registerSingleton<IUserRepository>('UserRepository', UsersRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IBCryptoHashProvider>('BCryptoHashProvider', BCryptoHashProvider)
