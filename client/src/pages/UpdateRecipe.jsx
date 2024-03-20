import { Salad, User, Clock, ChefHat, BookOpenText, Link2 } from "lucide-react";
import UPDATE_RECIPE from "/images/UpdateRecipe.jpg";
import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateRecipe() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [], // Updated to include name and quantity
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
    createdBy: "",
  });
  const [file, setFile] = useState(undefined);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      const recipeId = params.recipeId;
      const res = await fetch(`/api/recipe/get/${recipeId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchRecipe();
  }, []);

  const handleIngredientChange = (index, key, value) => {
    const newIngredientInputFields = [...formData.ingredients];
    newIngredientInputFields[index][key] = value;
    setFormData({ ...formData, ingredients: newIngredientInputFields });
  };

  const handleAddIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  const [instructionInputFields, setInstructionInputFields] = useState([
    { id: 1, value: "" },
  ]);

  const handleInstructionChange = (index, value) => {
    const newInstructionInputFields = [...instructionInputFields];
    newInstructionInputFields[index].value = value;
    setInstructionInputFields(newInstructionInputFields);

    const updatedInstructions = newInstructionInputFields.map(
      (field) => ({ step: field.value }) // Update to match the schema format
    );
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleAddInstructionField = () => {
    const newId =
      instructionInputFields[instructionInputFields.length - 1].id + 1;
    setInstructionInputFields([
      ...instructionInputFields,
      { id: newId, value: "" },
    ]);
  };

  const handleImageSubmit = (e) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, imageUrl: downloadURL });
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setFileUploadError(false);
      const res = await fetch(`/api/recipe/update/${params.recipeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          createdBy: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/recipes/${data._id}`);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#F2FFE9] min-h-screen p-4">
      <div className="md:w-full h-1/5 flex items-center justify-center">
        <h1 className="absolute text-[#ffffff]  text-[4rem] shadow-2xl">
          Update Your Recipe
        </h1>
        <img
          className="object-cover object-center rounded-lg"
          src={UPDATE_RECIPE}
          alt="Food"
          width={1300}
          height={300}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#114232] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-3">
            Recipe Basics
          </span>
          <div className="py-3 px-5 block">
            <label className="block text-[#114232] font-bold " htmlFor="title">
              <Salad className="size-5 pr-2" />
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
              value={formData.title}
              placeholder="Enter the title of Recipe"
              onChange={handleChange}
              required
            />
            <div className="my-4 flex px-5 space-x-20 align-middle ">
              <span>
                <label
                  className="block text-[#114232] font-bold "
                  htmlFor="servings"
                >
                  <User className="size-5 pr-2" />
                  Serves
                </label>
                <input
                  type="number"
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  id="servings"
                  value={formData.servings}
                  placeholder="Servings"
                  min={1}
                  required
                  onChange={handleChange}
                />
              </span>
              <span>
                <label
                  className="block text-[#114232] font-bold "
                  htmlFor="totalTime"
                >
                  <Clock className="size-5 pr-2" />
                  Cooking Time
                </label>
                <input
                  type="number"
                  id="totalTime"
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  value={formData.totalTime}
                  placeholder="Total Time (minutes)"
                  required
                  onChange={handleChange}
                />
              </span>
              <span>
                <label
                  className="block text-[#114232] font-bold "
                  htmlFor="difficulty"
                >
                  <ChefHat className="size-5 pr-2" />
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={formData.difficulty}
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  required
                  onChange={handleChange}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </span>
              <span>
                <label
                  className="block text-[#114232] font-bold "
                  htmlFor="cuisine"
                >
                  <User className="size-5 pr-2" />
                  Cuisine
                </label>
                <input
                  className="w-full py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  type="text"
                  id="cuisine"
                  value={formData.cuisine}
                  placeholder="Cuisine"
                  required
                  onChange={handleChange}
                />
              </span>
            </div>

            <label
              className="block text-[#114232] font-bold "
              htmlFor="description"
            >
              <BookOpenText className="size-5 pr-2" />
              Description
            </label>
            <textarea
              className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none"
              id="description"
              rows={4}
              cols={30}
              value={formData.description}
              placeholder="Description"
              required
              onChange={handleChange}
            />
            <label
              className="block text-[#114232] font-bold "
              htmlFor="imageUrl"
            >
              <Link2 className="size-5 pr-2" />
              Recipe Image
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              id="images"
              accept="image/*"
              name="imageUrl"
              className="py-2 my-2 font-overlock"
            />
            <button
              onClick={handleImageSubmit}
              type="button"
              className="px-3 py-2 border-2 border-[#114232] text-[#114232] bg-white rounded-full hover:bg-[#114232] hover:text-white cursor-pointer"
            >
              Upload
            </button>
            <p className="font-proxima-nova">
              {fileUploadError ? (
                <span className="text-red-700">Error Image Upload</span>
              ) : (
                formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Uploaded"
                    className="w-20 h-20"
                  />
                )
              )}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#114232] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-3">
            Nutritional Information
          </span>
          <div className="grid grid-cols-3 gap-4 py-3 px-5 block">
            <div>
              <label
                className="block text-[#114232] font-bold"
                htmlFor="calories"
              >
                Total Calories
              </label>
              <input
                type="number"
                id="calories"
                className="w-24 py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                value={formData.calories}
                placeholder="Calories"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-[#114232] font-bold"
                htmlFor="protein"
              >
                Protein
              </label>
              <input
                type="number"
                id="protein"
                className="w-24 py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                value={formData.protein}
                placeholder="Protein"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block text-[#114232] font-bold"
                htmlFor="carbohydrates"
              >
                Carbohydrates
              </label>
              <input
                type="number"
                id="carbohydrates"
                className="w-24 py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                value={formData.carbohydrates}
                placeholder="Carbohydrates"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-[#114232] font-bold" htmlFor="fat">
                Fats
              </label>
              <input
                type="number"
                id="fat"
                className="w-24 py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                value={formData.fat}
                placeholder="Fats"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-[#114232] font-bold" htmlFor="fiber">
                Fiber
              </label>
              <input
                type="number"
                id="fiber"
                className="w-24 py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                value={formData.fiber}
                placeholder="Fiber"
                required
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#114232] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-2">
            Ingredients
          </span>
          <div className="space-y-4">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mx-4">
                <span className="bg-[#114232] w-6 h-6 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </span>
                <input
                  type="text"
                  className="w-[40%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  placeholder="Ingredient"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="w-[40%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none font-overlock"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddIngredientField}
            className="my-4 mx-4 bg-[#114232] text-white rounded-md py-2 px-4 hover:bg-[#1c644c]"
            type="button"
          >
            + Add ingredients
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md my-5 w-[85%] mx-auto">
          <span className="bg-[#114232] font-proxima-nova text-white text-[1.5rem] block w-1/5 rounded-br-xl mb-4 p-2">
            Instructions
          </span>
          <div className="space-y-4">
            {instructionInputFields.map((inputField, index) => (
              <div
                key={inputField.id}
                className="flex items-center space-x-2 mx-4"
              >
                <span className="bg-[#114232] w-6 h-6 rounded-full flex items-center justify-center text-white">
                  {index + 1}
                </span>
                <textarea
                  className="w-[80%] py-2 my-2 bg-transparent border border-[#535353] rounded-sm px-2 outline-none focus:outline-none"
                  rows={4}
                  cols={30}
                  value={inputField.value}
                  placeholder="Enter Instructions"
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleAddInstructionField}
            className="my-4 mx-4 bg-[#114232] text-white rounded-md py-2 px-4 hover:bg-[#1c644c]"
            type="button"
          >
            + Add Next Step
          </button>
        </div>
        <button className="block mx-auto w-[80%] text-white bg-[#114232] rounded-md my-4 p-4 font-proxima-nova font-semibold text-center items-center justify-center hover:bg-[#1c644c] cursor-pointer text-[1.2rem]">
          {loading ? "Updating..." : "+ Update Recipe"}
        </button>
        {error && <p className="text-red-700 text-sm">{error}</p>}
      </form>
    </main>
  );
}
