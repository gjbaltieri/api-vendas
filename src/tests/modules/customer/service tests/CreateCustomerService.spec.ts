import 'reflect-metadata'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import AppError from '@shared/errors/AppError'
import FakeCustomerRepository from '../fakeRepository/fakeCustomerRepository'

let fakeCustomerRepository: FakeCustomerRepository
let createCustomerService: CreateCustomerService

const MOCK_CUSTOMER = {
  name: 'FAKE NAME',
  email: 'fakemail@mail.com',
}

describe('Create customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new FakeCustomerRepository()
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    await createCustomerService.execute({ name: 'OTHER FAKE NAME', email: 'fake@mail.com' })
  })
  it('should create customer', async () => {
    const customer = await createCustomerService.execute(MOCK_CUSTOMER)
    expect(customer).toHaveProperty('id')
  })
  it('should reject create customer - (email already exists)', async () => {
    expect(createCustomerService.execute({ name: 'FAKE NAME', email: 'fake@mail.com' })).rejects.toBeInstanceOf(
      AppError,
    )
  })
})
