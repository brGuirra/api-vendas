import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

export class ListCustomersService {
	public async execute(): Promise<ICustomer[]> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const users = await customersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
