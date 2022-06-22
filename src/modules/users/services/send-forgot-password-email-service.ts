import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { UserTokensRepository } from '../typeorm/repositories/user-tokens-repository'
import { UsersRepository } from '../typeorm/repositories/users-repository'

interface IForgotPasswordEmail {
	email: string
}

export class SendForgotPasswordEmailService {
	public async execute({ email }: IForgotPasswordEmail): Promise<void> {
		const usersRepository = getCustomRepository(UsersRepository)
		const userTokensRepository = getCustomRepository(UserTokensRepository)
		const user = await usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('User does not exist')
		}

		const userToken = await userTokensRepository.generate(user.id)

		console.log(userToken)
	}
}
