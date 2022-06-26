import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

export class DeleteProductService {
	constructor(private readonly productsRepository: IProductsRepository) {}

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
