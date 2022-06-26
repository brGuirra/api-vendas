import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { ICreateCustomer } from '../domain/models/ICreateCustomer'
import { ICustomer } from '../domain/models/ICustomer'
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository'

@injectable()
export class CreateCustomerService {
	constructor(
		@inject('CustomersRepository')
		private readonly customersRepository: ICustomersRepository
	) {}

	public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
		const emailAlreadyExists = await this.customersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError('Email address is already in use')
		}

		const customer = await this.customersRepository.create({
			name,
			email,
		})

		return customer
	}
}
