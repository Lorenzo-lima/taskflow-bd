import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_CLIENT || "redis://redis:6379",
  socket: {
    connectTimeout: 10000
  }
});

redisClient
  .connect()
  .catch((err) => console.error('Redis connection error"', err));

export default redisClient;