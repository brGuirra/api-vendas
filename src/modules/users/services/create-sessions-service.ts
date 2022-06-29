import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/app-error'
import { ICreateSessionRequest } from '../domain/models/ICreateSessionRequest'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { ISession } from './ISession'

export class CreateSessionsService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute({
		email,
		password,
	}: ICreateSessionRequest): Promise<ISession> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('Invalid email or password', 401)
		}

		const isPasswordCorrect = await compare(password, user.password)

		if (!isPasswordCorrect) {
			throw new AppError('Invalid email or password', 401)
		}

		const token = sign({}, authConfig.jwt.secret, {
			subject: user.id,
			expiresIn: authConfig.jwt.expiresIn,
		})

		return { user, token }
	}
}
