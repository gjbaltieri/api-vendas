import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { IOrder } from '@shared/interface/relationship/IOrder'
import { IOrdersProducts } from '@shared/interface/relationship/IOrdersProducts'
import OrdersProducts from './OrdersProducts'
import { ICustomer } from '@shared/interface/relationship/ICustomer'
import Customer from '@modules/customers/infra/typeorm/entities/Customer'

@Entity('orders')
class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: ICustomer

  @OneToMany(() => OrdersProducts, order_products => order_products.order, { cascade: true })
  order_products: IOrdersProducts[]

  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_At: Date

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_At: Date
}
export default Order
