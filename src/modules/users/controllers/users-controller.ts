import { Request, Response } from 'express'
import { CreateUser } from '../services/create-user'
import { ListUsers } from '../services/list-users'

interface IUserRequest {
	name: string
	email: string
	password: string
}

export class UsersController {
	public async index(request: Request, response: Response): Promise<Response> {
		const listUsers = new ListUsers()
		const users = await listUsers.execute()

		return response.json(users)
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
		const createUser = new CreateUser()
		const user = await createUser.execute({ name, email, password })

		return response.json(user)
	}
}
