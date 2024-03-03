// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import NavbarMobile from "./NavbarMobile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className="px-5 md:px-14 sticky top-0 left-0 right-0 z-[1000] mx-auto flex max-w-full items-center justify-between py-[0.5rem] border-b border-gray-300 bg-white shadow-form">
        <Navbar />
        <Searchbar />
        <div className="md:hidden">
          <button onClick={toggleMenu} className=" text-primary bg-white">
            {isMenuOpen ? (
              <FontAwesomeIcon
                className="w-[2rem] h-[2rem]"
                icon={faX}
                style={{ color: "#717171" }}
              />
            ) : (
              <FontAwesomeIcon
                className="w-[2rem] h-[2rem]"
                icon={faBars}
                style={{ color: "#717171" }}
              />
            )}
          </button>
        </div>
      </header>
      <div
        className={`space-y-4 px-4 pt-24 pb-5 ${
          isMenuOpen
            ? "block fixed top-0 right-0 left-0 bg-bgPrimary z-[999]"
            : "hidden"
        }`}
      >
        <NavbarMobile />
      </div>
    </>
  );
}
