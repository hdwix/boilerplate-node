import { Inject, Injectable } from '@nestjs/common';
import { CreateSampleDto } from '../../app/dto/create-sample.dto';
import { Sample } from '../../domain/entities/sample.entity';
import { SampleModel } from '../model/sample.model';
import { SAMPLE_MODEL_PROVIDER } from '../model';

@Injectable()
export class SampleRepository {
  constructor(@Inject(SAMPLE_MODEL_PROVIDER) private readonly model: Sample) {}

  async create(user: CreateSampleDto): Promise<Sample> {
    const newUser = new SampleModel(user);
    return await newUser;
  }
}
