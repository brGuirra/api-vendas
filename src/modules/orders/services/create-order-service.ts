import { CustomersRepository } from '@modules/customers/typeorm/repositories/customers-repository'
import { ProductsRepository } from '@modules/products/typeorm/repositories/products-repository'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Order } from '../typeorm/entities/order'
import { OrdersRepository } from '../typeorm/repositories/orders-repository'

interface IProduct {
	id: string
	quantity: number
}

export interface ICreateOrder {
	customer_id: string
	products: IProduct[]
}

export class CreateOrderService {
	public async execute({
		customer_id,
		products,
	}: ICreateOrder): Promise<Order> {
		const ordersRepository = getCustomRepository(OrdersRepository)
		const customersRepository = getCustomRepository(CustomersRepository)
		const productsRepository = getCustomRepository(ProductsRepository)

		const customer = await customersRepository.findById(customer_id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		const existingProducts = await productsRepository.findAllByIds(products)

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

		const order = ordersRepository.create({
			customer,
			order_products: serealizedProducts,
		})

		const { order_products } = order

		const updatedProductQuantity = order_products.map(product => ({
			id: product.product_id,
			quantity:
				existingProducts.find(p => p.id === product.product_id).quantity -
				product.quantity,
		}))

		console.log(updatedProductQuantity)

		await productsRepository.save(updatedProductQuantity)

		return ordersRepository.save(order)
	}
}
