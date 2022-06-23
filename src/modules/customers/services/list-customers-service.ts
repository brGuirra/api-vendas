import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../typeorm/entities/customer'
import { CustomersRepository } from '../typeorm/repositories/customers-repository'

export class ListCustomersService {
	public async execute(): Promise<Customer[]> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const users = await customersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
