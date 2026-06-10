
import Redis from 'ioredis';
import { PASSWORD, HOST, PORT} from './env.config';
const redisClient = new Redis({
    host: HOST,
    port: Number(PORT),
    password: PASSWORD,
});


export default redisClient;

export const ALL_USERS_CACHE_KEY = 'ALL_USERS';
