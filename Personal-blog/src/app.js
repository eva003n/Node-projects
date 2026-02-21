import express from "express";

import path from "path";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const app = express();

// set ejs as the template engine
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve static files
app.use(express.static(path.resolve(__dirName, "public")));



// optional: specify views folder (default = ./views) but express does it automatically
app.set("views", path.resolve(__dirName, "./views"));

import guestRouter from "./routes/guest.routes.js";
import adminRouter from "./routes/admin.routes.js";

// public routes for guest
app.use("/", guestRouter);
// protected routes for admin
app.use("/admin", adminRouter);

app.use("/{*splat}", (req, res) => {
  res.render("notfound");
});

export {
    app
}