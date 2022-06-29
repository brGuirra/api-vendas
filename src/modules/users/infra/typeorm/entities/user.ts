import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm'

import { Exclude, Expose } from 'class-transformer'
import { IUser } from '@modules/users/domain/models/IUser'

@Entity('users')
export class User implements IUser {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	email: string

	@Column()
	@Exclude()
	password: string

	@Column()
	avatar: string

	@CreateDateColumn()
	created_at: Date

	@UpdateDateColumn()
	updated_at: Date

	@Expose({ name: 'avatar_url' })
	getAvatarUrl(): string | undefined {
		if (!this.avatar) {
			return undefined
		}

		return `${process.env.API_URL}/files/${this.avatar}`
	}
}
