import { app } from "../../firebase";
import GOOGLE_ICON from "/icons/LogoGoogle.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccess } from "../../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("Could not Sign in with Google: ", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="w-full text-[#060606] bg-white border-2 border-black rounded-md py-2 mt-4 font-proxima-nova font-semibold text-center flex items-center justify-center hover:bg-[#ededed] cursor-pointer"
    >
      <img src={GOOGLE_ICON} className="h-6 mr-2" />
      Continue with Google
    </button>
  );
}
