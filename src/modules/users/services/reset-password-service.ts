import { isAfter, addHours } from 'date-fns'

import { AppError } from '@shared/errors/app-error'
import { hash } from 'bcryptjs'
import { IResetPasswordRequest } from '../domain/models/IResetPasswordRequest'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { IUserTokensRepository } from '../domain/models/IUserTokensRepository'

export class ResetPasswordService {
	constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly userTokensRepository: IUserTokensRepository
	) {}

	public async execute({
		token,
		password,
	}: IResetPasswordRequest): Promise<void> {
		const userToken = await this.userTokensRepository.findToken(token)

		if (!userToken) {
			throw new AppError('User token does not exist')
		}

		const user = await this.usersRepository.findById(userToken.user_id)

		if (!user) {
			throw new AppError('User does not exist')
		}

		const tokenCreationDate = userToken.created_at
		const tokenExpirationDate = addHours(tokenCreationDate, 2)

		if (isAfter(Date.now(), tokenExpirationDate)) {
			throw new AppError('Token expired')
		}

		user.password = await hash(password, 8)

		await this.usersRepository.save(user)
	}
}
