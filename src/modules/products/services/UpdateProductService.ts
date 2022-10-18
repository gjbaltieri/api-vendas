import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../../../shared/interface/relationship/IProduct'
import { IUpdateProduct } from '../domain/interfaces/models/IUpdateProduct'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'

@injectable()
class UpdateProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute(id: string, { name, price, quantity }: IUpdateProduct): Promise<IProduct | undefined> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found!')
    }

    const productName = await this.productRepository.findByName(name)

    if (productName && name !== product.name) {
      throw new AppError('There is already one product with this name')
    }
    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')

    product.name = name
    product.price = price
    product.quantity = quantity

    const newProduct = await this.productRepository.save(product)
    return newProduct
  }
}

export default UpdateProductService
