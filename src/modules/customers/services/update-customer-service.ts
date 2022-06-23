import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../typeorm/entities/customer'
import { CustomersRepository } from '../typeorm/repositories/customers-repository'

interface IUpdateCustomerRequest {
	id: string
	name: string
	email: string
}

export class UpdateCustomerService {
	public async execute({
		id,
		name,
		email,
	}: IUpdateCustomerRequest): Promise<Customer> {
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
