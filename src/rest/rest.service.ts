import { Injectable } from '@nestjs/common';

@Injectable()
export class RestService {
  getPing(): string {
    return 'Ping From Controller!';
  }
}
