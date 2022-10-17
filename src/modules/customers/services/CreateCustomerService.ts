import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { ICreateCustomer } from '../domain/interfaces/models/ICreateCustomer'
import { ICustomer } from '../domain/interfaces/models/ICustomer'
import { ICustomerRepository } from '../domain/interfaces/repository/ICustomerRepository'

@injectable()
class CreateCustomerService {
  constructor(@inject('CustomerRepository') private customerRepository: ICustomerRepository) {}
  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customerRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email adress already used.')
    }
    const customer = await this.customerRepository.create({ name, email })
    return customer
  }
}

export default CreateCustomerService
