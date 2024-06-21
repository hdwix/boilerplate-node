import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenTelemetryService } from './open.telementary.setup';

@Module({
  imports: [ConfigModule],
  providers: [OpenTelemetryService],
  exports: [OpenTelemetryService],
})
export class OpenTelemetryModule {}
