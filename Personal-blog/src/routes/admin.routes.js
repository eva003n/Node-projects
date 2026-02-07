import { Router } from "express";
import { getDashboardPage } from "../controllers/admin/dashboard.controller.js";
import { createArticle } from "../controllers/admin/create.controller.js";
import { editArticle } from "../controllers/admin/edit.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();
// protect this private routes with basic authentication
router.use(protectRoute);

router.route("/").get(getDashboardPage);
router.route("/articles/new").get(createArticle);
router.route("/articles/:id/edit").get(editArticle);

export default router;
