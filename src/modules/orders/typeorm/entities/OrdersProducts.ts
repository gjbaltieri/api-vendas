import Customer from '../../../customers/typeorm/entities/Customer'
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
import Product from '@modules/products/typeorm/entities/Product'

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order

  @ManyToOne(() => Product, product => product.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product

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
