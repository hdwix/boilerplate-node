import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {}

  getConfiguration() {
    const appName = this.configService.get<string>('APP_NAME');
    const appPort = this.configService.get<number>('APP_PORT');
    const dbUsername = this.configService.get<string>('DB_USERNAME');
    const dbPassword = this.configService.get<string>('DB_PASSWORD');
    const dbHost = this.configService.get<string>('DB_HOST');

    return {
      appName,
      appPort,
      dbUsername,
      dbPassword,
      dbHost
    };
  }
}
