import express from "express";

import {
  createComment,
  deleteComment,
  getCommentsByRecipeId,
  getRecentComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.delete("/delete/:id", verifyToken, deleteComment);

router.get("/recipe/:recipeId", getCommentsByRecipeId);

router.get("/recent", getRecentComments);

export default router;
