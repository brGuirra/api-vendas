import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { ICreateProduct } from '../domain/models/ICreateProduct'
import { IProduct } from '../domain/models/IProduct'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

export class CreateProductService {
	constructor(private readonly productsRepository: IProductsRepository) {}

	public async execute({
		name,
		price,
		quantity,
	}: ICreateProduct): Promise<IProduct> {
		const productAlreadyExists = await this.productsRepository.findByName(name)

		if (productAlreadyExists) {
			throw new AppError(`Product ${name} already exists`)
		}

		const product = this.productsRepository.create({
			name,
			price,
			quantity,
		})

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		return product
	}
}
