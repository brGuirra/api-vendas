import { AppError } from '@shared/errors/app-error'
import { IProduct } from '../domain/models/IProduct'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

export class ShowProductService {
	constructor(private readonly productsRepository: IProductsRepository) {}

	public async execute(id: string): Promise<IProduct> {
		const product = await this.productsRepository.findById(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		return product
	}
}
