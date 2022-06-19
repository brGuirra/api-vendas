import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/product-repository'

interface IProduct {
	name: string
	price: number
	quantity: number
}

export class CreateProduct {
	public async execute({ name, price, quantity }: IProduct): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository)
		const productAlreadyExists = await productsRepository.findByName(name)

		if (productAlreadyExists) {
			throw new AppError(`Product ${name} already exists`)
		}

		const product = productsRepository.create({
			name,
			price,
			quantity,
		})

		await productsRepository.save(product)

		return product
	}
}