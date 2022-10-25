import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../../../shared/interface/relationship/IProduct'
import { IUpdateProduct } from '../domain/interfaces/models/IUpdateProduct'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'

@injectable()
class UpdateProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute(id: string, data: IUpdateProduct): Promise<IProduct | undefined> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found', 404)
    }

    const productName = await this.productRepository.findByName(data.name)

    if (productName && data.name !== product.name) {
      throw new AppError('There is already one product with this name')
    }
    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')

    product.name = data.name
    product.price = data.price
    product.quantity = data.quantity

    const newProduct = await this.productRepository.create(product)
    return newProduct
  }
}

export default UpdateProductService
