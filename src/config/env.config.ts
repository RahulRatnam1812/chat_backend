import dotenv from 'dotenv';

dotenv.config();

export const HOST = process.env.REDIS_HOST || 'localhost';
export const PORT = process.env.REDIS_PORT || 6379;
export const PASSWORD = process.env.REDIS_PASSWORD || '';
