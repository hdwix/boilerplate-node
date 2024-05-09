// tests/rest.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from '../../../app/rest/controllers/ping.controller';
import { PongService } from '../../../domain/services/ping.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('RestController', () => {
  let controller: RestController;
  let mockPongService: jest.Mocked<PongService>;

  beforeEach(async () => {
    // Mock the entire PongService
    mockPongService = {
      getPong: jest.fn().mockReturnValue({
        data: 'pong',
        meta: {
          code: 200,
          message: 'Success',
        },
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestController],
      providers: [
        {
          provide: PongService,
          useValue: mockPongService,
        },
      ],
    }).compile();

    controller = module.get<RestController>(RestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return "pong" data when getPong is called', () => {
    expect(controller.getPong()).toEqual({
      data: 'pong',
      meta: {
        code: 200,
        message: 'Success',
      },
    });
    expect(mockPongService.getPong).toHaveBeenCalled();
  });

  it('should handle exceptions thrown by PongService', () => {
    const errorMessage = 'Internal server error';
    mockPongService.getPong.mockImplementation(() => {
      throw new HttpException(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    });

    expect(() => controller.getPong()).toThrow(HttpException);
    expect(mockPongService.getPong).toHaveBeenCalled();
  });

  it('should handle error response with incorrect data from PongService', () => {
    mockPongService.getPong.mockReturnValue({
      data: null,
      meta: {
        code: 404,
        message: 'Not found',
      },
    });

    const result = controller.getPong();
    expect(result.meta.code).toEqual(404);
    expect(result.meta.message).toEqual('Not found');
    expect(mockPongService.getPong).toHaveBeenCalled();
  });

  it('should handle null or undefined return from PongService', () => {
    mockPongService.getPong.mockReturnValue(undefined);

    const result = controller.getPong();
    expect(result).toBeUndefined();
    expect(mockPongService.getPong).toHaveBeenCalled();
  });
});
