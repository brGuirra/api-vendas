import { IUser } from '../domain/models/IUser'

export interface ISession {
	user: IUser
	token: string
}
