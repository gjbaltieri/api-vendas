import 'reflect-metadata'
import CreateProductService from '@modules/products/services/CreateProductService'
import FakeProductRepository from '../fakeRepository/fakeProductRepository'
import AppError from '@shared/errors/AppError'

let fakeProductRepository: FakeProductRepository
let createProductService: CreateProductService

describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new FakeProductRepository()
    createProductService = new CreateProductService(fakeProductRepository)
  })
  it('should a create a new Product', async () => {
    const product = await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20,
    })
    expect(product).toHaveProperty('id')
  })
  it('should a create a new Product', async () => {
    await createProductService.execute({
      name: 'FAKE_PRODUCT',
      price: 30,
      quantity: 20,
    })
    expect(
      createProductService.execute({
        name: 'FAKE_PRODUCT',
        price: 30,
        quantity: 20,
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
