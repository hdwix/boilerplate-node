import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SampleService } from './domain/services/sample.service';
import { LoggerMiddleware } from './app/middleware/logger.middleware';
import { HelloRepository } from './infrastructure/repository/hello.repository';
import { modelProviders } from './infrastructure/model';
import { SampleController } from './app/controllers/sample.controller';
import { RedisModule } from './infrastructure/redis/redis.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './infrastructure/redis/redis.service';

@Module({
  imports: [ConfigModule.forRoot(), RedisModule],
  controllers: [SampleController],
  providers: [RedisService, SampleService, HelloRepository, ...modelProviders],
  exports: [RedisService],
})
export class SampleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SampleController);
  }
}
