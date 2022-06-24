import { RedisCache } from '@shared/cache/redis-cache'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Product } from '../typeorm/entities/product'
import { ProductsRepository } from '../typeorm/repositories/products-repository'

interface IUpdateProduct {
	id: string
	name: string
	price: number
	quantity: number
}

export class UpdateProductService {
	public async execute({
		id,
		name,
		price,
		quantity,
	}: IUpdateProduct): Promise<Product> {
		const productsRepository = getCustomRepository(ProductsRepository)

		const product = await productsRepository.findOne(id)

		if (!product) {
			throw new AppError(`Product ${id} not found`)
		}

		const productAlreadyExists = await productsRepository.findByName(name)

		if (productAlreadyExists && name !== product.name) {
			throw new AppError(`Product ${name} already exists`)
		}

		product.name = name
		product.price = price
		product.quantity = quantity

		const redisCache = RedisCache.getInstance()
		await redisCache.invalidate(process.env.REDIS_PRODUCT_CACHE_KEY)

		await productsRepository.save(product)

		return product
	}
}
