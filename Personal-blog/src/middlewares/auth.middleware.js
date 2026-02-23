import { readData } from "../utils/index.js";

async function protectRoute(req, res, next) {
  try {
    if (req.session && !req.session.userId) {
      return res.redirect("/api/v1/auth/sign-in");
    }

    const users = await readData("../users/data.json");
    const user = users.find((user) => (user.id = req.session.userId));

    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }

  // if valid credentials proceed
}
async function privateRoute(req, res, next) {
  try {
    const user = req.user;

    if(user && user.role !== "admin") {
      return res.redirect("/")
    }
    // implements basic auth
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Basic ")) {
      res.setHeader("WWW-Authenticate", "Basic realm='/admin'");
      return res.status(401).send("Authentication failed");
    }

    const base64String = authorization.split(" ")[1];
    const buff = Buffer.from(base64String, "base64");

    const decodedString = buff.toString("utf-8");
    const [username, password] = decodedString.split(":");

    if (username !== user?.username && -password !== user?.password) {
      res.setHeader("WWW-Authenticate", "Basic realm='/admin'");
      // return res.status(401).send("Authentication failed");
    }
    // if valid credentials proceed
    next();
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export { protectRoute, privateRoute };
