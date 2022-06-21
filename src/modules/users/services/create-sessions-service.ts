import { AppError } from '@shared/errors/app-error'
import { compare } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities/user'
import { UsersRepository } from '../typeorm/repositories/users-repository'

interface ICreateSessionRequest {
	email: string
	password: string
}

export class CreateSessionsService {
	public async execute({
		email,
		password,
	}: ICreateSessionRequest): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)
		const user = await usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('Invalid email or password', 401)
		}

		const isPasswordCorrect = await compare(password, user.password)

		if (!isPasswordCorrect) {
			throw new AppError('Invalid email or password', 401)
		}

		return user
	}
}
