import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <div>
      <Link to={`/recipe/${recipe._id}`} className="no-underline">
        <div className="w-full sm:w-[15.5rem] rounded-2xl overflow-hidden shadow-lg bg-[#ffe1e1] p-3">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={recipe.imageUrl}
              alt=""
              className="w-[15.5rem] h-[7rem] object-cover object-center rounded-2xl hover:scale-105 transition-scale duration-300"
            />
          </div>
          <div className="font-bold text-[#114232] text-xl font-proxima-nova">
            {recipe.title}
          </div>
          <div className="flex space-x-3 mt-2 text-[0.8rem] font-bold">
            <span className="bg-white px-2 py-1 items-center font-proxima-nova text-[114232] rounded-full shadow-form text-black">
              {recipe.cuisine}
            </span>
            <span className="bg-white px-2 py-1 items-center font-proxima-nova text-[114232] rounded-full shadow-form text-black">
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
