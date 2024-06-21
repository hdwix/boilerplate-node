import { Module } from '@nestjs/common';
import { AppController } from './app/controller/app.controller';
import { AppService } from './domain/service/app.service';
import { HealthModule } from './infrastructure/health/health.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './common/config/configuration';
import { MetricsModule } from './infrastructure/Metrics/metrics,module';
import { OpenTelemetryModule } from './infrastructure/OpenTelementary/open.telemetry.module';

@Module({
  imports: [
    MetricsModule,
    HealthModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    OpenTelemetryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
