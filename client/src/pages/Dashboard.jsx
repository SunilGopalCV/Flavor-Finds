import {
  LayoutDashboard,
  CircleUserRound,
  Star,
  Soup,
  ShoppingBasket,
  LogOut,
  FilePenLine,
  Clock,
  Trash2,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const navItems = [
    { name: "Profile", path: "/profile", logo: <CircleUserRound size={20} /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      logo: <LayoutDashboard size={20} />,
    },
    { name: "Favorites", path: "/favorites", logo: <Star size={20} /> },
    { name: "MealPlan", path: "/meal-planning", logo: <Soup size={20} /> },
    {
      name: "ShopList",
      path: "/shopping-list",
      logo: <ShoppingBasket size={20} />,
    },
    { name: "Logout", path: "/api/auth/logout", logo: <LogOut size={20} /> },
  ];
  const [showRecipesError, setShowRecipesError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setShowRecipesError(false);
        const res = await fetch(`/api/user/recipes/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowRecipesError(true);
        }
        setUserRecipes(data);
      } catch (error) {
        setShowRecipesError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [currentUser._id]);

  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex sticky shadow-form">
        <Sidebar>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium no-underline font-proxima-nova"
            >
              <SidebarItem
                icon={item.logo}
                text={item.name}
                active={location.pathname === item.path}
              />
            </a>
          ))}
        </Sidebar>
      </div>
      <div
        className="container mx-auto pl-[4rem] bg-[#f6fff9] pr-[2rem] w-full overflow-y-scroll"
        style={{ maxHeight: "calc(100vh - 6rem)" }}
      >
        {/* Content inside the Dashboard */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{showRecipesError ? "Error Showing Recipes" : ""}</p>
        )}
        <h2 className="text-[#114232]">My Recipes</h2>
        {userRecipes &&
          userRecipes.length > 0 &&
          userRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="flex justify-between items-center mb-4 max-w-lg"
            >
              <div className="max-w-md rounded-2xl overflow-hidden shadow-lg bg-[#ffe1e1] p-3">
                <span className="absolute flex bg-white px-2 py-1 mt-20 ml-3 items-center font-proxima-nova text-[114232] rounded-full shadow-form ">
                  <Clock className="size-4 mr-1" /> {recipe.totalTime + " Min"}
                </span>
                <Link to={`/recipe/${recipe._id}`}>
                  <img
                    src={recipe.imageUrl}
                    alt=""
                    className="w-[17rem] h-[7rem] object-cover object-center rounded-2xl"
                  />
                </Link>
                <div className="font-bold text-[#114232] text-xl font-proxima-nova mb-2">
                  {recipe.title}
                </div>
                <span className="bg-white px-2 py-1 mt-20 text-[0.8rem] font-bold items-center font-proxima-nova text-[114232] rounded-full shadow-form">
                  {recipe.cuisine}
                </span>
              </div>
              <div className="flex flex-col space-y-3 font-bold text-[#114232] font-proxima-nova">
                <span className="hover:underline cursor-pointer">
                  Edit <FilePenLine className="size-4" />
                </span>
                <span>Creation Date : {formatDate(recipe.createdAt)}</span>
                <span>Last Edited : {formatDate(recipe.updatedAt)}</span>
                <span className="hover:underline cursor-pointer text-[#ff5252]">
                  Delete <Trash2 className="size-4" />
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
