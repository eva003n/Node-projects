import express from "express"
const app = express();

const port = 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}))

import guestRouter from "./routes/guest.routes.js"
import adminRouter from "./routes/admin.routes.js"

// public rotes
app.use("/", guestRouter);
// protected routes
app.use("/admin", adminRouter )

app.use("/{*splat}", (req, res) => {
    res.send("<h1>Not found</h1>");
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

