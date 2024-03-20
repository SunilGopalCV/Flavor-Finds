import mongoose from "mongoose";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);
    return res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByRecipeId = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(recipeId);
    if (!isValidObjectId) {
      return res.status(400).json({ error: "Invalid recipeId" });
    }

    const comments = await Comment.find({ recipe: recipeId }).populate(
      "user",
      "username avatar"
    );
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
