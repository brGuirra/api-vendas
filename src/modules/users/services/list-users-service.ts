import { AppError } from '@shared/errors/app-error'
import { IUser } from '../domain/models/IUser'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

export class ListUsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	public async execute(): Promise<IUser[]> {
		const users = await this.usersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
