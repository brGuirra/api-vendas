import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../infra/typeorm/entities/customer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

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
