import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { OrdersProducts } from '@modules/orders/infra/typeorm/entities/orders-products'

export interface IOrder {
	id: string
	customer: ICustomer
	order_products: OrdersProducts[]
	created_at: Date
	updated_at: Date
}
