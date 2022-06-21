import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

interface IDeleteProduct {
	id: string
}

export class DeleteProduct {
	public async execute({ id }: IDeleteProduct): Promise<void> {
		const productsRepository = getCustomRepository(ProductsRepository)

		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		await productsRepository.remove(product)
	}
}
