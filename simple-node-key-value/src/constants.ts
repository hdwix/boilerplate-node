import * as dotenv from 'dotenv';
dotenv.config();

export const HELLO_MODEL_PROVIDER = 'HelloModelProvider';
export const APP_NAME = process.env.APP_NAME || 'simple-node-key-value';
export const APP_PORT = process.env.PORT || 3000;
export const APP_HOST = process.env.APP_HOST || '127.0.0.1';
