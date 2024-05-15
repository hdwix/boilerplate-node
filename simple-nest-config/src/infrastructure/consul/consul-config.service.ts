import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConsulConfigService {
  constructor(private httpService: HttpService) {}

  async getKey(key: string): Promise<string> {
    const url = `http://108.137.61.233:8500/v1/kv/${key}`;
    try {
      const observable = this.httpService.get(url);
      const response: AxiosResponse = await lastValueFrom(observable);
      if (response.data.length > 0) {
        const value = Buffer.from(response.data[0].Value, 'base64').toString(
          'utf8',
        );
        return value;
      }
      return null;
    } catch (error) {
      console.error('Failed to retrieve key from Consul:', error);
      throw new Error('Failed to retrieve key from Consul');
    }
  }
}
