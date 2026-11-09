import { app } from "./app.js";
import { connectRedis } from "./config/redis.js";

const port = 8000;

app.listen(port, async() => {
await connectRedis()
    console.log(`Server running at http://localhost:${port}`);
});

