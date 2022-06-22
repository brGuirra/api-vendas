import { Request, Response } from 'express'
import { UpdateUserAvatarService } from '../services/update-user-avatar-service'

export class UserAvatarController {
	public async update(request: Request, response: Response): Promise<Response> {
		const updateUserAvatarService = new UpdateUserAvatarService()

		const user = await updateUserAvatarService.execute({
			userId: request.user.id,
			avatarFileName: request.file.filename,
		})

		return response.json(user)
	}
}
