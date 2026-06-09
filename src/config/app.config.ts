import dotenv from 'dotenv'
dotenv.config()
export const PORT = process.env.PORT || 5000;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ''

export const DB_USER = process.env.DB_USERNAME || ''
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_HOST = process.env.DB_HOST || ''
export const DB_DATABASE = process.env.DB_DATABASE || ''