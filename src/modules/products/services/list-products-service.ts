import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../domain/models/IProduct'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

@injectable()
export class ListProductsService {
	constructor(
		@inject('ProductsRepository')
		private readonly productsRepository: IProductsRepository
	) {}

	public async execute(): Promise<IProduct[]> {
		const redisCache = RedisCache.getInstance()

		let products = await redisCache.recover<IProduct[]>(
			process.env.REDIS_PRODUCT_CACHE_KEY
		)

		if (!products) {
			products = await this.productsRepository.find()

			if (products.length === 0) {
				throw new AppError('No products found')
			}

			await redisCache.save(process.env.REDIS_PRODUCT_CACHE_KEY, products)
		}

		return products
	}
}
