/* eslint import/no-cycle: 0 */

import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'
import { OrdersProducts } from '../../../orders/typeorm/entities/orders-products'

@Entity('products')
export class Product {
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

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date
}
