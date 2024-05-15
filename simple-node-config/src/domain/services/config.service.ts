import { Injectable } from '@nestjs/common';
import { ConsulConfigService } from 'src/infrastructure/consul/consul-config.service';

@Injectable()
export class ConfigService {
  constructor(private consulConfigService: ConsulConfigService) {}

  async getAllConfig() {
    return {
      APP_NAME: await this.consulConfigService.getKey('APP_NAME'),
      APP_PORT: await this.consulConfigService.getKey('APP_PORT'),
      DB_HOST: await this.consulConfigService.getKey('DB_HOST'),
      DB_PASSWORD: await this.consulConfigService.getKey('DB_PASSWORD'),
      DB_USERNAME: await this.consulConfigService.getKey('DB_USERNAME'),
    };
  }
}
