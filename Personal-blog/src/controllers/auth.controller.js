import { writeFile } from "fs/promises";
import { getFilePath, readData } from "../utils/index.js";
import { randomUUID } from "crypto";

let message;

const signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const filePath = getFilePath("../users/data.json");

    const users = await readData(filePath);
    const isUser = users.length? users.find((user) => user?.username === username): null;

   console.log(isUser)
    if (isUser) {
      message = "Authentication failed";
    
      return res.status(401).send(`${message}`);
    }

    users.push({
      id: randomUUID(),
      username,
      role: "user",
      password,
    });

    await writeFile(getFilePath(filePath), JSON.stringify(users))

    message = "'Account created'";
     res.redirect("/api/v1/auth/sign-in");
  } catch (error) {
    message = error.message;
    res.status(500).send(`${message}`);
  }
};
const signIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = await readData(getFilePath("../users/data.json"));
    const isUser = users.find((user) => user?.username === username);

    if (!isUser) {

      message = "Authentication failed";
      return res.status(401).send(`${message}`);
    }

    if (isUser.password !== password) {
      message = "Authentication failed";
      return res.status(401).send(`${message}`);
    }
    // create session
    req.session.userId = isUser.id

    res.redirect("/");
  } catch (error) {
    message = error.message;
    res.status(500).send(`${message}`);
  }
};

const signOut = async (req, res) => {
  req.session.destroy();

  res.redirect("/api/v1/auth/sign-in")
};

/*  Auth UI handlers */
const signUpPage = async (req, res) => {
  const authData = {
    signUp: true,
  };
  // renders sign up page
  res.render("auth", authData);
};

const signInPage = async (req, res) => {
  // renders sign in page
  const authData = {
    signUp: false,
  };
  // renders sign up page
  res.render("auth", authData);
};
export { signUp, signIn, signOut, signUpPage, signInPage };
