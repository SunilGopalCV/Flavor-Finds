import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const NavLinks = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
      ? "font-bold scale-110 text-primary"
      : "no-underline hover:scale-110 hover:text-primary hover:font-semibold transform transition-transform duration-300";
  };

  return (
    <>
      <NavLink
        to="/"
        className={`text-primary font-proxima-nova ${isActive("/")}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/search"
        className={`text-primary font-proxima-nova ${isActive("/search")}`}
      >
        Explore
      </NavLink>
      <NavLink
        to="/community"
        className={`text-primary font-proxima-nova ${isActive("/community")}`}
      >
        Community
      </NavLink>
    </>
  );
};

export default function Navbar() {
  return (
    <div className="md-px:14 max-w-screen-2x1 flex space-x-[4rem] items-center">
      <Logo />
      <div className="md:flex hidden space-x-[4rem]">
        <NavLinks />
      </div>
    </div>
  );
}
