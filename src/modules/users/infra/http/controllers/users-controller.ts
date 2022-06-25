import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'

import { CreateUserService } from '../../../services/create-user-service'
import { ListUsersService } from '../../../services/list-users-service'

interface IUserRequest {
	name: string
	email: string
	password: string
}

export class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listUsersService = new ListUsersService()
		const users = await listUsersService.execute()

		return response.json(instanceToInstance(users))
	}

	public async create(
		request: Request<
			Record<string, unknown>,
			Record<string, unknown>,
			IUserRequest
		>,
		response: Response
	): Promise<Response> {
		const { name, email, password } = request.body
		const createUserService = new CreateUserService()
		const user = await createUserService.execute({ name, email, password })

		return response.json(instanceToInstance(user))
	}
}
