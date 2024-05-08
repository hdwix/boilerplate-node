import { Injectable } from '@nestjs/common';
import { APP_NAME } from '../../constants';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Injectable()
export class LoggingService {
  private readonly logger: winston.Logger;

  constructor() {
    const dailyRotateFileTransport = new DailyRotateFile({
      filename: `logs/${APP_NAME}-%DATE%.log`,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '10m',
      maxFiles: '1d',
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          const { timestamp, message, context } = info;
          const source = context ? `| ${context}` : '';
          return `${timestamp} | ${APP_NAME} | ${message} ${source}`;
        }),
      ),
      transports: [dailyRotateFileTransport],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }
}
