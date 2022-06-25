import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities/user'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface IShowProfileRequest {
	user_id: string
}

export class ShowProfileService {
	public async execute({ user_id }: IShowProfileRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)

		const user = await usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('User not found')
		}

		return user
	}
}
