import { getRepository, In, Repository } from 'typeorm'
import { IProduct } from '@modules/products/domain/models/IProduct'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct'
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct'
import { Product } from '../entities/product'

export class ProductsRepository implements IProductsRepository {
	private readonly ormRepository: Repository<Product>

	constructor() {
		this.ormRepository = getRepository(Product)
	}

	public async find(): Promise<IProduct[]> {
		const products = await this.ormRepository.find()

		return products
	}

	public async findByName(name: string): Promise<IProduct> {
		const product = await this.ormRepository.findOne({
			where: { name },
		})

		return product
	}

	public async findById(id: string): Promise<IProduct> {
		const product = await this.ormRepository.findOne(id)

		return product
	}

	public async findAllByIds(products_ids: string[]): Promise<IProduct[]> {
		const products = await this.ormRepository.find({
			where: {
				id: In(products_ids),
			},
		})

		return products
	}

	public async create(data: ICreateProduct): Promise<IProduct> {
		const product = this.ormRepository.create(data)

		await this.ormRepository.save(product)

		return product
	}

	public async remove(product: IProduct): Promise<void> {
		await this.ormRepository.remove(product)
	}

	public async save(product: IProduct): Promise<void> {
		await this.ormRepository.save(product)
	}

	public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
		await this.ormRepository.save(products)
	}
}
