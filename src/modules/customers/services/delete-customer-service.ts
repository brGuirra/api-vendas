import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { CustomersRepository } from '../infra/typeorm/repositories/customers-repository'

interface IDeleteCustomerRequest {
	id: string
}

export class DeleteCustomerService {
	public async execute({ id }: IDeleteCustomerRequest): Promise<void> {
		const customersRepository = getCustomRepository(CustomersRepository)

		const customer = await customersRepository.findById(id)

		if (!customer) {
			throw new AppError('Customer not found')
		}

		await customersRepository.remove(customer)
	}
}
