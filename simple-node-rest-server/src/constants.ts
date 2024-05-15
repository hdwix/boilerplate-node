import * as dotenv from 'dotenv';
dotenv.config();

// export const DB_PROVIDER = 'DbConnectionToken';
export const HELLO_MODEL_PROVIDER = 'HelloModelProvider';
// export const SERVICE = 'DB_MONGO_SERVICE';
export const APP_NAME = process.env.APP_NAME || 'simple-api';
// export const DATABASE_SERVICE =
// process.env.DATABASE_SERVICE || 'DATABASE_SERVICE';
export const APP_PORT = process.env.PORT || 4000;
export const APP_HOST = process.env.APP_HOST || '0.0.0.0';
