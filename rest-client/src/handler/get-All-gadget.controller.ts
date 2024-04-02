import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { GadgetService } from '../modules/gadget/gadget.service';

@Controller('gadget')
export class GadgetController {
  constructor(private readonly gadgetService: GadgetService) {}


  @Get()
  async getExampleData(): Promise<any> {
    const url = 'https://api.restful-api.dev/objects'; 
    try {
      const data = await this.gadgetService.makeHttpRequest(url);
      return data;
    } catch (error) {
      console.error('Error getting example data:', error);
      throw error;
    }
  }


}
