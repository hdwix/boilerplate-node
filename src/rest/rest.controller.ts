import { Controller, Get } from '@nestjs/common';
import { AppService } from '../app.service';
import { RestService } from './rest.service';

@Controller('ping')
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Get()
  getPong(): string {
    return this.restService.getPing();
  }
}