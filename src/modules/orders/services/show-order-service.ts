import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { Order } from '../infra/typeorm/entities/order'
import { OrdersRepository } from '../infra/typeorm/repositories/orders-repository'

@injectable()
export class ShowOrderService {
	constructor(
		@inject('OrdersRepository')
		private readonly ordersRepository: OrdersRepository
	) {}

	public async execute(id: string): Promise<Order> {
		const order = await this.ordersRepository.findById(id)

		if (!order) {
			throw new AppError('Order not found')
		}

		return order
	}
}
