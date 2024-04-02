import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
import { GadgetService } from '../modules/gadget/gadget.service';

@Controller('gadget')
export class GadgetController {
  constructor(private readonly gadgetService: GadgetService) {}

  @Post()
  async createObject(@Body() body: any): Promise<any> {
    try {
      const baseUrl = 'https://api.restful-api.dev/objects';
      const createdObject = await this.gadgetService.makeHttpPostRequest(baseUrl, body);
      return createdObject;
    } catch (error) {
      console.error('Error creating object:', error);
      throw error;
    }
  }

}
