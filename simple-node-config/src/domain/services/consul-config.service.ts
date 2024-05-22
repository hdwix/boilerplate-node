import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Consul from 'consul';

@Injectable()
export class ConsulConfigService {
  private readonly logger = new Logger(ConsulConfigService.name);
  private consul: Consul;

  constructor(private configService: ConfigService) {
    const host = this.configService.get<string>('CONSUL_HOST');
    const port = this.configService.get<number>('CONSUL_PORT');
    this.consul = new Consul({ host, port });
  }

  async getConsulConfig() {
    const keys = ['APP_NAME', 'APP_PORT', 'DB_HOST', 'DB_USERNAME', 'DB_PASSWORD'];
    const config = {};

    for (const key of keys) {
      try {
        const value = await this.consul.kv.get(key);
        if (value) {
          config[key] = value.Value;
        } else {
          this.logger.warn(`Key ${key} not found in Consul`);
        }
      } catch (error) {
        this.logger.error(`Error fetching key ${key} from Consul`, error);
        throw error;
      }
    }

    return config;
  }

  async fillMissingValuesFromConsul(config) {
    const keys = ['APP_NAME', 'APP_PORT', 'DB_HOST', 'DB_USERNAME', 'DB_PASSWORD'];

    for (const key of keys) {
      if (!config[key]) {
        try {
          const value = await this.consul.kv.get(key);
          if (value) {
            config[key] = value.Value;
          } else {
            this.logger.warn(`Key ${key} not found in Consul`);
          }
        } catch (error) {
          this.logger.error(`Error fetching key ${key} from Consul`, error);
          throw error;
        }
      }
    }

    return config;
  }
}
