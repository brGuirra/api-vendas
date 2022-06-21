import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities/user'
import { UsersRepository } from '../typeorm/repositories/users-repository'

export class ListUsersService {
	public async execute(): Promise<User[]> {
		const usersRepository = getCustomRepository(UsersRepository)

		const users = await usersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
