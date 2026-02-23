import { Router } from "express";
import { createComment, updateComment, deleteComment,  } from "../controllers/guest/comment.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(protectRoute)
router.route("/").post(createComment)
router.route("/:id").put(updateComment)
router.route("/:id").delete(deleteComment)

export default router