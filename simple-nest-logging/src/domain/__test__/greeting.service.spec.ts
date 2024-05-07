import { GreetingsService } from '../services/greetings.service';
import { LoggingService } from '../../infrastructure/logging/logger.service';
import { generate } from 'rxjs';
import { generateTraceId } from '../../constants';

describe('GreetingsService', () => {
  let service: GreetingsService;
  let loggingService: LoggingService;
  const traceId = generateTraceId();

  beforeEach(() => {
    loggingService = new LoggingService(); // Mocking LoggingService
    service = new GreetingsService(loggingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('doGreeting', () => {
    it('should call logging service with correct message', () => {
      const name = 'John';

      const loggingServiceSpy = jest.spyOn(loggingService, 'log');

      service.doGreeting(name, traceId);

      expect(loggingServiceSpy).toHaveBeenCalledWith(
        `doGreeting | Greeting, ${name}!`,
        traceId,
      );
    });

    it('should return greeting DTO', () => {
      const name = 'John';
      const expectedResponse = {
        data: `Greetings, ${name}`,
        meta: {
          code: 200,
          message: 'Success',
        },
      };

      const result = service.doGreeting(name, traceId);

      expect(result).toEqual(expectedResponse);
    });
  });
});
