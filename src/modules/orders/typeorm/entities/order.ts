/* eslint import/no-cycle: 0 */

import { Customer } from '@modules/customers/typeorm/entities/customer'
import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { OrdersProducts } from './orders-products'

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Customer)
	@JoinColumn({ name: 'customer_id' })
	customer: Customer

	@OneToMany(() => OrdersProducts, order_products => order_products.order, {
		cascade: true,
	})
	order_products: OrdersProducts[]

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
