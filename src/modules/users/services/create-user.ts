import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { User } from '../typeorm/entities/user'
import { UsersRepository } from '../typeorm/repositories/users-repository'

interface ICreateUser {
	name: string
	email: string
	password: string
}

export class CreateUser {
	public async execute({ name, email, password }: ICreateUser): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)
		const emailAlreadyExists = await usersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError(`The email is already registered`)
		}

		const user = usersRepository.create({
			name,
			email,
			password,
		})

		await usersRepository.save(user)

		return user
	}
}
