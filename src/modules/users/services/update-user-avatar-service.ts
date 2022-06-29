import path from 'node:path'
import fs from 'node:fs/promises'

import { uploadConfig } from '@config/upload'
import { AppError } from '@shared/errors/app-error'
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar'
import { IUsersRepository } from '../domain/repositories/IUsersRepository'
import { IUser } from '../domain/models/IUser'

export class UpdateUserAvatarService {
	constructor(private readonly usersRepository: IUsersRepository) {}

	public async execute({
		avatarFileName,
		userId,
	}: IUpdateUserAvatar): Promise<IUser> {
		const user = await this.usersRepository.findById(userId)

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

		await this.usersRepository.save(user)

		return user
	}
}
