import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { ICustomer } from '../domain/models/ICustomer'
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export class UpdateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository
	) {}

	public async execute({
		id,
		name,
		email,
	}: IUpdateCustomer): Promise<ICustomer> {
		const customer = await this.customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		const customerEmailAlreadyExists =
			await this.customersRepository.findByEmail(email)

		if (customerEmailAlreadyExists && email !== customer.email) {
			throw new AppError('There is already a customer with this email')
		}

		customer.name = name
		customer.email = email

		await this.customersRepository.save(customer)

		return customer
	}
}
