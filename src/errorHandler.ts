import { NextFunction, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'

/**
 * Handle custom errors
 * @param {Error} err
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export default function errorHandler(
    err: Error, _req: Request, res: Response, _next: NextFunction
): void {
    if (!(err instanceof NotFoundError) && !(err instanceof BadRequestError)) {
        // next(err)
        return
    }
    const { message } = err
    res.status(err.statusCode).json({ message })
}

interface IRequestError extends Error {
    statusCode: number
}

export class NotFoundError extends Error implements IRequestError {
    public statusCode = StatusCodes.NOT_FOUND
}

export class BadRequestError extends Error implements IRequestError {
    public statusCode = StatusCodes.BAD_REQUEST
}
