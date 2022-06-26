import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ICustomer } from '../domain/models/ICustomer'
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

export class UpdateCustomerService {
	public async execute({
		id,
		name,
		email,
	}: IUpdateCustomer): Promise<ICustomer> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const customer = await customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		const customerEmailAlreadyExists = await customersRepository.findByEmail(
			email
		)

		if (customerEmailAlreadyExists && email !== customer.email) {
			throw new AppError('There is already a customer with this email')
		}

		customer.name = name
		customer.email = email

		await customersRepository.save(customer)

		return customer
	}
}
