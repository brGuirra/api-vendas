import path from 'node:path'

import { EtherealMail } from '@config/mail/ethereal-mail'
import { AppError } from '@shared/errors/app-error'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { IUserTokensRepository } from '../domain/models/IUserTokensRepository'

export class SendForgotPasswordEmailService {
	constructor(
		private readonly usersRepository: IUsersRepository,
		private readonly userTokensRepository: IUserTokensRepository
	) {}

	public async execute(email: string): Promise<void> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('User does not exist')
		}

		const { token } = await this.userTokensRepository.generate(user.id)
		const forgotPasswordTemplate = path.resolve(
			__dirname,
			'..',
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
