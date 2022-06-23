import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { Customer } from '../typeorm/entities/customer'
import { CustomersRepository } from '../typeorm/repositories/customers-repository'

interface IShowCustomerRequest {
	id: string
}

export class ShowCustomerService {
	public async execute({ id }: IShowCustomerRequest): Promise<Customer> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const customer = await customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		return customer
	}
}
