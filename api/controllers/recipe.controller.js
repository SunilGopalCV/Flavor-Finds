import Recipe from "../models/recipe.model.js";
import { errorHandler } from "../utils/error.js";

export const createRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.create(req.body);
    return res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(errorHandler(404, "Recipe Not Found"));
  }

  if (req.user.id != recipe.createdBy) {
    return next(errorHandler(401, "You can only delete your own Recipe!"));
  }

  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("Recipe has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return next(errorHandler(404, "Recipe Not Found!"));
  }
  if (req.user.id != recipe.createdBy) {
    return next(errorHandler(401, "You can only update your own recipe!"));
  }
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return next(errorHandler(404, "Recipe Not Found!"));
    }
    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getRecipes = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let query = {};

    if (req.query.title || "") {
      query.title = { $regex: req.query.title, $options: "i" };
    }

    if (req.query.ingredients) {
      query["ingredients.name"] = {
        $regex: new RegExp(req.query.ingredients, "i"),
      };
    }

    if (req.query.cuisine) {
      query.cuisine = req.query.cuisine;
    }

    if (req.query.difficulty) {
      query.difficulty = req.query.difficulty;
    }

    if (req.query.totalTime) {
      query.totalTime = { $lte: req.query.totalTime };
    }

    const nutritionalFields = [
      "calories",
      "protein",
      "carbohydrates",
      "fat",
      "fiber",
    ];
    nutritionalFields.forEach((field) => {
      if (req.query[`${field}Range`] && req.query[`${field}Value`]) {
        const nutritionalQuery = getNutritionalRangeQuery(
          req.query[`${field}Range`],
          req.query[`${field}Value`]
        );
        query[field] = nutritionalQuery;
      }
    });

    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const recipes = await Recipe.find(query)
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

const getNutritionalRangeQuery = (range, value) => {
  switch (range) {
    case "lessThan":
      return { $lte: value };
    case "greaterThan":
      return { $gte: value };
    case "between":
      const [min, max] = value.split("-").map(Number);
      return { $gte: min, $lte: max };
    default:
      return {};
  }
};
