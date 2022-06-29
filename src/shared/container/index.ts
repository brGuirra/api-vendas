import { container } from 'tsyringe'

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { CustomersRepository } from '@modules/customers/infra/typeorm/repositories/customers-repository'
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository'
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/products-repository'
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository'
import { OrdersRepository } from '@modules/orders/infra/typeorm/repositories/orders-repository'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/users-repository'
import { IUserTokensRepository } from '@modules/users/domain/models/IUserTokensRepository'
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/user-tokens-repository'

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

container.registerSingleton<IUsersRepository>(
	'UsersRepository',
	UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
	'UserTokensRepository',
	UserTokensRepository
)
