import { container } from 'tsyringe'

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/customers-repository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/products-repository'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/orders-repository'
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository'

container.registerSingleton<ICustomersRepository>(
	'CustomersRepository',
	CustomersRepository
)

container.registerSingleton<IProductsRepository>(
	'ProductsRepository',
	ProductsRepository
)

container.registerSingleton<IOrdersRepository>(
	'OrdersRepository',
	OrdersRepository
)
