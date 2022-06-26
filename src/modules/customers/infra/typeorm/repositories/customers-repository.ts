import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer'
import { ICustomer } from '@modules/customers/domain/models/ICustomer'
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository'
import { getRepository, Repository } from 'typeorm'
import { Customer } from '../entities/customer'

export class CustomersRepository implements ICustomersRepository {
	private readonly ormRepository: Repository<Customer>

	constructor() {
		this.ormRepository = getRepository(Customer)
	}

	public async findByName(name: string): Promise<ICustomer> {
		const customer = await this.ormRepository.findOne({
			where: { name },
		})

		return customer
	}

	public async findById(id: string): Promise<ICustomer> {
		const customer = await this.ormRepository.findOne({
			where: { id },
		})

		return customer
	}

	public async findByEmail(email: string): Promise<ICustomer> {
		const customer = await this.ormRepository.findOne({
			where: { email },
		})

		return customer
	}

	public async create(data: ICreateCustomer): Promise<ICustomer> {
		const customer = this.ormRepository.create(data)

		await this.ormRepository.save(customer)

		return customer
	}

	public async save(customer: ICustomer): Promise<void> {
		await this.ormRepository.save(customer)
	}

	public async remove(customer: ICustomer): Promise<void> {
		await this.ormRepository.remove(customer)
	}
}
