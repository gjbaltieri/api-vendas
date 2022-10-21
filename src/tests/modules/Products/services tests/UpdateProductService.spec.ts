import 'reflect-metadata'
import FakeProductRepository from '../fakeRepository/fakeProductRepository'
import CreateProductService from '@modules/products/services/CreateProductService'
import UpdateProductService from '@modules/products/services/UpdateProductService'
import { IProduct } from '@shared/interface/relationship/IProduct'
import AppError from '@shared/errors/AppError'

let fakeProductRepository: FakeProductRepository
let updateProductService: UpdateProductService
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
    updateProductService = new UpdateProductService(fakeProductRepository)
    createProductService = new CreateProductService(fakeProductRepository)
    Product = await createProductService.execute({
      name: 'teste',
      price: 30,
      quantity: 20,
    })
    await createProductService.execute({
      name: 'fake name',
      price: 30,
      quantity: 20,
    })
  })
  it('should a find all Products', async () => {
    const product = { name: 'nome atualizado', price: 50, quantity: 20 }
    const updatedProduct = await updateProductService.execute(Product.id, product)
    expect(product.name).toStrictEqual(updatedProduct?.name)
  })
  it('should return a product not found', async () => {
    const product = { name: 'nome atualizado', price: 50, quantity: 20 }
    expect(updateProductService.execute(fakeMockProduct.id, product)).rejects.toBeInstanceOf(AppError)
  })
  it('there is already one product with this name', async () => {
    const product = { name: 'fake name', price: 50, quantity: 20 }
    expect(updateProductService.execute(Product.id, product)).rejects.toBeInstanceOf(AppError)
  })
})
