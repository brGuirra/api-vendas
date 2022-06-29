import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/app-error'
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { ICreateOrderRequest } from '../domain/models/ICreateOrderRequest'
import { IOrder } from '../domain/models/IOrder'
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository'

@injectable()
export class CreateOrderService {
	constructor(
		@inject('OrdersRepository')
		private readonly ordersRepository: IOrdersRepository,
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository,
		@inject('ProductsRepository')
		private readonly productsRepository: IProductsRepository
	) {}

	public async execute({
		customer_id,
		products,
	}: ICreateOrderRequest): Promise<IOrder> {
		const customer = await this.customersRepository.findById(customer_id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		const productsIds = products.map(product => product.id)

		const existingProducts = await this.productsRepository.findAllByIds(
			productsIds
		)

		if (existingProducts.length === 0) {
			throw new AppError('Products not found')
		}

		const existingProductsIds = new Set(
			existingProducts.map(product => product.id)
		)

		const inexistingProducts = products.filter(
			product => !existingProductsIds.has(product.id)
		)

		if (inexistingProducts.length > 0) {
			throw new AppError(
				`Products not found:\n
			    ${inexistingProducts.map(product => `id - ${product.id}\n`).join('')}`
			)
		}

		const quantityAvailable = products.filter(
			product =>
				existingProducts.find(p => p.id === product.id).quantity <
				product.quantity
		)

		if (quantityAvailable.length > 0) {
			throw new AppError(
				`Out of stock:
        ${quantityAvailable
					.map(product => `Item ${product.id} do not have enough quantity`)
					.join('')}`
			)
		}

		const serealizedProducts = products.map(product => ({
			product_id: product.id,
			quantity: product.quantity,
			price: existingProducts.find(p => p.id === product.id).price,
		}))

		const order = await this.ordersRepository.create({
			customer,
			products: serealizedProducts,
		})

		const { order_products } = order

		const updatedProductQuantity = order_products.map(product => ({
			id: product.product_id,
			quantity:
				existingProducts.find(p => p.id === product.product_id).quantity -
				product.quantity,
		}))

		await this.productsRepository.updateStock(updatedProductQuantity)

		return order
	}
}
