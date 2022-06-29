/* eslint import/no-cycle: 0 */

import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts'
import { Product } from '@modules/products/infra/typeorm/entities/product'
import { Order } from './order'

@Entity('orders_products')
export class OrdersProducts implements IOrdersProducts {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Order, order => order.order_products)
	@JoinColumn({ name: 'order_id' })
	order: Order

	@ManyToOne(() => Product, product => product.order_products)
	@JoinColumn({ name: 'product_id' })
	product: Product

	@Column()
	order_id: string

	@Column()
	product_id: string

	@Column('decimal')
	price: number

	@Column('int')
	quantity: number

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
