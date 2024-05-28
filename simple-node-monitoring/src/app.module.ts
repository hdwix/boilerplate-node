import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { HealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
