// api.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://api.restful-api.dev/';

  async get(endpoint: string): Promise<any> {
    const response = await axios.get(`${this.apiUrl}${endpoint}`);
    return response.data;
  }

  async post(endpoint: string, data: any): Promise<any> {
    const response = await axios.post(`${this.apiUrl}${endpoint}`, data);
    return response.data;
  }
}
