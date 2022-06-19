import { Request, Response } from 'express'
import { ListProducts } from '../services/list-products'
import { ShowProduct } from '../services/show-product'

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
}
