import { Router } from "express";
import { getDashboardPage } from "../controllers/admin/dashboard.controller.js";
import { createArticle, createArticlePage } from "../controllers/admin/create.controller.js";
import { createArticleEditPage, editArticle } from "../controllers/admin/edit.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();
// protect this private routes with basic authentication
router.use(protectRoute);

router.route("/").get(getDashboardPage);
router.route("/articles/article/new").get(createArticlePage);
router.route("/articles/article/new").post(createArticle);
router.route("/articles/:id/edit").get(createArticleEditPage);
router.route("/articles/:id").post(editArticle);

export default router;
