import { NextFunction, Request, Response } from "express";
import { finished } from "stream";
import logger from "./Logger";

/**
 * Logger log all requests to console
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next 
 */
export function requestLoggerMw(req: Request, res: Response, next: NextFunction): void {
    const { method, url } = req;
    const start: number = Date.now();

    next();

    finished(res, () => {
        const ms = Date.now() - start;
        const { statusCode } = res;
        logger.writeRequest(method, url, statusCode, ms)
    });
}