import { Module } from '@nestjs/common';
import { RestController } from './controllers/rest.controller';
import { RestService } from './services/rest.service';

@Module({
  controllers: [RestController],
  providers: [RestService]
})
export class RestModule {}
