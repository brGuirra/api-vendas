import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../infra/typeorm/entities/product'
import { ProductsRepository } from '../infra/typeorm/repositories/products-repository'

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

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		await productsRepository.save(product)

		return product
	}
}
