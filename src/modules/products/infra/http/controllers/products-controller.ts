import { Request, Response } from 'express'
import { CreateProductService } from '../../../services/create-product-service'
import { DeleteProductService } from '../../../services/delete-product-service'
import { ListProductsService } from '../../../services/list-products-service'
import { ShowProductService } from '../../../services/show-product-service'
import { UpdateProductService } from '../../../services/update-product-service'

interface IProductRequest {
	name: string
	price: number
	quantity: number
}

export class ProductsController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listProductsService = new ListProductsService()

		const products = await listProductsService.execute()

		return response.json(products)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showProductService = new ShowProductService()

		const product = await showProductService.execute({ id })

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

		const createProductService = new CreateProductService()

		const product = await createProductService.execute({
			name,
			price,
			quantity,
		})

		return response.json(product)
	}

	public async update(
		request: Request<{ id: string }, Record<string, unknown>, IProductRequest>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body
		const { id } = request.params

		const updateProductService = new UpdateProductService()

		const product = await updateProductService.execute({
			id,
			name,
			price,
			quantity,
		})

		return response.json(product)
	}

	public async delete(
		request: Request<{ id: string }>,
		response: Response
	): Promise<Response> {
		const { id } = request.params

		const deleteProductService = new DeleteProductService()

		await deleteProductService.execute({ id })

		return response.json({ message: `Product ${id} deleted` })
	}
}
