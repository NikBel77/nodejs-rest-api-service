import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import Logger from '../utils/Logger'

/**
 * Handle custom errors
 * @param {Error} err
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
export default function errorHandler(
    err: Error, req: Request, res: Response, _next: NextFunction
): void {
    const { url , method } = req
    if (!(err instanceof NotFoundError) && !(err instanceof BadRequestError)) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
        Logger.writeError(StatusCodes.INTERNAL_SERVER_ERROR, method, url)
        return
    }
    const { message, statusCode } = err
    res.status(statusCode).json({ message })
    Logger.writeError(statusCode, method, url)
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
