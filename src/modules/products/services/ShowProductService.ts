import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../../../shared/interface/relationship/IProduct'
import { IProductRepository } from '../domain/interfaces/repository/IProductRepository'

@injectable()
class ShowProductService {
  constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}
  public async execute(id: string): Promise<IProduct | undefined> {
    const product = await this.productRepository.findById(id)

    if (!product) {
      throw new AppError('Product not found!')
    }
    return product
  }
}

export default ShowProductService
