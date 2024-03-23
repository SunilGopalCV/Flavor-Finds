import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "./RecipeCard";

export default function Explore() {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    ingredients: "",
    cuisine: "",
    totalTime: "",
    difficulty: "Easy",
    caloriesRange: "",
    caloriesValue: "",
    fatRange: "",
    fatValue: "",
    carbohydratesRange: "",
    carbohydratesValue: "",
    proteinRange: "",
    proteinValue: "",
    fiberRange: "",
    fiberValue: "",
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [resultCount, setresultCount] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const titleFromUrl = urlParams.get("title");
    const ingredientsFromUrl = urlParams.get("ingredients");
    const cuisineFromUrl = urlParams.get("cuisine");
    const totalTimeFromUrl = urlParams.get("totalTime");
    const difficultyFromUrl = urlParams.get("difficulty");
    const caloriesRangeFromUrl = urlParams.get("caloriesRange");
    const caloriesValueFromUrl = urlParams.get("caloriesValue");
    const fatRangeFromUrl = urlParams.get("fatRange");
    const fatValueFromUrl = urlParams.get("fatValue");
    const carbohydratesRangeFromUrl = urlParams.get("carbohydratesRange");
    const carbohydratesValueFromUrl = urlParams.get("carbohydratesValue");
    const proteinRangeFromUrl = urlParams.get("proteinRange");
    const proteinValueFromUrl = urlParams.get("proteinValue");
    const fiberRangeFromUrl = urlParams.get("fiberRange");
    const fiberValueFromUrl = urlParams.get("fiberValue");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      titleFromUrl ||
      ingredientsFromUrl ||
      cuisineFromUrl ||
      totalTimeFromUrl ||
      difficultyFromUrl ||
      caloriesRangeFromUrl ||
      caloriesValueFromUrl ||
      fatRangeFromUrl ||
      fatValueFromUrl ||
      carbohydratesRangeFromUrl ||
      carbohydratesValueFromUrl ||
      proteinRangeFromUrl ||
      proteinValueFromUrl ||
      fiberRangeFromUrl ||
      fiberValueFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchFilters({
        title: titleFromUrl || "",
        ingredients: ingredientsFromUrl || "",
        cuisine: cuisineFromUrl || "",
        totalTime: totalTimeFromUrl || "",
        difficulty: difficultyFromUrl || "Easy",
        caloriesRange: caloriesRangeFromUrl || "",
        caloriesValue: caloriesValueFromUrl || "",
        fatRange: fatRangeFromUrl || "",
        fatValue: fatValueFromUrl || "",
        carbohydratesRange: carbohydratesRangeFromUrl || "",
        carbohydratesValue: carbohydratesValueFromUrl || "",
        proteinRange: proteinRangeFromUrl || "",
        proteinValue: proteinValueFromUrl || "",
        fiberRange: fiberRangeFromUrl || "",
        fiberValue: fiberValueFromUrl || "",
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchRecipes = async () => {
      setLoading(true);
      const searchQuery = new URLSearchParams(location.search);
      const res = await fetch(`/api/recipe/get?${searchQuery}`);
      const data = await res.json();
      setresultCount(data.length);
      setRecipes(data.slice(0, 6));
      if (data.length > 6) {
        setShowMore(true);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "sort") {
      const [sort, order] = value.split("_");
      setSearchFilters({
        ...searchFilters,
        sort: sort || "createdAt",
        order: order || "desc",
      });
    } else {
      setSearchFilters({
        ...searchFilters,
        [name]: value,
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("title", searchFilters.title);
    urlParams.set("ingredients", searchFilters.ingredients);
    urlParams.set("cuisine", searchFilters.cuisine);
    urlParams.set("totalTime", searchFilters.totalTime);
    urlParams.set("difficulty", searchFilters.difficulty);
    urlParams.set("caloriesRange", searchFilters.caloriesRange);
    urlParams.set("caloriesValue", searchFilters.caloriesValue);
    urlParams.set("fatRange", searchFilters.fatRange);
    urlParams.set("fatValue", searchFilters.fatValue);
    urlParams.set("carbohydratesRange", searchFilters.carbohydratesRange);
    urlParams.set("carbohydratesValue", searchFilters.carbohydratesValue);
    urlParams.set("proteinRange", searchFilters.proteinRange);
    urlParams.set("proteinValue", searchFilters.proteinValue);
    urlParams.set("fiberRange", searchFilters.fiberRange);
    urlParams.set("fiberValue", searchFilters.fiberValue);
    urlParams.set("sort", searchFilters.sort);
    urlParams.set("order", searchFilters.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = recipes.length;
    const limit = 6;
    const searchQuery = new URLSearchParams(location.search);
    searchQuery.set("startIndex", startIndex);
    searchQuery.set("limit", limit);
    const res = await fetch(`/api/recipe/get?${searchQuery.toString()}`);
    const data = await res.json();
    if (data.length > 0) {
      setRecipes([...recipes, ...data]);
    } else {
      setShowMore(false);
    }
  };

  return (
    <div className="flex flex-row justify-center items-start mx-auto max-w-7xl">
      <form
        onSubmit={handleSearch}
        className="bg-[#ffffff] fixed z-20 inset-0 left-[max(0px,calc(50%-45rem))] right-auto w-[17rem] pb-10 pl-8 pr-6 overflow-y-auto pt-20"
      >
        <div className="mb-4 mt-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="title"
          >
            Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Search by title"
            value={searchFilters.title}
            onChange={handleInputChange}
            className="input-field border border-solid border-[#114232] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="ingredients"
          >
            Ingredients:
          </label>
          <input
            type="text"
            id="ingredients"
            name="ingredients"
            placeholder="Search by ingredients"
            value={searchFilters.ingredients}
            onChange={handleInputChange}
            className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="cuisine"
          >
            Cuisine:
          </label>
          <input
            type="text"
            name="cuisine"
            id="cuisine"
            placeholder="Search by cuisine"
            value={searchFilters.cuisine}
            onChange={handleInputChange}
            className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="totalTime"
          >
            Total Time:
          </label>
          <input
            type="number"
            name="totalTime"
            id="totalTime"
            placeholder="Total Time (minutes)"
            value={searchFilters.totalTime}
            onChange={handleInputChange}
            className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4 font-proxima-nova text-[1.1rem]">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="difficulty"
          >
            Difficulty:
          </label>
          <div className="flex items-center space-x-2 cursor-pointer">
            <label>
              <input
                type="radio"
                name="difficulty"
                id="difficulty"
                value="Easy"
                onChange={handleInputChange}
                checked={searchFilters.difficulty === "Easy"} // Add this line
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="Medium"
                onChange={handleInputChange}
                checked={searchFilters.difficulty === "Medium"} // Add this line
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="Hard"
                onChange={handleInputChange}
                checked={searchFilters.difficulty === "Hard"} // Add this line
              />
              Hard
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="caloriesRange"
          >
            Calories:
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="caloriesRange"
              id="caloriesRange"
              value={searchFilters.caloriesRange}
              onChange={handleInputChange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="between">Between</option>
            </select>
            <input
              type="number"
              name="caloriesValue"
              value={searchFilters.caloriesValue}
              onChange={handleInputChange}
              className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none w-[4rem]"
              placeholder="Value"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="fatRange"
          >
            Fat:
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="fatRange"
              id="fatRange"
              value={searchFilters.fatRange}
              onChange={handleInputChange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="between">Between</option>
            </select>
            <input
              type="number"
              name="fatValue"
              value={searchFilters.fatValue}
              onChange={handleInputChange}
              className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none w-[4rem]"
              placeholder="Value"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="carbohydratesRange"
          >
            Carbohydrates:
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="carbohydratesRange"
              id="carbohydratesRange"
              value={searchFilters.carbohydratesRange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none"
              onChange={handleInputChange}
            >
              <option value="">Select Range</option>
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="between">Between</option>
            </select>
            <input
              type="number"
              name="carbohydratesValue"
              value={searchFilters.carbohydratesValue}
              onChange={handleInputChange}
              className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none w-[4rem]"
              placeholder="Value"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="proteinRange"
          >
            Protein:
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="proteinRange"
              id="proteinRange"
              value={searchFilters.proteinRange}
              onChange={handleInputChange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="between">Between</option>
            </select>
            <input
              type="number"
              name="proteinValue"
              value={searchFilters.proteinValue}
              onChange={handleInputChange}
              className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none w-[4rem]"
              placeholder="Value"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block mb-3 font-proxima-nova text-[1.15rem] font-bold text-primary"
            htmlFor="fiberRange"
          >
            Fiber:
          </label>
          <div className="flex items-center space-x-2">
            <select
              name="fiberRange"
              id="fiberRange"
              value={searchFilters.fiberRange}
              onChange={handleInputChange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Range</option>
              <option value="lessThan">Less Than</option>
              <option value="greaterThan">Greater Than</option>
              <option value="between">Between</option>
            </select>
            <input
              type="number"
              name="fiberValue"
              value={searchFilters.fiberValue}
              onChange={handleInputChange}
              className="input-field border border-solid border-[#656565] font-overlock text-[1.1rem] px-2 py-1 rounded-lg focus:border-blue-500 focus:outline-none w-[4rem]"
              placeholder="Value"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#114232] font-proxima-nova text-[1.15rem] text-white rounded-md py-3  px-5 hover:bg-[#1c644c] w-full cursor-pointer"
        >
          Search
        </button>
      </form>
      <div className="pl-[22.5rem] pr-[2rem] pt-[2rem] w-3/4 h-90vh">
        <div className="flex justify-between">
          <span className="text-[1.3rem] font-bold font-proxima-nova text-primary">
            Recipies Found ({resultCount}):
          </span>
          <span className="flex align-middle space-x-3">
            <label
              className="font-proxima-nova text-[1.15rem] font-bold text-primary"
              htmlFor="sort_order"
            >
              Sort:
            </label>
            <select
              name="sort"
              id="sort_order"
              value={`${searchFilters.sort}_${searchFilters.order}`}
              onChange={handleInputChange}
              className="font-overlock text-[1.15rem] rounded-lg input-field border border-solid border-[#656565] focus:border-blue-500 focus:outline-none w-[10rem]"
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="totalTime_asc">Total Time</option>
              <option value="caloriesValue_asc">Calories(low to high)</option>
            </select>
          </span>
        </div>
        <div className="my-8 flex flex-wrap gap-6">
          {!loading && recipes.length === 0 && (
            <p className="text-xl text-red-500 font-bold font-roboto">
              No Recipes Found!
            </p>
          )}
          {loading && (
            <p className="text-xl text-[#114232] font-bold font-roboto text-center">
              Loading
            </p>
          )}
          {!loading &&
            recipes &&
            recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
        </div>
        {resultCount > 6 && showMore && (
          <button
            onClick={() => {
              onShowMoreClick();
            }}
            className="w-full text-[#114232] bg-white border-2 border-[#114232] rounded-md py-2 my-4 font-proxima-nova font-semibold text-center flex items-center justify-center hover:bg-[#114232] hover:text-white cursor-pointer"
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
