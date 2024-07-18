import { HelloModel } from './hello.model';

export const HELLO_MODEL_PROVIDER = 'HelloModelProvider';

export const modelProviders = [
  {
    provide: HELLO_MODEL_PROVIDER,
    useValue: HelloModel,
  },
];
