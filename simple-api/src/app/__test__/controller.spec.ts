import { Test, TestingModule } from '@nestjs/testing';
import { HelloService } from '../../domain/services/hello.service';
import { CreateHelloDto } from '../dto/create-hello.dto';
import { UpdateHelloDto } from '../dto/update-hello.dto';
import { PatchHelloDto } from '../dto/patch-hello.dto';
import { HelloController } from '../controller/hello.controller';

describe('HelloController', () => {
  let controller: HelloController;
  let service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    controller = module.get<HelloController>(HelloController);
    service = module.get<HelloService>(HelloService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getHello', () => {
    it('should return Hello, Name!', () => {
      const name = 'John';
      const message = 'Hello, John!';
      jest.spyOn(service, 'getHello').mockReturnValue(message);

      expect(controller.getHello(name)).toEqual({ data: message });
    });
  });

  describe('sayHello', () => {
    it('should return Hello, Name and Age', () => {
      const createHelloDto: CreateHelloDto = { name: 'John', age: 30 };
      const message = 'Hello, John! You are 30 years old.';
      jest.spyOn(service, 'sayHello').mockReturnValue(message);

      expect(controller.sayHello(createHelloDto)).toEqual({
        data: { message },
      });
    });
  });

  describe('updateName', () => {
    it('should update name', () => {
      const updateHelloDto: UpdateHelloDto = {
        current_name: 'John',
        new_name: 'Doe',
      };
      const message = 'Name updated successfully';
      jest.spyOn(service, 'updateName').mockReturnValue(message);

      expect(controller.updateName(updateHelloDto)).toEqual({
        data: { message },
      });
    });
  });

  describe('updateNameById', () => {
    it('should update name by id', () => {
      const id = 1;
      const patchHelloDto: PatchHelloDto = { new_name: 'Doe' };
      const message = 'Name updated successfully';
      const updatedId = 1;
      jest
        .spyOn(service, 'updateNameById')
        .mockReturnValue({ message, id: updatedId });

      expect(controller.updateNameById(id, patchHelloDto)).toEqual({
        data: { message, id: updatedId },
      });
    });
  });

  describe('deleteDataById', () => {
    it('should delete data by id', () => {
      const id = 1;
      const message = 'Data deleted successfully';
      jest.spyOn(service, 'deleteDataById').mockReturnValue({ message });

      expect(controller.deleteDataById(id)).toEqual({ data: { message } });
    });
  });
});
