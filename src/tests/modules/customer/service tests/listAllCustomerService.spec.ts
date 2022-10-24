import 'reflect-metadata'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import AppError from '@shared/errors/AppError'
import FakeCustomerRepository from '../fakeRepository/fakeCustomerRepository'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import ListAllCustomerService from '@modules/customers/services/listAllCustomerService'
import { IPaginate } from '@modules/customers/domain/interfaces/repository/IPaginate'

let fakeCustomerRepository: FakeCustomerRepository
let createCustomerService: CreateCustomerService
let listAllCustomerService: ListAllCustomerService

describe('List All customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new FakeCustomerRepository()
    listAllCustomerService = new ListAllCustomerService(fakeCustomerRepository)
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    await createCustomerService.execute({ name: 'FAKE NAME', email: 'fake@mail.com' })
    await createCustomerService.execute({ name: 'OTHER FAKE NAME', email: 'another_fake@mail.com' })
  })
  it('should return all customers', async () => {
    const customers = await listAllCustomerService.execute()
    console.log('list all', customers)
    expect(customers).toHaveProperty('data')
  })
})
