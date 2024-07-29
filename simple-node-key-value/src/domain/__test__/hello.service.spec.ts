import { Test, TestingModule } from '@nestjs/testing';
import { CreateHelloDto } from 'src/app/dto/create-hello.dto';
import { PatchHelloDto } from 'src/app/dto/patch-hello.dto';
import { UpdateHelloDto } from 'src/app/dto/update-hello.dto';
import { HelloService } from '../services/sample.service';

describe('HelloService', () => {
  let service: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HelloService],
    }).compile();

    service = module.get<HelloService>(HelloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHello', () => {
    it('should return a hello message with the provided name', () => {
      const name = 'John';
      const expectedMessage = `Hello, ${name}!`;
      expect(service.getHello(name)).toBe(expectedMessage);
    });
  });

  describe('sayHello', () => {
    it('should return a hello message with the provided name and age', () => {
      const createHelloDto: CreateHelloDto = { name: 'John', age: 30 };
      const expectedMessage = `Hello, ${createHelloDto.name} you are ${createHelloDto.age} years old`;
      expect(service.sayHello(createHelloDto)).toBe(expectedMessage);
    });
  });

  describe('updateName', () => {
    it('should return a message indicating the name update', () => {
      const updateHelloDto: UpdateHelloDto = {
        current_name: 'John',
        new_name: 'Doe',
      };
      const expectedMessage = `Your name is replaced from ${updateHelloDto.current_name} to ${updateHelloDto.new_name}`;
      expect(service.updateName(updateHelloDto)).toBe(expectedMessage);
    });
  });

  describe('updateNameById', () => {
    it('should return a message indicating the name update by id', () => {
      const id = 1;
      const patchHelloDto: PatchHelloDto = { new_name: 'Doe' };
      const expectedMessage = `Your name is replaced to ${patchHelloDto.new_name}`;
      const result = service.updateNameById(id, patchHelloDto);
      expect(result.message).toBe(expectedMessage);
      expect(result.id).toBe(id);
    });
  });

  describe('deleteDataById', () => {
    it('should return a message indicating the data deletion by id', () => {
      const id = 1;
      const expectedMessage = 'Your data is deleted';
      expect(service.deleteDataById(id).message).toBe(expectedMessage);
    });
  });
});
