import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

interface ICreateProduct {
	name: string
	price: number
	quantity: number
}

export class CreateProductService {
	public async execute({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<Product> {
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
