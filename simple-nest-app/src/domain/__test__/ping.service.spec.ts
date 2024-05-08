import { PongService } from '../services/ping.service';

describe('PongService', () => {
  let pongService: PongService;

  beforeEach(() => {
    pongService = new PongService();
  });

  it('should return a PingDto with "pong" data and success meta', () => {
    const expectedResponse = {
      data: 'pong',
      meta: {
        code: 200,
        message: 'Success',
      },
    };

    const result = pongService.getPong();
    expect(result).toEqual(expectedResponse);
  });
});
