import express from "express";
import {
  createRecipe,
  deleteRecipe,
} from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createRecipe);
router.delete("/delete/:id", verifyToken, deleteRecipe);

export default router;
