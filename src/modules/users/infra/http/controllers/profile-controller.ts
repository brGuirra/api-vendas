import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import { ShowProfileService } from '../../../services/show-profile-service'
import { UpdateProfileService } from '../../../services/update-profile-service'

interface IUserRequest {
	name: string
	email: string
	password?: string
	old_password?: string
}

export class ProfileController {
	public async show(request: Request, response: Response): Promise<Response> {
		const showProfileService = new ShowProfileService()
		const user_id = request.user.id
		const user = await showProfileService.execute({ user_id })

		return response.json(instanceToInstance(user))
	}

	public async update(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			IUserRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, email, password, old_password } = request.body
		const user_id = request.user.id
		const updateProfileService = new UpdateProfileService()
		const user = await updateProfileService.execute({
			user_id,
			name,
			email,
			password,
			old_password,
		})

		return response.json(instanceToInstance(user))
	}
}