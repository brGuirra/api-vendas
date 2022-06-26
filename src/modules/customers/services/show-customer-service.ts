import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export class ShowCustomerService {
	constructor(
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository
	) {}

	public async execute(id: string): Promise<ICustomer> {
		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		return customer
	}
}
