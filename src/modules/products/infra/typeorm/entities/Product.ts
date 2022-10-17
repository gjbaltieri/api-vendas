import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToMany(() => OrdersProducts, order_products => order_products.product)
  order_products: OrdersProducts[]

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