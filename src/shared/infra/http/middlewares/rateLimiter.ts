import AppError from '@shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import Redis from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: String(process.env.REDIS_PASS || undefined),
    })

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    })

    await limiter.consume(req.ip)

    return next()
  } catch (error) {
    throw new AppError('Too many requests.', 429)
  }
}

export default rateLimiter
