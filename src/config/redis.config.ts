
import Redis from 'ioredis';
import { PASSWORD, HOST, PORT} from './env.config';
const redisClient = new Redis({
    host: HOST,
    port: Number(PORT),
    password: PASSWORD,
});


export default redisClient;