import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import * as Consul from 'consul';
import { ConsulConfigService } from '../services/consul-config.service';

jest.mock('consul', () => {
  return jest.fn().mockImplementation(() => {
    return {
      kv: {
        get: jest.fn()
      }
    };
  });
});

describe('ConsulConfigService', () => {
  let service: ConsulConfigService;
  let consulMock: any;
  let configServiceMock: any;

  beforeEach(async () => {
    configServiceMock = {
      get: jest.fn((key: string) => {
        const config = {
          'CONSUL_HOST': 'localhost',
          'CONSUL_PORT': 8500,
        };
        return config[key];
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsulConfigService,
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    service = module.get<ConsulConfigService>(ConsulConfigService);
    consulMock = new Consul();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize Consul with correct host and port', () => {
    expect(Consul).toHaveBeenCalledWith({ host: 'localhost', port: 8500 });
  });

//   describe('getConsulConfig', () => {
//     it('should return configuration from Consul', async () => {
//       const configValues = {
//         'APP_NAME': { Value: 'my-app' },
//         'APP_PORT': { Value: '3000' },
//         'DB_HOST': { Value: 'localhost' },
//         'DB_USERNAME': { Value: 'user' },
//         'DB_PASSWORD': { Value: 'pass' },
//       };

//       consulMock.kv.get.mockImplementation(async (key: string) => configValues[key] || null);

//       const config = await service.getConsulConfig();

//       expect(config).toEqual({
//         'APP_NAME': 'my-app',
//         'APP_PORT': '3000',
//         'DB_HOST': 'localhost',
//         'DB_USERNAME': 'user',
//         'DB_PASSWORD': 'pass',
//       });
    // });
    
//   });
});
