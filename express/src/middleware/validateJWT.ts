import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { User } from '../entities/User'
import { getRepository } from 'typeorm'
import config from '../common/config'
import { UnauthorizedError } from './errorHandler'
import whiteList from '../common/JWTwhitelist'
const secret = config.JWT_SECRET_KEY!

export default async function (req: Request, _res: Response, next: NextFunction): Promise<void> {
    if (whiteList.some(({ url, method }) => (url === req.url && method === req.method))) {
        return next()
    }

    try {
        const repo = getRepository(User)
        const sessionToken = req.headers.authorization;
        
        if (!sessionToken) throw new Error('No token provided')
        const [type, token] = sessionToken.split(' ')
        if (type !== 'Bearer') throw new Error('Wrong token type')
        if (!token) throw new Error('No token provided')
        
        const decoded = verify(token, secret)
        if (!decoded || typeof decoded == 'string') throw new Error('not authorized')
            
        const { userId } = decoded
        const user = await repo.findOne({ where: { id: userId } })
        
        if (!user) new Error('not authorized')
        next()

    } catch {

        return next(new UnauthorizedError('not authorized'))

    }
}