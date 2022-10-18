import RedisCache from '@shared/cache/RedisCache'
import { IProduct } from '../../../shared/interface/relationship/IProduct'
import { inject, injectable } from 'tsyringe'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'

@injectable()
class ListProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute(): Promise<IProduct[]> {
    let products = await RedisCache.recover<IProduct[]>('APIVENDAS_PRODUCT_LIST')
    if (!products) {
      products = await this.productRepository.find()
      await RedisCache.save('APIVENDAS_PRODUCT_LIST', products)
    }
    return products
  }
}

export default ListProductService
