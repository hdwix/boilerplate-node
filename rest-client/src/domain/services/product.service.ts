import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://api.restful-api.dev/';

  private async request<T = any>(
    method: 'get' | 'post',
    endpoint: string,
    data?: any,
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    try {
      const response = await axios({
        method: method,
        url: url,
        data: method === 'post' ? data : undefined,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: unknown): never {
    if (error instanceof AxiosError) {
      const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
      const message = `API Error: ${error.response?.statusText ?? 'Unknown Error'}`;
      throw new HttpException(message, status);
    } else {
      throw new HttpException(
        'Non-Axios Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get<T = any>(endpoint: string): Promise<T> {
    return this.request<T>('get', endpoint);
  }

  async post<T = any>(endpoint: string, data: any): Promise<T> {
    return this.request<T>('post', endpoint, data);
  }
}
