import { authConfig } from '@config/auth'
import { AppError } from '@shared/errors/app-error'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

export const authenticationMiddelware = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const authHeader = request.headers.authorization

	if (!authHeader) {
		throw new AppError('JWT token is missing', 401)
	}

	const [, token] = authHeader.split(' ')

	try {
		verify(token, authConfig.jwt.secret)

		next()
	} catch {
		throw new AppError('Invalid JWT token', 401)
	}
}
