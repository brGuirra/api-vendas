import { ICreateUser } from '@modules/users/domain/models/ICreateUser'
import { IUser } from '@modules/users/domain/models/IUser'
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import { User } from '../entities/user'

export class UsersRepository implements IUsersRepository {
	private readonly ormRepository: Repository<User>

	constructor() {
		this.ormRepository = getRepository(User)
	}

	async find(): Promise<IUser[]> {
		const users = await this.ormRepository.find()

		return users
	}

	public async findByName(name: string): Promise<IUser> {
		const user = await this.ormRepository.findOne({
			where: { name },
		})

		return user
	}

	public async findById(id: string): Promise<IUser> {
		const user = await this.ormRepository.findOne({
			where: { id },
		})

		return user
	}

	public async findByEmail(email: string): Promise<IUser> {
		const user = await this.ormRepository.findOne({
			where: { email },
		})

		return user
	}

	public async create(data: ICreateUser): Promise<IUser> {
		const user = this.ormRepository.create(data)

		await this.ormRepository.save(user)

		return user
	}
}
