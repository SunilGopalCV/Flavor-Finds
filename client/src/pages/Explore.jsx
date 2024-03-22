import { useState } from "react";

export default function Explore() {
  const [searchFilters, setSearchFilters] = useState({
    title: "",
    ingredients: "",
    cuisine: "",
    totalTime: "",
    difficulty: "",
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters({
      ...searchFilters,
      [name]: value,
    });
  };

  const handleSearch = () => {
    console.log("Search Filters:", searchFilters);
    // Implement search logic here
  };

  return (
    <div className="flex flex-row justify-center items-start mx-auto max-w-7xl">
      <div className="bg-[#ffffff] fixed z-20 inset-0 left-[max(0px,calc(50%-45rem))] right-auto w-[17rem] pb-10 pl-8 pr-6 overflow-y-auto pt-20">
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
          <div className="flex items-center space-x-2">
            <label>
              <input
                type="radio"
                name="difficulty"
                id="difficulty"
                value="Easy"
                onChange={handleInputChange}
              />
              Easy
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="Medium"
                onChange={handleInputChange}
              />
              Medium
            </label>
            <label>
              <input
                type="radio"
                name="difficulty"
                value="Hard"
                onChange={handleInputChange}
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
          onClick={handleSearch}
          className="bg-[#114232] font-proxima-nova text-[1.15rem] text-white rounded-md py-3  px-5 hover:bg-[#1c644c] w-full"
        >
          Search
        </button>
      </div>
      <div className="pl-[22.5rem] pr-[2rem] pt-[2rem] w-3/4 h-90vh">
        <h1 className="font-proxima-nova text-primary">Recipies Found:</h1>
      </div>
    </div>
  );
}
