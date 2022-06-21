import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

interface IShowProduct {
	id: string
}

export class ShowProductService {
	public async execute({ id }: IShowProduct): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository)

		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		return product
	}
}
