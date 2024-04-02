import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { GadgetService } from '../modules/gadget/gadget.service';

@Controller('gadget')
export class GadgetController {
  constructor(private readonly gadgetService: GadgetService) {}

  @Get()
  async getObjectsByIds(@Query('id', ParseIntPipe) ids: number[]): Promise<any> {
    try {
      const baseUrl = 'https://api.restful-api.dev/objects';
      const url = `${baseUrl}?id=${ids.join('&id=')}`;

      const data = await this.gadgetService.makeHttpRequestById(url);
      return data;
    } catch (error) {
      console.error('Error getting objects by IDs:', error);
      throw error;
    }
  }

}
