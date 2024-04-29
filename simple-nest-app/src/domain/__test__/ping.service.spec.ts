import { TestingModule, Test } from "@nestjs/testing";
import { PingDto } from "../../app/dtos/ping-dto";
import { PingRepository } from "../../infrastructure/repository/ping.repository";
import { Ping } from "../entities/ping.entity";
import { PingService } from "../services/ping.service";

describe('PingService', () => {
    let service: PingService;
    let repository: PingRepository;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          PingService,
          {
            provide: PingRepository,
            useValue: {
              ping: jest.fn(),
            },
          },
        ],
      }).compile();
  
      service = module.get<PingService>(PingService);
      repository = module.get<PingRepository>(PingRepository);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    describe('ping', () => {
      it('should return a Ping object', () => {
        const pingDto: PingDto = {
          data: 'Test Data',
          meta: { code: 200, message: 'Success' },
        };
  
        const pingResult: Ping = {
          data: 'Test Data',
          meta: { code: 200, message: 'Success' },
        };
  
        jest.spyOn(repository, 'ping').mockReturnValueOnce(pingResult);
  
        const result = service.ping(pingDto);
  
        expect(result).toEqual(pingResult);
      });
    });
  });