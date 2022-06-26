import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IProduct } from '../domain/models/IProduct'
import { IUpdateProduct } from '../domain/models/IUpdateProduct'
import { IProductsRepository } from '../domain/repositories/IProductsRepository'

@injectable()
export class UpdateProductService {
	constructor(
		@inject('ProductsRepository')
		private readonly productsRepository: IProductsRepository
	) {}

	public async execute({
		id,
		name,
		price,
		quantity,
	}: IUpdateProduct): Promise<IProduct> {
		const product = await this.productsRepository.findById(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		const productAlreadyExists = await this.productsRepository.findByName(name)

		if (productAlreadyExists && name !== product.name) {
			throw new AppError(`Product ${name} already exists`)
		}

		product.name = name
		product.price = price
		product.quantity = quantity

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		await this.productsRepository.save(product)

		return product
	}
}
