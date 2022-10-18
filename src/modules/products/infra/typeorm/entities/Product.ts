import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts'
import { IOrdersProducts } from '@shared/interface/relationship/IOrdersProducts'
import { IProduct } from '@shared/interface/relationship/IProduct'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
class Product implements IProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: IOrdersProducts[]

  @Column()
  name: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}

export default Product
