import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  updateRecipe,
  getRecipes,
} from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createRecipe);
router.delete("/delete/:id", verifyToken, deleteRecipe);
router.post("/update/:id", verifyToken, updateRecipe);
router.get("/get/:id", getRecipe);
router.get("/get", getRecipes);

export default router;
