import { Router } from "express";
import { signIn, signInPage, signOut, signUp, signUpPage } from "../controllers/auth.controller.js";

const router = Router()

router.route("/sign-up").post(signUp)
router.route("/sign-in").post(signIn)/
router.route("/sign-out").delete(signOut)

/* UI  */
router.route("/sign-up").get(signUpPage);
router.route("/sign-in").get(signInPage);




export default router;