import path from 'node:path'
import { EtherealMail } from '@config/mail/ethereal-mail'
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

		const { token } = await userTokensRepository.generate(user.id)
		const forgotPasswordTemplate = path.resolve(
			'src',
			'modules',
			'users',
			'views',
			'forgot-password.hbs'
		)

		await EtherealMail.sendMail({
			to: { name: user.name, email: user.email },
			subject: '[API Vendas] Recuperação de senha',
			templateData: {
				file: forgotPasswordTemplate,
				variables: {
					name: user.name,
					link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
				},
			},
		})
	}
}
