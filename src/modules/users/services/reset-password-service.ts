import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { isAfter, addHours } from 'date-fns'
import { hash } from 'bcryptjs'
import { UserTokensRepository } from '../typeorm/repositories/user-tokens-repository'
import { UsersRepository } from '../typeorm/repositories/users-repository'

interface IResetPassword {
	token: string
	password: string
}

export class ResetPasswordService {
	public async execute({ token, password }: IResetPassword): Promise<void> {
		const usersRepository = getCustomRepository(UsersRepository)
		const userTokensRepository = getCustomRepository(UserTokensRepository)
		const userToken = await userTokensRepository.findToken(token)

		if (!userToken) {
			throw new AppError('User token does not exist')
		}

		const user = await usersRepository.findById(userToken.user_id)

		if (!user) {
			throw new AppError('User does not exist')
		}

		const tokenCreationDate = userToken.created_at
		const tokenExpirationDate = addHours(tokenCreationDate, 2)

		if (isAfter(Date.now(), tokenExpirationDate)) {
			throw new AppError('Token expired')
		}

		user.password = await hash(password, 8)
	}
}
