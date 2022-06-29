import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IUser } from '../domain/models/IUser'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'

@injectable()
export class ListUsersService {
	constructor(
		@inject('UsersRepository')
		private readonly usersRepository: IUsersRepository
	) {}

	public async execute(): Promise<IUser[]> {
		const users = await this.usersRepository.find()

		if (users.length === 0) {
			throw new AppError('No users found')
		}

		return users
	}
}
