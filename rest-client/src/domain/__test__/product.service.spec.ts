import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiService } from '../services/product.service';

describe('ApiService', () => {
  let service: ApiService;
  let axiosMock: AxiosMockAdapter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiService],
    }).compile();

    service = module.get<ApiService>(ApiService);
    axiosMock = new AxiosMockAdapter(axios);
  });

  afterEach(() => {
    axiosMock.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return data when the GET request is successful', async () => {
      const endpoint = 'test';
      const mockData = { success: true };
      axiosMock.onGet(`${service['apiUrl']}${endpoint}`).reply(200, mockData);

      const result = await service.get(endpoint);
      expect(result).toEqual(mockData);
    });

    it('should throw HttpException when the GET request fails', async () => {
      const endpoint = 'test';
      axiosMock.onGet(`${service['apiUrl']}${endpoint}`).networkError();

      await expect(service.get(endpoint)).rejects.toThrow(HttpException);
    });
  });

  describe('post', () => {
    it('should return data when the POST request is successful', async () => {
      const endpoint = 'test';
      const postData = { key: 'value' };
      const mockData = { success: true };
      axiosMock
        .onPost(`${service['apiUrl']}${endpoint}`, postData)
        .reply(200, mockData);

      const result = await service.post(endpoint, postData);
      expect(result).toEqual(mockData);
    });

    it('should throw HttpException when the POST request fails', async () => {
      const endpoint = 'test';
      const postData = { key: 'value' };
      axiosMock
        .onPost(`${service['apiUrl']}${endpoint}`, postData)
        .networkError();

      await expect(service.post(endpoint, postData)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
