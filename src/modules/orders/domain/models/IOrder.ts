/* eslint import/no-cycle: 0 */

import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { IOrderProduct } from './IOrderProduct'

export interface IOrder {
	id: string
	customer: ICustomer
	order_products: IOrderProduct[]
	created_at: Date
	updated_at: Date
}
