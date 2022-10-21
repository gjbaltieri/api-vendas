import RedisCache from '@shared/cache/RedisCache'
import AppError from '@shared/errors/AppError'
import { ICreateProduct } from '../domain/interfaces/models/ICreateProduct'
import { injectable, inject, container } from 'tsyringe'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'
import { IProduct } from '../../../shared/interface/relationship/IProduct'

@injectable()
class CreateProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const productName = await this.productRepository.findByName(name)

    if (productName) {
      throw new AppError('There is already one product with this name')
    }

    await RedisCache.invalidate('APIVENDAS_PRODUCT_LIST')
    const product = await this.productRepository.create({
      name,
      price,
      quantity,
    })
    return product
  }
}

export default CreateProductService
