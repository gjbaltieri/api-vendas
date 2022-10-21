import 'reflect-metadata'
import CreateProductService from '@modules/products/services/CreateProductService'
import DeleteProductService from '@modules/products/services/DeleteProductService'
import { IProduct } from '@shared/interface/relationship/IProduct'
import FakeProductRepository from '../fakeRepository/fakeProductRepository'
import AppError from '@shared/errors/AppError'

let fakeProductRepository: FakeProductRepository
let deleteProductService: DeleteProductService
let createProductService: CreateProductService
let product: IProduct
const fakeMockProduct = {
  id: '371e3939-7286-474c-a944-a7787eaba486',
  name: 'FakeProduct',
  price: 50,
  quantity: 10,
  created_At: '2022-10-21T13:10:39.563Z',
  updated_At: '2022-10-21T13:10:39.563Z',
}
describe('Delete Product Suite tests', () => {
  beforeAll(async () => {
    fakeProductRepository = new FakeProductRepository()
    deleteProductService = new DeleteProductService(fakeProductRepository)
    createProductService = new CreateProductService(fakeProductRepository)

    product = await createProductService.execute({ name: 'FakeProduct', price: 50, quantity: 10 })
  })
  it('should delete a product', async () => {
    await deleteProductService.execute(product.id)
    const allProducts = await fakeProductRepository.find()
    expect(allProducts).toEqual([])
  })
  it('should return Product not found', async () => {
    expect(deleteProductService.execute(fakeMockProduct.id)).rejects.toBeInstanceOf(AppError)
  })
})
