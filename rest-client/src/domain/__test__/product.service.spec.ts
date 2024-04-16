// api.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { ApiService } from '../services/product.service';

jest.mock('axios');

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return data from GET request', async () => {
      const responseData = { id: 1, name: 'Product 1' };
      const mockedResponse = { data: responseData };
      (axios.get as jest.Mock).mockResolvedValue(mockedResponse);

      const result = await service.get('test');

      expect(result).toEqual(responseData);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Error fetching data';
      (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(service.get('test')).rejects.toThrow(errorMessage);
    });
  });

  describe('post', () => {
    it('should return data from POST request', async () => {
      const requestData = { name: 'Product 1' };
      const responseData = { id: 1, ...requestData };
      const mockedResponse = { data: responseData };
      (axios.post as jest.Mock).mockResolvedValue(mockedResponse);

      const result = await service.post('test', requestData);

      expect(result).toEqual(responseData);
    });

    it('should handle errors', async () => {
      const requestData = { name: 'Product 1' };
      const errorMessage = 'Error posting data';
      (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(service.post('test', requestData)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
