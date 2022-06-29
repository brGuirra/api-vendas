import { AppError } from '@shared/errors/app-error'
import { IUser } from '../domain/models/IUser'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'

export class ShowProfileService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute(user_id: string): Promise<IUser> {
		const user = await this.usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('User not found')
		}

		return user
	}
}
