import { NextFunction, Request, Response } from "express"
import { finished } from "stream"

/**
 * Logger log all requests to console
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next 
 */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const start: number = Date.now();

    next();

    finished(res, () => {
        const ms = Date.now() - start;
        const { statusCode } = res;
        console.log(`${method} ${url} ${statusCode} [${ms}ms]`);
    });
}