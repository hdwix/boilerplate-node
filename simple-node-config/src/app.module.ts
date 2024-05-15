import { Module } from '@nestjs/common';
import { ConfigController } from './application/config.controller';
import { HttpModule } from '@nestjs/axios';
import { ConsulConfigService } from './infrastructure/consul/consul-config.service';
import { ConfigService } from './domain/services/config.service';

@Module({
  imports: [HttpModule],
  controllers: [ConfigController],
  providers: [ConsulConfigService, ConfigService],
})
export class AppModule {}
