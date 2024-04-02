import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GadgetService {
    async makeHttpRequest(url: string): Promise<any> {
        try {
          const response = await axios.get('https://api.restful-api.dev/objects');
          return response.data; 
        } catch (error) {
          console.error('Error making HTTP request:', error);
          throw error;
        }
      }

      async makeHttpRequestById(url: string): Promise<any> {
        try {
          const response = await axios.get(url);
          return response.data; 
        } catch (error) {
          console.error('Error making HTTP request:', error);
          throw error;
        }
      }

      async makeHttpPostRequest(url: string, body: any): Promise<any> {
        try {
          const response = await axios.post(url, body);
          return response.data; 
        } catch (error) {
          console.error('Error making HTTP POST request:', error);
          throw error;
        }
      }
}
