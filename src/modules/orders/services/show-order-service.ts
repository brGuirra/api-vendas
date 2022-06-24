import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Order } from '../typeorm/entities/order'
import { OrdersRepository } from '../typeorm/repositories/orders-repository'

interface IShowOrder {
	id: string
}

export class ShowOrderService {
	public async execute({ id }: IShowOrder): Promise<Order> {
		const ordersRepository = getCustomRepository(OrdersRepository)

		const order = await ordersRepository.findById(id)

		if (!order) {
			throw new AppError('Order not found')
		}

		return order
	}
}