import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import { AppError } from '@shared/errors/app-error'

export async function rateLimiter(
	request: Request,
	response: Response,
	next: NextFunction
): Promise<void> {
	try {
		const redisClient = new Redis({
			password: process.env.REDIS_PASSWORD ?? undefined,
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
		})

		const limiter = new RateLimiterRedis({
			storeClient: redisClient,
			keyPrefix: 'ratelimit',
			points: 5,
			duration: 1,
		})

		await limiter.consume(request.ip)

		next()
	} catch {
		throw new AppError('Too many requests', 429)
	}
}
