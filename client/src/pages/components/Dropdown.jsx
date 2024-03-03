import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../../redux/user/userSlice";

export default function Dropdown() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data));
      } catch (error) {
        dispatch(deleteUserFailure(error.message));
      }
    };
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
          Log Out
        </Link>
        <span
          className="block px-4 py-2  hover:bg-gray-200 no-underline text-primary font-proxima-nova"
          onClick={handleDeleteUser}
        >
          Delete Account
        </span>
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
