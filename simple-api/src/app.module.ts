import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HelloService } from './domain/services/hello.service';
import { HelloController } from './app/controller/hello.controller';
import { LoggerMiddleware } from './app/middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(HelloController);
  }
}
