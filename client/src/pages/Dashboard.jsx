import {
  LayoutDashboard,
  CircleUserRound,
  Star,
  Soup,
  ShoppingBasket,
  LogOut,
  FilePenLine,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { useSelector } from "react-redux";

function Dashboard() {
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
      </div>
    </div>
  );
}

export default Dashboard;
