// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-[20] mx-auto flex w-full max-w-6xl items-center justify-between py-[1rem] border-b border-gray-300">
      <Navbar />
      <Searchbar />
    </header>
  );
}
