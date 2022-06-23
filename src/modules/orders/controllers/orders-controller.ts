import { Request, Response } from 'express'
import {
	CreateOrderService,
	ICreateOrder,
} from '../services/create-order-service'
import { ShowOrderService } from '../services/show-order-service'

export class OrdersController {
	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showOrderService = new ShowOrderService()

		const order = await showOrderService.execute({ id })

		return response.json(order)
	}

	public async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ICreateOrder
		>,
		response: Response
	): Promise<Response> {
		const { customer_id, products } = request.body

		const createOrderService = new CreateOrderService()

		const order = await createOrderService.execute({
			customer_id,
			products,
		})

		return response.json(order)
	}
}
