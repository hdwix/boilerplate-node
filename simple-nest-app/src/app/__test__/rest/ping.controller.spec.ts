// tests/rest.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RestController } from '../../../app/rest/controllers/ping.controller';
import { PongService } from '../../../domain/services/ping.service';

describe('RestController', () => {
  let controller: RestController;
  let mockPongService: Partial<PongService>;

  beforeEach(async () => {
    // Setup Mock for PongService
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
});
