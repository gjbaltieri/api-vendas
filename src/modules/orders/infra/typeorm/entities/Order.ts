import Customer from '../../../../customers/infra/typeorm/entities/Customer'
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import OrdersProducts from './OrdersProducts'

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer

  @OneToMany(() => OrdersProducts, order_products => order_products.order, { cascade: true })
  order_products: OrdersProducts[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}
export default Order
