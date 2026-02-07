import { Router } from "express";
import { homePage } from "../controllers/guest/home.controller.js";
import { articlePage } from "../controllers/guest/article.controller.js";

const router = Router()

router.route("/").get(homePage)
router.route("/articles/:id").get(articlePage)

export default router;