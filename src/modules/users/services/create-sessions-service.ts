import { AppError } from '@shared/errors/app-error'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'
import { User } from '../typeorm/entities/user'
import { UsersRepository } from '../typeorm/repositories/users-repository'

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

		const token = sign({}, 'd5ed2ddae10572750303e47cc754ed09', {
			subject: user.id,
			expiresIn: '1d',
		})

		return { user, token }
	}
}
