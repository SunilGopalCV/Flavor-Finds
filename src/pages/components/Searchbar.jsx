import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Searchbar() {
  return (
    <div className="flex space-x-[0.7rem] justify-center items-center hidden md:flex ">
      <form className="flex space-x-[0.7rem] items-center w-[16.86538rem] h-[2.30306rem] shadow-form justify-center rounded-full">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{ color: "#717171" }}
          className="w-[1.28744rem] h-[1.39581rem]"
        />
        <input
          type="text"
          placeholder="Looking for something specific?"
          className="focus:outline-none text-input font-overlock w-[13.13181rem] h-[1.39581rem]"
        />
      </form>
      <Link to="/sign-in">
        <FontAwesomeIcon
          className="w-[2rem] h-[2rem]"
          icon={faCircleUser}
          style={{ color: "#717171" }}
        />
      </Link>
    </div>
  );
}
