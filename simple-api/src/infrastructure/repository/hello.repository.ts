import { Inject, Injectable } from '@nestjs/common';
import { CreateHelloDto } from '../../app/dto/create-hello.dto';
import { HELLO_MODEL_PROVIDER } from '../../constants';
import { Hello } from '../../domain/entities/hello.entity';
import { HelloModel } from '../model/hello.model';

@Injectable()
export class HelloRepository {
  constructor(@Inject(HELLO_MODEL_PROVIDER) private readonly model: Hello) {}

  async create(user: CreateHelloDto): Promise<Hello> {
    const newUser = new HelloModel(user);
    return await newUser;
  }
}
