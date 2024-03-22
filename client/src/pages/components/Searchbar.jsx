import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { useNavigate } from "react-router-dom";
export default function Searchbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("title", title);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const titleFromUrl = urlParams.get("title");
    if (titleFromUrl) {
      setTitle(titleFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex space-x-[0.7rem] justify-center items-center hidden md:flex ">
      <form
        onSubmit={handleSubmit}
        className="flex space-x-[0.7rem] items-center w-[16.86538rem] h-[2.30306rem] mr-5 shadow-form justify-center rounded-full"
      >
        <button className="appearance-none focus:outline-none bg-transparent border-none">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#717171" }}
            className="w-[1.28744rem] h-[1.39581rem]"
          />
        </button>
        <input
          type="text"
          placeholder="Looking for something specific?"
          className="focus:outline-none text-input font-overlock w-[13.13181rem] h-[1.39581rem]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </form>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {currentUser ? (
          <img
            className="w-[2rem] h-[2rem] rounded-full"
            src={currentUser.avatar}
            alt="profile"
          />
        ) : (
          <FontAwesomeIcon
            className="w-[2rem] h-[2rem]"
            icon={faCircleUser}
            style={{ color: "#717171" }}
          />
        )}
        {showDropdown && (
          <div className="absolute right-5 mt-4 w-48 bg-white rounded-md overflow-hidden shadow-2xl z-10 border border-solid border-gray-300">
            <Dropdown />
          </div>
        )}
      </div>
    </div>
  );
}
