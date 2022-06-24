import { Customer } from '@modules/customers/typeorm/entities/customer'
import { EntityRepository, Repository } from 'typeorm'
import { Order } from '../entities/order'

interface IProduct {
	product_id: string
	price: number
	quantity: number
}

interface ICreateOrderRequest {
	customer: Customer
	products: IProduct[]
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
	public async findById(id: string): Promise<Order> {
		return this.findOne(id, {
			relations: ['order_products', 'customer'],
		})
	}

	public async createOrder({
		customer,
		products,
	}: ICreateOrderRequest): Promise<Order> {
		const order = this.create({
			customer,
			order_products: products,
		})

		return this.save(order)
	}
}
