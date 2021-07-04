import { Router } from 'express'
import { sign } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../../entities/User'
import { getRepository } from 'typeorm'
import routerFn from '../../utils/routerFn'
import config from '../../common/config'
import { ForbiddenError } from '../../middleware/errorHandler'
const secret = config.JWT_SECRET_KEY
if (secret === undefined) throw new Error('jwt secret key must be provided in .env file')

const router = Router()

router.route('/').post(routerFn(async (req, res) => {
    const { login, password } = req.body
    
    const repo = getRepository(User)
    const user = await repo.findOne({ where: { login: login }})
    
    if (!user) throw new ForbiddenError('User not found')
    
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new ForbiddenError('Passwords do not match')
    
    const token = sign({ userId: user.id, login: user.login }, secret, { expiresIn: '10m' })
    
    res.json({ token })
}))

export default router