import { Link } from "react-router-dom";

const lowHueColors = [
  "#FFE1E1",
  "#E1FFD6",
  "#E1F3FF",
  "#FFE1FF",
  "#E5E1FF",
  "#FFF4E1",
];

export default function RecipeCard({ recipe }) {
  const randomColorIndex = Math.floor(Math.random() * lowHueColors.length);
  const randomColor = lowHueColors[randomColorIndex];

  return (
    <div>
      <Link to={`/recipe/${recipe._id}`} className="no-underline">
        <div
          className="w-full sm:w-[15.5rem] rounded-2xl overflow-hidden shadow-lg p-3"
          style={{ backgroundColor: randomColor }}
        >
          <div className="overflow-hidden rounded-2xl">
            <img
              src={recipe.imageUrl}
              alt=""
              className="w-[15.5rem] h-[7rem] object-cover object-center rounded-2xl hover:scale-105 transition-scale duration-300"
            />
          </div>
          <div className="text-[#114232] text-xl font-proxima-nova">
            {recipe.title}
          </div>
          <div className="flex space-x-3 mt-2 text-[0.8rem]">
            <span className="bg-white px-2 py-1 items-center font-proxima-nova rounded-full shadow-form text-black">
              {recipe.cuisine}
            </span>
            <span className="bg-white px-2 py-1 items-center font-proxima-nova rounded-full shadow-form text-black">
              {recipe.totalTime} Minutes
            </span>
            <span className="bg-white px-2 py-1 items-center font-proxima-nova text-[114232] rounded-full shadow-form text-black">
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
