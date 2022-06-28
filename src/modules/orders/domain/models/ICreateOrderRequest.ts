import { IOrderProductRequest } from './IOrderProductRequest'

export interface ICreateOrderRequest {
	customer_id: string
	products: IOrderProductRequest[]
}
