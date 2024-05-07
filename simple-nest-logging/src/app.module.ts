import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GreetingsController } from './app/controllers/greetings.controller';
import { GreetingsService } from './domain/services/greetings.service';
import { LoggingService } from './infrastructure/logging/logger.service';
import { ContextService } from './infrastructure/context/context.service';

@Module({
  controllers: [GreetingsController],
  providers: [GreetingsService, LoggingService, ContextService],
})
export class AppModule {}
