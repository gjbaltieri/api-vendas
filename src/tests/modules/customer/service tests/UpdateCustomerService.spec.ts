import 'reflect-metadata'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import AppError from '@shared/errors/AppError'
import FakeCustomerRepository from '../fakeRepository/fakeCustomerRepository'
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService'
import { ICustomer } from '@shared/interface/relationship/ICustomer'

let fakeCustomerRepository: FakeCustomerRepository
let createCustomerService: CreateCustomerService
let updateCustomerService: UpdateCustomerService
let MOCK_CUSTOMER: ICustomer

describe('Update customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new FakeCustomerRepository()
    updateCustomerService = new UpdateCustomerService(fakeCustomerRepository)
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    MOCK_CUSTOMER = await createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'fakemail@mail.com',
    })
    await createCustomerService.execute({
      name: 'FAKE NAME',
      email: 'another_fakemail@mail.com',
    })
  })
  it('should update customer', async () => {
    const data = {
      id: MOCK_CUSTOMER.id,
      name: 'UPDATED FAKE NAME',
      email: 'updatefake@mail.com',
    }
    const customer = await updateCustomerService.execute(data)
    expect(customer).not.toBeInstanceOf(AppError)
  })
  it('should reject update customer - (customer not found)', async () => {
    const data = {
      id: 'f070341d-89d4-49d5-8424-831715fb443a',
      name: 'UPDATED FAKE NAME',
      email: 'updatefake@mail.com',
    }
    expect(updateCustomerService.execute(data)).rejects.toBeInstanceOf(AppError)
  })
  it('should reject update customer - (email already exists)', async () => {
    const data = {
      id: MOCK_CUSTOMER.id,
      name: 'UPDATED FAKE NAME',
      email: 'another_fakemail@mail.com',
    }
    expect(updateCustomerService.execute(data)).rejects.toBeInstanceOf(AppError)
  })
})
