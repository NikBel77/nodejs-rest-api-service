import { LoggerService } from '@nestjs/common';
import fs from 'fs';
import path from 'path';

export class AppLogger implements LoggerService {
  constructor() {
    const logsDir = './logs';

    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }
  }

  private errorStream = fs.createWriteStream(
    path.resolve(__dirname, '../logs/error.log'),
  );

  private warnStream = fs.createWriteStream(
    path.resolve(__dirname, '../logs/warn.log'),
  );

  private logStream = fs.createWriteStream(
    path.resolve(__dirname, '../logs/common.log'),
  );

  log(message: any) {
    this.logStream.write(message + '\n');
  }

  error(message: any) {
    this.errorStream.write(message + '\n');
  }

  warn(message: any) {
    this.warnStream.write(message + '\n');
  }
}
