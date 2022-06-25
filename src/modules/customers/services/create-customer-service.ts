import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../infra/typeorm/entities/customer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

interface ICreateCustomer {
	name: string
	email: string
}

export class CreateCustomerService {
	public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository)
		const emailAlreadyExists = await customersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError('Email address is already in use')
		}

		const customer = customersRepository.create({
			name,
			email,
		})

		await customersRepository.save(customer)

		return customer
	}
}
