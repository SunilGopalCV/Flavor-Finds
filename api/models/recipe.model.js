import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        unit: { type: String, required: true },
      },
    ],
    instructions: [
      {
        step: { type: String, required: true },
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
    cuisine: {
      type: String,
      required: true,
    },
    tags: [String],
    totalTime: {
      type: Number,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fat: { type: Number, required: true },
    fiber: { type: Number },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
