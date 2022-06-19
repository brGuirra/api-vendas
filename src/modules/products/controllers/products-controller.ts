import { Request, Response } from 'express'
import { CreateProduct } from '../services/create-product'
import { DeleteProduct } from '../services/delete-product'
import { ListProducts } from '../services/list-products'
import { ShowProduct } from '../services/show-product'
import { UpdateProduct } from '../services/update-product'

interface IProductRequest {
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
			IProductRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body

		const createProduct = new CreateProduct()

		const product = await createProduct.execute({ name, price, quantity })

		return response.json(product)
	}

	public async update(
		request: Request<{ id: string }, Record<string, unknown>, IProductRequest>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body
		const { id } = request.params

		const updateProduct = new UpdateProduct()

		const product = await updateProduct.execute({ id, name, price, quantity })

		return response.json(product)
	}

	public async delete(
		request: Request<{ id: string }>,
		response: Response
	): Promise<Response> {
		const { id } = request.params

		const deleteProduct = new DeleteProduct()

		await deleteProduct.execute({ id })

		return response.json({ message: `Product ${id} deleted` })
	}
}
