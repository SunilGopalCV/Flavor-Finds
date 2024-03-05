import { Salad, User, Clock, ChefHat, BookOpenText, Link2 } from "lucide-react";
import CREATE_RECIPE from "/images/CreateRecipe.jpg";
import { useState } from "react";

export default function CreateRecipe() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    cuisine: "",
    tags: "",
    totalTime: 0,
    servings: 0,
    difficulty: "Medium",
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    fiber: 0,
    createdBy: "", // You may need to populate this with the currently logged-in user's ID
  });
  return (
    <main className="bg-gray-100 min-h-screen p-4">
      <div className="md:w-full h-1/5 flex items-center justify-center">
        <h1 className="absolute text-[#ffffff]  text-[4rem] shadow-2xl">
          Build Your Recipe
        </h1>
        <img
          className="object-cover object-center rounded-lg"
          src={CREATE_RECIPE}
          alt="Food"
          width={1300}
          height={300}
        />
      </div>
      <form>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#ee7d7d] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-3">
            Recipe Basics
          </span>
          <div className="py-3 px-5 block">
            <label className="block text-[#ee7d7d] font-bold " htmlFor="title">
              <Salad className="size-5 pr-2" />
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.title}
              placeholder="Enter the title of Recipe"
            />
            <div className="my-4 flex px-5 space-x-20 align-middle ">
              <span>
                <label
                  className="block text-[#ee7d7d] font-bold "
                  htmlFor="servings"
                >
                  <User className="size-5 pr-2" />
                  Serves
                </label>
                <input
                  type="number"
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  name="servings"
                  value={formData.servings}
                  placeholder="Servings"
                />
              </span>
              <span>
                <label
                  className="block text-[#ee7d7d] font-bold "
                  htmlFor="servings"
                >
                  <Clock className="size-5 pr-2" />
                  Cooking Time
                </label>
                <input
                  type="number"
                  name="totalTime"
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  value={formData.totalTime}
                  placeholder="Total Time (minutes)"
                />
              </span>
              <span>
                <label
                  className="block text-[#ee7d7d] font-bold "
                  htmlFor="difficulty"
                >
                  <ChefHat className="size-5 pr-2" />
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </span>
              <span>
                <label
                  className="block text-[#ee7d7d] font-bold "
                  htmlFor="cuisine"
                >
                  <User className="size-5 pr-2" />
                  Cuisine
                </label>
                <input
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  type="text"
                  name="cuisine"
                  value={formData.cuisine}
                  placeholder="Cuisine"
                />
              </span>
            </div>

            <label
              className="block text-[#ee7d7d] font-bold "
              htmlFor="description"
            >
              <BookOpenText className="size-5 pr-2" />
              Description
            </label>
            <textarea
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none"
              name="description"
              rows={4}
              cols={30}
              value={formData.description}
              placeholder="Description"
            />
            <label
              className="block text-[#ee7d7d] font-bold "
              htmlFor="servings"
            >
              <Link2 className="size-5 pr-2" />
              Image URL
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              name="imageUrl"
              className="py-2 my-2 font-overlock"
              value={formData.imageUrl}
            />
            <button className="px-3 py-2 border-2 border-[#ee7d7d] text-[#ee7d7d] bg-white rounded-full hover:bg-[#ee7d7d] hover:text-white">
              Upload
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#ee7d7d] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-3">
            Nutritional Information
          </span>
          <div className="py-3 px-5 block">
            <label
              className="block text-[#ee7d7d] font-bold"
              htmlFor="calories"
            >
              Calories
            </label>
            <input
              type="number"
              name="calories"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.calories}
              placeholder="Calories"
            />
            <label className="block text-[#ee7d7d] font-bold" htmlFor="protein">
              Protein
            </label>
            <input
              type="number"
              name="protein"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.protein}
              placeholder="protein"
            />
            <label
              className="block text-[#ee7d7d] font-bold"
              htmlFor="carbohydrates"
            >
              Carbohydrates
            </label>
            <input
              type="number"
              name="carbohydrates"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.carbohydrates}
              placeholder="Carbohydrates"
            />
            <label className="block text-[#ee7d7d] font-bold" htmlFor="fat">
              Fats
            </label>
            <input
              type="number"
              name="fat"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.fat}
              placeholder="Fats"
            />
            <label className="block text-[#ee7d7d] font-bold" htmlFor="fiber">
              Fiber
            </label>
            <input
              type="number"
              name="fiber"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.fiber}
              placeholder="Fibers"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#ee7d7d] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-2">
            Ingredients
          </span>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mx-4">
              <span className="bg-[#ee7d7d] w-6 h-6 rounded-full flex items-center justify-center text-white">
                1
              </span>
              <input
                type="text"
                className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                placeholder="Enter Ingredients"
              />
            </div>
            {/* Add more instruction input fields as needed */}
          </div>
          <button
            className="my-4 mx-4 bg-[#ee7d7d] text-white rounded-md py-2 px-4 hover:bg-[#a85555]"
            // Add an onClick handler to handle adding instructions
          >
            + Add ingredients
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#ee7d7d] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-2">
            Instructions
          </span>
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mx-4">
              <span className="bg-[#ee7d7d] w-6 h-6 rounded-full flex items-center justify-center text-white">
                1
              </span>
              <textarea
                className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none"
                rows={4}
                cols={30}
                value={formData.instructions}
                placeholder="Enter Instructions"
              />
            </div>
            {/* Add more instruction input fields as needed */}
          </div>
          <button
            className="my-4 mx-4 bg-[#ee7d7d] text-white rounded-md py-2 px-4 hover:bg-[#a85555]"
            // Add an onClick handler to handle adding instructions
          >
            + Add Next Step
          </button>
        </div>
        <button
          className="block mx-auto w-[80%] text-white bg-[#ee7d7d] rounded-md my-4 p-4 font-proxima-nova font-semibold text-center items-center justify-center hover:bg-[#a85555] cursor-pointer text-[1.2rem]"
          type="submit"
        >
          + Create Recipe
        </button>
      </form>
    </main>
  );
}
