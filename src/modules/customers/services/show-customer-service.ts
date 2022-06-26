import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { ICustomer } from '../domain/models/ICustomer'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

export class ShowCustomerService {
	public async execute(id: string): Promise<ICustomer> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const customer = await customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		return customer
	}
}
