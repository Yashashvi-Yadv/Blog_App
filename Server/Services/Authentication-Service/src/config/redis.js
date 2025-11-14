import Redis from "ioredis";
const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => console.log("reddis conneted"));

redis.on("error", (err) => console.log(err));

export default redis;
