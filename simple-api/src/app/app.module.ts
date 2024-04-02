import { Module } from '@nestjs/common';
import { HelloService } from './modules/hello/hello.service';
import { HelloController } from './handler/rest/hello.controller';

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class AppModule {}
