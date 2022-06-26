import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

export class CreateCustomerService {
	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
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
