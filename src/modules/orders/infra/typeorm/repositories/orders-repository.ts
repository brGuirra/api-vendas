import { ICreateOrder } from '@modules/orders/domain/models/ICreateOrder'
import { IOrder } from '@modules/orders/domain/models/IOrder'
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository'
import { getRepository, Repository } from 'typeorm'
import { Order } from '../entities/order'

export class OrdersRepository implements IOrdersRepository {
	private readonly ormRepository: Repository<Order>

	constructor() {
		this.ormRepository = getRepository(Order)
	}

	public async findById(id: string): Promise<IOrder> {
		const order = await this.ormRepository.findOne(id, {
			relations: ['order_products', 'customer'],
		})

		return order
	}

	public async create({ customer, products }: ICreateOrder): Promise<IOrder> {
		const order = this.ormRepository.create({
			customer,
			order_products: products,
		})

		await this.ormRepository.save(order)

		return order
	}
}
