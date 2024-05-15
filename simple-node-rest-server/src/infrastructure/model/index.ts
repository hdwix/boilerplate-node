import { HELLO_MODEL_PROVIDER } from 'src/constants';
import { HelloModel } from './hello.model';

export const modelProviders = [
  {
    provide: HELLO_MODEL_PROVIDER,
    useValue: HelloModel,
  },
];
