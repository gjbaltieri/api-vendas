import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { getCustomRepository, UpdateResult } from 'typeorm'
import Product from '../typeorm/entities/Product'
import ProductRepository from '../typeorm/repositories/ProductRepository'

interface PInterface {
  name: string
  price: number
  quantity: number
}
class UpdateProductService {
  public async execute(id: string, { name, price, quantity }: PInterface): Promise<Product | undefined> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const productName = await productRepository.findByName(name)

    if (productName && name !== product.name) {
      throw new AppError('There is already one product with this name')
    }
    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')

    product.name = name
    product.price = price
    product.quantity = quantity

    const newProduct = await productRepository.save(product)
    return newProduct
  }
}

export default UpdateProductService
