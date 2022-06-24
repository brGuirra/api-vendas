import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

interface IDeleteProduct {
	id: string
}

export class DeleteProductService {
	public async execute({ id }: IDeleteProduct): Promise<void> {
		const productsRepository = getCustomRepository(ProductsRepository)

		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		await productsRepository.remove(product)
	}
}
