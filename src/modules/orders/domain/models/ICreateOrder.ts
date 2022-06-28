import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { IOrderProduct } from './IOrderProduct'

export interface ICreateOrder {
	customer: ICustomer
	products: IOrderProduct[]
}
