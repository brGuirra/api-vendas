import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export class ListCustomersService {
	constructor(
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository
	) {}

	public async execute(): Promise<ICustomer[]> {
		const users = await this.customersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
