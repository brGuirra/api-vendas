import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

export class ListProductsService {
	public async execute(): Promise<Product[]> {
		const productsRepository = getCustomRepository(ProductsRepository)
		const redisCache = new RedisCache()

		let products = await redisCache.recover<Product[]>(
			process.env.REDIS_PRODUCT_CACHE_KEY
		)

		if (!products) {
			products = await productsRepository.find()

			if (products.length === 0) {
				throw new AppError('No products found')
			}

			await redisCache.save(process.env.REDIS_PRODUCT_CACHE_KEY, products)
		}

		return products
	}
}
