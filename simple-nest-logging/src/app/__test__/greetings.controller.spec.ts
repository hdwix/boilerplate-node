import { Test, TestingModule } from '@nestjs/testing';
import { GreetingsController } from '../controllers/greetings.controller';
import { GreetingsService } from '../../domain/services/greetings.service';
import { LoggingService } from '../../infrastructure/logging/logger.service';
import { generateTraceId } from '../../constants';

describe('GreetingsController', () => {
  let controller: GreetingsController;
  let service: GreetingsService;
  let loggingService: LoggingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GreetingsController],
      providers: [GreetingsService, LoggingService],
    }).compile();

    controller = module.get<GreetingsController>(GreetingsController);
    service = module.get<GreetingsService>(GreetingsService);
    loggingService = module.get<LoggingService>(LoggingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('greeting', () => {
    it('should return greeting DTO from service', () => {
      const name = 'John';
      const expectedResponse = {
        data: 'Greetings, John',
        meta: { code: 200, message: 'Success' },
      };

      jest.spyOn(service, 'doGreeting').mockReturnValue(expectedResponse);

      const result = controller.greeting(name);

      expect(result).toEqual(expectedResponse);
    });
  });
});
