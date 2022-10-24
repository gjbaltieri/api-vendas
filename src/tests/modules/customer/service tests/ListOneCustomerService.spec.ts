import 'reflect-metadata'
import CreateCustomerService from '@modules/customers/services/CreateCustomerService'
import AppError from '@shared/errors/AppError'
import FakeCustomerRepository from '../fakeRepository/fakeCustomerRepository'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import ListOneCustomerService from '@modules/customers/services/ListOneCustomerService'

let fakeCustomerRepository: FakeCustomerRepository
let createCustomerService: CreateCustomerService
let listOneCustomerService: ListOneCustomerService

let MOCK_CUSTOMER: ICustomer

describe('List one customer suite tests', () => {
  beforeAll(async () => {
    fakeCustomerRepository = new FakeCustomerRepository()
    listOneCustomerService = new ListOneCustomerService(fakeCustomerRepository)
    createCustomerService = new CreateCustomerService(fakeCustomerRepository)
    MOCK_CUSTOMER = await createCustomerService.execute({ name: 'OTHER FAKE NAME', email: 'fake@mail.com' })
  })
  it('should return one customer', async () => {
    const customer = await listOneCustomerService.execute({ id: MOCK_CUSTOMER.id })
    expect(MOCK_CUSTOMER.id === customer.id)
  })
  it('should reject return one customer - (customer not found)', async () => {
    expect(listOneCustomerService.execute({ id: 'INVALID_ID' })).rejects.toBeInstanceOf(AppError)
  })
})
