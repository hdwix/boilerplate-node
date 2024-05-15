import { Controller, Get } from '@nestjs/common';
import { ConfigService } from 'src/domain/services/config.service';

@Controller()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/consul')
  async getConfig() {
    return this.configService.getAllConfig();
  }
}
