import { Request, Response } from 'express'
import { container } from 'tsyringe'
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
		const listProductsService = container.resolve(ListProductsService)

		const products = await listProductsService.execute()

		return response.json(products)
	}

	public async show(request: Request, response: Response): Promise<Response> {
		const { id } = request.params

		const showProductService = container.resolve(ShowProductService)

		const product = await showProductService.execute(id)

		return response.json(product)
	}

	public async create(
		request: Request<
			Record<string, string>,
			Record<string, any>,
			IProductRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body

		const createProductService = container.resolve(CreateProductService)

		const product = await createProductService.execute({
			name,
			price,
			quantity,
		})

		return response.json(product)
	}

	public async update(
		request: Request<
			Record<string, string>,
			Record<string, any>,
			IProductRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, price, quantity } = request.body
		const { id } = request.params

		const updateProductService = container.resolve(UpdateProductService)

		const product = await updateProductService.execute({
			id,
			name,
			price,
			quantity,
		})

		return response.json(product)
	}

	public async delete(
		request: Request<Record<string, string>>,
		response: Response
	): Promise<Response> {
		const { id } = request.params

		const deleteProductService = container.resolve(DeleteProductService)

		await deleteProductService.execute(id)

		return response.json({ message: `Product ${id} deleted` })
	}
}
