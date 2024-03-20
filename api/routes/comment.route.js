import express from "express";

import {
  createComment,
  deleteComment,
  getCommentsByRecipeId,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);

router.delete("/delete/:id", verifyToken, deleteComment);

router.get("/recipe/:recipeId", getCommentsByRecipeId);

export default router;
