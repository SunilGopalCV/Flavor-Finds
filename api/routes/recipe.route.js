import express from "express";
import { createRecipe } from "../controllers/recipe.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createRecipe);

export default router;
