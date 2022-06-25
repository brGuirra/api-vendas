import { AppError } from '@shared/errors/app-error'
import { hash } from 'bcryptjs'
import { getCustomRepository } from 'typeorm'
import { User } from '../infra/typeorm/entities/user'
import { UsersRepository } from '../infra/typeorm/repositories/users-repository'

interface ICreateUser {
	name: string
	email: string
	password: string
}

export class CreateUserService {
	public async execute({ name, email, password }: ICreateUser): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)
		const emailAlreadyExists = await usersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError(`The email is already registered`)
		}

		const hashedPassword = await hash(password, 8)

		const user = usersRepository.create({
			name,
			email,
			password: hashedPassword,
		})

		await usersRepository.save(user)

		return user
	}
}
