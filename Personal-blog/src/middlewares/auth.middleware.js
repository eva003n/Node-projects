async function protectRoute(req, res, next) {
  // implements basic auth
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Basic ")) {
     res.setHeader("WWW-Authenticate", "Basic realm='Admin'");
     return res.status(401).send("Authentication required")
  }

  const base64String = authorization.split(" ")[1];
  const buff = Buffer.from(base64String, "base64");

  const decodedString = buff.toString("utf-8");
  const [username, password] = decodedString.split(":");

  if (username !== "admin" && password !== "admin@1234") {
    res.setHeader("WWW-Authenticate", "Basic realm='Admin'");
    return res.status(401).send("Invalid username or password");
  }
  // if valid credentials proceed
  next();
}

export { protectRoute };
