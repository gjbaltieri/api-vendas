import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { getCustomRepository } from 'typeorm'
import ProductRepository from '../infra/typeorm/repositories/ProductRepository'

interface DInterface {
  id: string
}

class DeleteProduct {
  public async execute({ id }: DInterface): Promise<void> {
    const productRepository = getCustomRepository(ProductRepository)
    const product = await productRepository.findOne(id)

    if (!product) {
      throw new AppError('Product not found.')
    }
    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')

    await productRepository.remove(product)
  }
}

export default DeleteProduct
