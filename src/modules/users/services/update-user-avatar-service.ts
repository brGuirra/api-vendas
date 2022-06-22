import path from 'node:path'
import fs from 'node:fs/promises'
import { AppError } from '@shared/errors/app-error'
import { getCustomRepository } from 'typeorm'
import { uploadConfig } from '@config/upload'
import { User } from '../typeorm/entities/user'
import { UsersRepository } from '../typeorm/repositories/users-repository'

interface IUpdateUserAvatar {
	userId: string
	avatarFileName: string
}

export class UpdateUserAvatarService {
	public async execute({
		avatarFileName,
		userId,
	}: IUpdateUserAvatar): Promise<User> {
		const usersRepository = getCustomRepository(UsersRepository)

		const user = await usersRepository.findById(userId)

		if (!user) {
			throw new AppError('User not found')
		}

		if (user.avatar) {
			const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.stat(userAvatarFilePath)

			if (userAvatarFileExists) {
				await fs.unlink(userAvatarFilePath)
			}
		}

		user.avatar = avatarFileName

		await usersRepository.save(user)

		return user
	}
}
