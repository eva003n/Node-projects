import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const app = express();

// set ejs as the template engine
app.set("view engine", "ejs");

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve static files
app.use(express.static(path.resolve(__dirName, "public")));

app.use(
  session({
    cookie: {
      path: "/",
      httpOnly: true, // prevent XSS
      sameSite: "strict", // prevent CSRF
      secure: app.env === "production",
      maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
    secret: "f6332400862435665343423235475853",
  }),
);



// optional: specify views folder (default = ./views) but express does it automatically
app.set("views", path.resolve(__dirName, "./views"));

import guestRouter from "./routes/guest.routes.js";
import adminRouter from "./routes/admin.routes.js";
import commentRouter from "./routes/comment.routes.js"
import authRouter from "./routes/auth.routes.js"
// public routes for guest
app.use("/", guestRouter);
app.use("/api/v1/auth", authRouter)
// protected routes for admin
app.use("/admin", adminRouter);
app.use("/comment", commentRouter);


app.use("/{*splat}", (req, res) => {
  res.render("notfound");
});

export {
    app
}