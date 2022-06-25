import { AppError } from '@shared/errors/app-error'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { authConfig } from '@config/auth'
import { User } from '../infra/typeorm/entities/user'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface ICreateSessionRequest {
	email: string
	password: string
}

interface ICreateSessionResponse {
	user: User
	token: string
}

export class CreateSessionsService {
	public async execute({
		email,
		password,
	}: ICreateSessionRequest): Promise<ICreateSessionResponse> {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)

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
