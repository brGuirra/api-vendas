import { EntityRepository, Repository } from 'typeorm'
import { Customer } from '../entities/customer'

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
	public async findByName(name: string): Promise<Customer> {
		return this.findOne({
			where: { name },
		})
	}

	public async findById(id: string): Promise<Customer> {
		return this.findOne({
			where: { id },
		})
	}

	public async findByEmail(email: string): Promise<Customer> {
		return this.findOne({
			where: { email },
		})
	}
}
