import { ICreateCustomer } from '../models/ICreateCustomer'
import { ICustomer } from '../models/ICustomer'

export interface ICustomersRepository {
	find(): Promise<ICustomer[]>

	findByName(name: string): Promise<ICustomer>

	findById(id: string): Promise<ICustomer>

	findByEmail(email: string): Promise<ICustomer>

	create(data: ICreateCustomer): Promise<ICustomer>

	save(customer: ICustomer): Promise<void>

	remove(customer: ICustomer): Promise<void>
}
