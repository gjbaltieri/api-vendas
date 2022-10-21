import 'reflect-metadata'
import FakeProductRepository from '../fakeRepository/fakeProductRepository'
import CreateProductService from '@modules/products/services/CreateProductService'
import { IProduct } from '@shared/interface/relationship/IProduct'
import ShowProductService from '@modules/products/services/ShowProductService'
import AppError from '@shared/errors/AppError'

let fakeProductRepository: FakeProductRepository
let showProductService: ShowProductService
let createProductService: CreateProductService

let Product: IProduct

const fakeMockProduct = {
  id: '371e3939-7286-474c-a944-a7787eaba486',
  name: 'FakeProduct',
  price: 50,
  quantity: 10,
  created_At: '2022-10-21T13:10:39.563Z',
  updated_At: '2022-10-21T13:10:39.563Z',
}

describe('Create product suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new FakeProductRepository()
    showProductService = new ShowProductService(fakeProductRepository)
    createProductService = new CreateProductService(fakeProductRepository)
    Product = await createProductService.execute({
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
  it('should a find and show one Product', async () => {
    const showProduct = await showProductService.execute(Product.id)
    expect(showProduct).toStrictEqual(Product)
  })
  it('should a find and show one Product', async () => {
    expect(showProductService.execute(fakeMockProduct.id)).rejects.toBeInstanceOf(AppError)
  })
})
