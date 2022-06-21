import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

export class ListProductsService {
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductsRepository)

		const products = await productsRepository.find()

		if (products.length === 0) {
			throw new AppError('No products found')
		}

		return products
	}
}