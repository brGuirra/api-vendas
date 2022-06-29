import { AppError } from '@shared/errors/app-error'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { ICreateUser } from '../domain/models/ICreateUser'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { User } from '../infra/typeorm/entities/user'

@injectable()
export class CreateUserService {
	constructor(
		@inject('UsersRepository')
		private readonly usersRepository: IUsersRepository
	) {}

	public async execute({ name, email, password }: ICreateUser): Promise<User> {
		const emailAlreadyExists = await this.usersRepository.findByEmail(email)

		if (emailAlreadyExists) {
			throw new AppError(`The email is already registered`)
		}

		const hashedPassword = await hash(password, 8)

		const user = await this.usersRepository.create({
			name,
			email,
			password: hashedPassword,
		})

		return user
	}
}
