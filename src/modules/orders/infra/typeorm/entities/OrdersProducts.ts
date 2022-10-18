import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import Order from './Order'
import Product from '@modules/products/infra/typeorm/entities/Product'
import { IProduct } from '@shared/interface/relationship/IProduct'
import { IOrdersProducts } from '@shared/interface/relationship/IOrdersProducts'
import { IOrder } from '@shared/interface/relationship/IOrder'

@Entity('orders_products')
class OrdersProducts implements IOrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: IOrder

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: IProduct

  @Column()
  order_id: string

  @Column()
  product_id: string

  @Column('decimal')
  price: number

  @Column('int')
  quantity: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}
export default OrdersProducts
