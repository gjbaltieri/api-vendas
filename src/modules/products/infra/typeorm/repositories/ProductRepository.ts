import Product from '@modules/products/infra/typeorm/entities/Product'
import { IidProduct } from '@modules/products/domain/interfaces/models/IidProduct'
import { IProduct } from '@shared/interface/relationship/IProduct'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import { getRepository, In, Repository } from 'typeorm'
import { ICreateProduct } from '@modules/products/domain/interfaces/models/ICreateProduct'
import { ISaveProduct } from '@modules/products/domain/interfaces/models/ISaveProduct'

class ProductRepository implements IProductRepository {
  private orm: Repository<Product>
  constructor() {
    this.orm = getRepository(Product)
  }
  public async findById(id: string): Promise<IProduct | undefined> {
    const product = await this.orm.findOne({
      where: { id: id },
    })
    return product
  }
  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.orm.findOne({
      where: {
        name,
      },
    })
    return product
  }
  public async find(): Promise<IProduct[]> {
    const product = await this.orm.find()
    return product
  }
  public async findAllByIds(products: IidProduct[]): Promise<IProduct[]> {
    const productsIds = products.map(product => product.id)
    const productsList = await this.orm.find({ where: { id: In(productsIds) } })
    return productsList
  }
  public async create(data: ICreateProduct): Promise<IProduct> {
    const product = this.orm.create(data)
    await this.orm.save(product)
    return product
  }
  public async save(data: ISaveProduct[]): Promise<IProduct[]> {
    const product = await this.orm.save(data)
    return product
  }
  public async delete(data: any): Promise<void> {
    await this.orm.remove(data)
    return
  }
}

export default ProductRepository
