import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

@injectable()
export class DeleteProductService {
	constructor(
		@inject('ProductsRepository')
		private readonly productsRepository: IProductsRepository
	) {}

	public async execute(id: string): Promise<void> {
		const product = await this.productsRepository.findById(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		await this.productsRepository.remove(product)
	}
}
