import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NavLinks = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
      ? "font-extrabold"
      : "no-underline transition duration-300 ease-in-out hover:text-secondary hover:text-base";
  };

  return (
    <div className="flex flex-col">
      <NavLink
        to="/"
        className={`text-primary font-proxima-nova p-4 ${isActive("/")}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/explore"
        className={`text-primary font-proxima-nova p-4 ${isActive("/explore")}`}
      >
        Explore
      </NavLink>
      <NavLink
        to="/community"
        className={`text-primary font-proxima-nova p-4 ${isActive(
          "/community"
        )}`}
      >
        Community
      </NavLink>
    </div>
  );
};

export default function NavbarMobile() {
  return <NavLinks />;
}
