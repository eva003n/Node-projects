import { Router } from "express";
import { getDashboardPage } from "../controllers/admin/dashboard.controller.js";

import { privateRoute, protectRoute } from "../middlewares/auth.middleware.js";
import {
  deleteArticle,
  createArticle,
  createArticlePage,
  createArticleEditPage,
  editArticle,
} from "../controllers/admin/article.controller.js";

const router = Router();
// protect this private routes with basic authentication
router.use(privateRoute);

router.route("/").get(getDashboardPage);
router.route("/articles/article/new").get(createArticlePage);
router.route("/articles/article/new").post(createArticle);
router.route("/articles/:id/edit").get(createArticleEditPage);
router.route("/articles/:id").post(editArticle);
router.route("/articles/:id").delete(deleteArticle)

export default router;
