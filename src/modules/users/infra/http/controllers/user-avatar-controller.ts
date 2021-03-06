import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { container } from 'tsyringe'

import { UpdateUserAvatarService } from '../../../services/update-user-avatar-service'

export class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatarService = container.resolve(UpdateUserAvatarService)

		const user = await updateUserAvatarService.execute({
			userId: request.user.id,
			avatarFileName: request.file.filename,
		})

		return response.json(instanceToInstance(user))
	}
}
