import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dropdown() {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return (
      <>
        <Link
          to="/profile"
          className="block px-4 py-2 hover:bg-gray-200 no-underline text-primary font-proxima-nova"
        >
          Profile
        </Link>
        <Link
          to="/sign-out"
          className="block px-4 py-2 hover:bg-gray-200 no-underline text-primary font-proxima-nova"
        >
          Sign Out
        </Link>
      </>
    );
  } else {
    return (
      <>
        <Link
          to="/login"
          className="block px-4 py-2  hover:bg-gray-200 no-underline text-primary font-proxima-nova"
        >
          Login
        </Link>
        <Link
          to="/sign-up"
          className="block px-4 py-2  hover:bg-gray-200 no-underline text-primary font-proxima-nova"
        >
          Sign Up
        </Link>
      </>
    );
  }
}
