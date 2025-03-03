import { createClient } from "redis";
const redisClient = createClient({
    url: process.env.REDIS_CLIENT || "redis://localhost:6379",
});
redisClient
    .connect()
    .catch((err) => console.error('Redis connection error"', err));
export default redisClient;
