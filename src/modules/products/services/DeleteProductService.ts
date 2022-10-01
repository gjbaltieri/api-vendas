import AppError from '@shared/errors/AppError'
import { DeleteResult, getCustomRepository } from 'typeorm'
import ProductRepository from '../typeorm/repositories/ProductRepository'

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

    await productRepository.remove(product)
  }
}

export default DeleteProduct
