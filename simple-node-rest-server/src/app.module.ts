import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloService } from './domain/services/hello.service';
import { HelloController } from './app/controller/hello.controller';
import { LoggerMiddleware } from './app/middleware/logger.middleware';
import { HelloRepository } from './infrastructure/repository/hello.repository';
import { modelProviders } from './infrastructure/model';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService, HelloRepository, ...modelProviders],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HelloController);
  }
}
