import { ICreateProduct } from '../models/ICreateProduct'
import { IProduct } from '../models/IProduct'

export interface IProductsRepository {
	find(): Promise<IProduct[]>

	findById(id: string): Promise<IProduct>

	findByName(name: string): Promise<IProduct>

	findAllByIds(products_ids: string[]): Promise<IProduct[]>

	create(data: ICreateProduct): Promise<IProduct>

	remove(product: IProduct): Promise<void>

	save(product: IProduct): Promise<void>
}
