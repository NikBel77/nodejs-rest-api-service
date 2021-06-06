import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs'

class Logger {
    private dir = './log';
    private requestsStream = createWriteStream(`${this.dir}/requests.log`);
    private errorStream = createWriteStream(`${this.dir}/errors.log`)
    private rejectionsStream = createWriteStream(`${this.dir}/promise-rejections.log`)

    constructor() {
        if (!existsSync(this.dir)) mkdirSync(this.dir);
    }

    logRejection(reason: string) {
        const time = new Date()
        this.rejectionsStream.write(
            `Unhandled Rejection. ${time.toLocaleString()} Reason: ${reason}\n`
        );
    }

    writeAppCrash(err: Error) {
        const time = new Date()
        writeFileSync(`${this.dir}/app-crash.log`,
            `Uncaught Exception thrown ${time.toLocaleString()}, Error: ${err.name}, message: ${err.message}`
        );
    }

    writeError(statusCode: number, method: string, url: string) {
        const time = new Date()
        this.errorStream.write(`${time.toLocaleString()} ${method} ${url} ${statusCode}\n`);
    }

    writeRequest(method: string, url: string, statusCode: number, ms: number) {
        this.requestsStream.write(`${method} ${url} ${statusCode} [${ms}ms]\n`);
    }
}

export default new Logger()