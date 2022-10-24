import 'reflect-metadata'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import AppError from '@shared/errors/AppError'
import FakeCustomerRepository from '../fakeRepository/fakeCustomerRepository'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService'

let fakeCustomerRepository: FakeCustomerRepository
let deleteCustomerService: DeleteCustomerService
let createCustomerService: CreateCustomerService

let MOCK_CUSTOMER: ICustomer

describe('Delete customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new FakeCustomerRepository()
    deleteCustomerService = new DeleteCustomerService(fakeCustomerRepository)
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    MOCK_CUSTOMER = await createCustomerService.execute({ name: 'OTHER FAKE NAME', email: 'fake@mail.com' })
  })
  it('should delete customer', async () => {
    const customer = await deleteCustomerService.execute({ id: MOCK_CUSTOMER.id })
    expect(customer).toBe(void 0)
  })
  it('should reject delete customer - (customer not found)', async () => {
    expect(deleteCustomerService.execute({ id: 'INVALID_ID' })).rejects.toBeInstanceOf(AppError)
  })
})
