import { Request, Response } from 'express'
import { ListProducts } from '../services/list-products'

export class ProductsController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listProducts = new ListProducts()

		const products = await listProducts.execute()

		return response.json(products)
	}
}
