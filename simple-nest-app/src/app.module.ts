import { Module } from '@nestjs/common';
import { RestPingController } from './app/rest/controllers/ping.controller';
import { PingRepository } from './infrastructure/repository/ping.repository';
import { PingService } from './domain/services/ping.service';
import { USER_MODEL_PROVIDER } from './constants';
import { modelProvider } from './infrastructure/models';

@Module({
  imports: [],
  controllers: [RestPingController],
  providers: [
    PingRepository,
    PingService,
    ...modelProvider
  ],
})
export class AppModule {}
