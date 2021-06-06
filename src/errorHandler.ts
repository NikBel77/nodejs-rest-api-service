import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { createWriteStream } from 'fs'

const writeStream = createWriteStream('./logs/errors.log')
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
    if (!(err instanceof NotFoundError) && !(err instanceof BadRequestError)) {
        // next(err)
        return
    }
    const time = new Date()
    const { url , method } = req
    const { message, statusCode } = err
    res.status(statusCode).json({ message })
    writeStream.write(`${time.toLocaleString()} ${method} ${url} ${statusCode}\n`);
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
