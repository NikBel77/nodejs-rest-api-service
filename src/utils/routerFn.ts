import { NextFunction, Request, RequestHandler, Response } from 'express'

export default (cb: RequestHandler) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await cb(req, res, next)
        } catch (err) {
            next(err)
        }
}