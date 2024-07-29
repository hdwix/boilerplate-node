import { SampleModel } from './sample.model';

export const SAMPLE_MODEL_PROVIDER = 'SampleModelProvider';

export const modelProviders = [
  {
    provide: SAMPLE_MODEL_PROVIDER,
    useValue: SampleModel,
  },
];
