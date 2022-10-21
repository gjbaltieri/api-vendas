import { IidProduct } from '@modules/products/domain/interfaces/models/IidProduct'
import { IProduct } from '@shared/interface/relationship/IProduct'
import { IProductRepository } from '@modules/products/domain/interfaces/repository/IProductRepository'
import { ICreateProduct } from '@modules/products/domain/interfaces/models/ICreateProduct'
import { randomUUID } from 'crypto'
import Product from '@modules/products/infra/typeorm/entities/Product'

class FakeProductRepository implements IProductRepository {
  private orm: Product[] = []
  public async findById(id: string): Promise<IProduct | undefined> {
    const Product = this.orm.find(product => product.id === id)
    return Product
  }
  public async findByName(name: string): Promise<IProduct | undefined> {
    const Product = this.orm.find(product => product.name === name)
    return Product
  }
  public async find(): Promise<IProduct[]> {
    return this.orm
  }
  public async findAllByIds(products: IidProduct[]): Promise<IProduct[]> {
    const productsIds = products.map(p => p.id)
    const Product = this.orm.filter(p => productsIds.includes(p.id))
    return Product
  }
  public async create(data: ICreateProduct): Promise<IProduct> {
    const product = new Product()
    product.id = randomUUID()
    product.name = data.name
    product.price = data.price
    product.quantity = data.quantity
    product.created_At = new Date()
    product.updated_At = new Date()
    this.orm.push(product)
    return product
  }
  public async save(data: IProduct[]): Promise<IProduct[]> {
    Object.assign(this.orm, data)
    return data
  }
  public async delete(data: any): Promise<void> {
    const product = this.orm.findIndex(p => p === data)
    this.orm.splice(product)
  }
}

export default FakeProductRepository
