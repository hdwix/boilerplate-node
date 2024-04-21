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
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(), // Tambahkan timestamp
        winston.format.printf((info) => {
          const { timestamp, message, context } = info;
          const source = context ? `| ${context}` : '';
          return `${timestamp} | ${APP_NAME} ${source} | ${message}`;
        }),
      ),
      transports: [dailyRotateFileTransport],
    });
  }

  log(message: string, context?: string) {
    this.logger.info(message, { context }); // Kirim context sebagai metadata
  }
}
