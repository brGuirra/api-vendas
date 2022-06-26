import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../domain/models/IProduct'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

@injectable()
export class ShowProductService {
	constructor(
		@inject('ProductsRepository')
		private readonly productsRepository: IProductsRepository
	) {}

	public async execute(id: string): Promise<IProduct> {
		const product = await this.productsRepository.findById(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		return product
	}
}
