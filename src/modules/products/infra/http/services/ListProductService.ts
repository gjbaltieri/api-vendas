import { getCustomRepository } from 'typeorm'
import Product from '../../typeorm/entities/Product'
import ProductRepository from '../../typeorm/repositories/ProductRepository'
import RedisCache from '@shared/cache/RedisCache'

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository)
    let products = await RedisCache.recover<Product[]>('APIVENDAS_PRODUCT_LIST')
    if (!products) {
      products = await productRepository.find()
      await RedisCache.save('APIVENDAS_PRODUCT_LIST', products)
    }
    return products
  }
}

export default ListProductService
