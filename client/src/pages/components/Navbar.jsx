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
    <>
      <NavLink
        to="/"
        className={`text-primary font-proxima-nova ${isActive("/")}`}
      >
        Home
      </NavLink>
      <NavLink
        to="/search"
        className={`text-primary font-proxima-nova ${isActive("/explore")}`}
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
