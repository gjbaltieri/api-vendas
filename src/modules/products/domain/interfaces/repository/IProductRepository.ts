import { ICreateProduct } from '../models/ICreateProduct'
import { IidProduct } from '../models/IidProduct'
import { IProduct } from '../../../../../shared/interface/relationship/IProduct'
import { ISaveProduct } from '../models/ISaveProduct'

export interface IProductRepository {
  find(): Promise<IProduct[]>
  findById(id: string): Promise<IProduct | undefined>
  findByName(name: string): Promise<IProduct | undefined>
  findAllByIds(products: IidProduct[]): Promise<IProduct[]>
  create(data: ICreateProduct): Promise<IProduct>
  save(data: ISaveProduct[]): Promise<IProduct[]>
  delete(data: IProduct): Promise<void>
}
