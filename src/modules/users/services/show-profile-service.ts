import { AppError } from '@shared/errors/app-error'
import { inject, injectable } from 'tsyringe'
import { IUser } from '../domain/models/IUser'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'

@injectable()
export class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private readonly usersRepository: IUsersRepository
	) {}

	public async execute(user_id: string): Promise<IUser> {
		const user = await this.usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('User not found')
		}

		return user
	}
}
