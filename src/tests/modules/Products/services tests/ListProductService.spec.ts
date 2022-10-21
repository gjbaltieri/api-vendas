import 'reflect-metadata'
import FakeProductRepository from '../fakeRepository/fakeProductRepository'
import ListProductService from '@modules/products/services/ListProductService'
import CreateProductService from '@modules/products/services/CreateProductService'

let fakeProductRepository: FakeProductRepository
let listProductService: ListProductService
let createProductService: CreateProductService

describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new FakeProductRepository()
    listProductService = new ListProductService(fakeProductRepository)
    createProductService = new CreateProductService(fakeProductRepository)
    await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20,
    })
    await createProductService.execute({
      name: 'teste2',
      price: 30,
      quantity: 20,
    })
  })
  it('should a find all Products', async () => {
    const product = await listProductService.execute()
    expect(product.length >= 2)
  })
})
