import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GreetingsController } from './app/controllers/greetings.controller';
import { GreetingsService } from './domain/services/greetings.service';
import { LoggingService } from './infrastructure/logging/logger.service';

@Module({
  controllers: [GreetingsController],
  providers: [GreetingsService, LoggingService],
})
export class AppModule {}
