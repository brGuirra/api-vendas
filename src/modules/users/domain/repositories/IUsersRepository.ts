import { IUser } from '../models/IUser'

export interface IUsersRepository {
	findByName(name: string): Promise<IUser>

	findById(id: string): Promise<IUser>

	findByEmail(email: string): Promise<IUser>
}
