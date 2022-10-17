import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import Product from '../infra/typeorm/entities/Product'
import ProductRepository from '../infra/typeorm/repositories/ProductRepository'

interface IRequest {
  name: string
  price: number
  quantity: number
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository)
    const productName = await productRepository.findByName(name)

    if (productName) {
      throw new AppError('There is already one product with this name')
    }

    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')
    const product = productRepository.create({
      name,
      price,
      quantity,
    })
    await productRepository.save(product)
    return product
  }
}

export default CreateProductService