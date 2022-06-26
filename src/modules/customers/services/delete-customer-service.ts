import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export class DeleteCustomerService {
	constructor(
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository
	) {}

	public async execute(id: string): Promise<void> {
		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		await this.customersRepository.remove(customer)
	}
}
