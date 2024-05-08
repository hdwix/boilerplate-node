import { TestingModule, Test } from '@nestjs/testing';
import { PongResolver } from '../../../app/graphql/pong.resolver';
import { PongService } from '../../../domain/services/ping.service';

describe('PongResolver', () => {
  let resolver: PongResolver;
  let mockPongService: jest.Mocked<PongService>;

  beforeEach(async () => {
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
      providers: [
        PongResolver,
        { provide: PongService, useValue: mockPongService },
      ],
    }).compile();

    resolver = module.get<PongResolver>(PongResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return a PingDto from getPong', () => {
    expect(resolver.getPong()).toEqual({
      data: 'pong',
      meta: {
        code: 200,
        message: 'Success',
      },
    });
    expect(mockPongService.getPong).toHaveBeenCalled();
  });
});
