import { Request, Response } from 'express'
import { CreateProduct } from '../services/create-product'
import { ListProducts } from '../services/list-products'
import { ShowProduct } from '../services/show-product'

interface ICreateProductRequest {
	name: string
	price: number
	quantity: number
}

export class ProductsController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listProducts = new ListProducts()

		const products = await listProducts.execute()

		return response.json(products)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showProduct = new ShowProduct()

		const product = await showProduct.execute({ id })

		return response.json(product)
	}

	public async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			ICreateProductRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body

		const createProduct = new CreateProduct()

		const product = await createProduct.execute({ name, price, quantity })

		return response.json(product)
	}
}
