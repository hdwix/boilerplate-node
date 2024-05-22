import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ConsulConfigService } from './domain/services/consul-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const consulConfigService = app.get(ConsulConfigService);
  const logger = new Logger('Bootstrap');
  await app.listen(configService.get('APP_PORT') || 3000);

  

  // clear;NODE_ENV=production npm run start
  // clear;NODE_ENV=local npm run start

  const environment = process.env.NODE_ENV || 'local';

  if (environment === 'production') {
    try {
      const initialConfig = {
        APP_NAME: configService.get<string>('APP_NAME'),
        APP_PORT: configService.get<string>('APP_PORT'),
        DB_HOST: configService.get<string>('DB_HOST'),
        DB_USERNAME: configService.get<string>('DB_USERNAME'),
        DB_PASSWORD: configService.get<string>('DB_PASSWORD'),
      };

      const filledConfig = await consulConfigService.fillMissingValuesFromConsul(initialConfig);
      // console.log(`test : ${filledConfig.APP_NAME}`)
      logger.log('Configuration after filling from Consul:', filledConfig);
    } catch (error) {
      logger.error('Failed to fetch configuration from Consul', error);
    }
  } else {
    const appName = configService.get<string>('APP_NAME');
    console.log(`APP_NAME : ${appName}`)
  }

}
bootstrap();

