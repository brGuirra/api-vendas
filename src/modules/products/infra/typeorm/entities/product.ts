/* eslint import/no-cycle: 0 */

import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders-products'
import { IProduct } from '@modules/products/domain/models/IProduct'

@Entity('products')
export class Product implements IProduct {
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
