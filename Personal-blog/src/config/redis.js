import { RedisStore } from "connect-redis";
import { createClient } from "redis";

const redisClient = createClient()

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "personalblog"
})

async function connectRedis() {
    try {
        await redisClient.connect()
        console.log("Redis connected successfully")
    } catch (error) {
        console.error(`Error connecting to redis: ${error.message}`)
        
    }
    
}
export {
    redisStore,
    connectRedis
}