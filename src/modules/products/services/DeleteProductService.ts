import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { getCustomRepository } from 'typeorm'
import { IidProduct } from '../domain/interfaces/models/IidProduct'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'
import ProductRepository from '../infra/typeorm/repositories/ProductRepository'

@injectable()
class DeleteProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new AppError('Product not found.')
    }
    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')

    await this.productRepository.delete(product)
  }
}

export default DeleteProductService
